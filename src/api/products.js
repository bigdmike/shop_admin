import { post, patch, del, put, get, post_image } from '@/common/request';
import { recacheProduct } from '@/api/prerender';

// 取得所有商品
export function get_goods() {
  return get('admin/goods');
}
// 更新商品資訊(不包含圖片與庫存選項)
export function update_goods(goods_item) {
  let tmp_goods = Object.assign({}, goods_item);
  delete tmp_goods.Image1;
  delete tmp_goods.Image2;
  return patch('admin/goods', tmp_goods, '已成功更新商品');
}
// 更新商品排序
export function update_goods_sort(list) {
  return patch('admin/goods/updateSeqBatch', list, '已成功更新商品排序');
}
// 刪除商品資料
export function delete_goods(id) {
  return del('admin/goods/' + id, '已成功刪除商品');
}

// 取得商品資料與商品分類，若有傳入ID則同時取得該商品的商品圖片
export function getGoodsAndCategory(id = -1) {
  //分類
  var category = get('admin/menu');
  //商品
  var goods = get('goods');

  let promise_list = [category, goods];
  if (id != -1) {
    //圖片
    var images = get('admin/goods/picture/' + id);
    promise_list.push(images);
  }

  return Promise.all(GetPromise(promise_list)).then(
    (res) => {
      if (promise_list.length == res.length) {
        return res;
      }
    },
    (err) => console.log(err)
  );
}

// 新增商品資料、商品分類關聯與商品圖片
export function create_goods_all(goods_item, images) {
  // 將MenuID跟EventID合併於同一個陣列，因為兩者的本質都是商品分類
  let menu_list = goods_item.MenuID;
  goods_item.EventID.forEach((id) => {
    menu_list.push(id);
  });

  // 先新增商品再拿返回的商品ID去新增其他資料
  var goods_info = put('admin/goods', goods_item, '已成功更新商品');

  return goods_info.then((res) => {
    if (res.code == 200) {
      let product_id = res.data.GoodsID;
      // 更新商品分類關西
      var goods_menu = patch(
        'admin/menu2goods/goods/' + res.data.GoodsID,
        menu_list,
        '已成功更新商品所屬分類'
      );

      let promise_list = [goods_menu];
      // 如果有圖片需要新增則將新增圖片request放入promise list
      if (images[0] != null || images[1] != null) {
        let image_data = {};
        typeof images[0] == 'string' || images[0] == null
          ? ''
          : (image_data.Image1 = images[0]);
        typeof images[1] == 'string' || images[1] == null
          ? ''
          : (image_data.Image2 = images[1]);
        let goods_image = post_image(
          'admin/goods/image/' + res.data.GoodsID,
          image_data,
          '已成功更新商品圖'
        );
        promise_list.push(goods_image);
      }

      // 若商品為客製化商品，則需要再另外新增客製化商品庫存
      if (goods_item.IsCustom == 'Y') {
        const stock_data = {
          GoodsID: res.data.GoodsID,
          Stock: 0,
          Status: 'Y',
          DeliverVolume: 0,
          DeliverWeight: 0,
          Price: 0,
          SellPrice: 0,
          MemberSellPrice: 0,
        };
        const stock = post(
          'admin/customgoods/stock',
          stock_data,
          '已成功建立商品庫存'
        );
        promise_list.push(stock);
      }

      return Promise.all(GetPromise(promise_list)).then(
        (res) => {
          if (promise_list.length == res.length) {
            return recacheProduct(product_id).then(() => {
              return res;
            });
          }
        },
        (err) => console.log(err)
      );
    } else {
      return 'error';
    }
  });
}

// 更新商品資料、商品分類關聯與商品圖片
export function update_goods_all(goods_item, images) {
  // 將ID設定為GoodsID，沒有設定ID後端會直接更新成全部商品
  goods_item.ID = goods_item.GoodsID;
  // 移除圖片資料，圖片會由另一隻API更新
  delete goods_item.Image1;
  delete goods_item.Image2;

  // 將MenuID跟EventID合併於同一個陣列，因為兩者的本質都是商品分類
  let menu_list = goods_item.MenuID;
  goods_item.EventID.forEach((id) => {
    menu_list.push(id);
  });

  // 更新商品與商品分類關聯
  var goods_info = patch('admin/goods', goods_item, '已成功更新商品');
  var goods_menu = patch(
    'admin/menu2goods/goods/' + goods_item.ID,
    menu_list,
    '已成功更新商品所屬分類'
  );

  let promise_list = [goods_info, goods_menu];

  // 如果圖片有更新則將更新圖片request新增至promise_list
  if (images[0] != null || images[1] != null) {
    let image_data = {};
    typeof images[0] == 'string' || images[0] == null
      ? ''
      : (image_data.Image1 = images[0]);
    typeof images[1] == 'string' || images[1] == null
      ? ''
      : (image_data.Image2 = images[1]);
    let goods_image = post_image(
      'admin/goods/image/' + goods_item.ID,
      image_data,
      '已成功更新商品圖'
    );
    promise_list.push(goods_image);
  }

  return Promise.all(GetPromise(promise_list)).then(
    (res) => {
      if (promise_list.length == res.length) {
        return recacheProduct(goods_item.GoodsID).then(() => {
          return res;
        });
      }
    },
    (err) => console.log(err)
  );
}

function GetPromise(promiseList) {
  return promiseList.map((promise) => promise.then((res) => res));
}
