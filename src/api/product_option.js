import { patch, del, put, get, post } from '@/common/request';

// 商品分類
export function create_stock(list_item) {
  return post('admin/goods/stock', list_item, '已成功更新商品庫存');
}

export function create_multiple_stock(list) {
  return post('admin/goods/stockBatch', list, '已成功更新商品庫存');
}

export function update_stock_sort(list) {
  let tmp_data = [];
  list.forEach((item, item_index) => {
    tmp_data.push({
      GoodsID: item.GoodsID,
      ColorID: item.ColorID,
      SizeID: item.SizeID,
      Seq: item_index + 1,
    });
  });
  return patch(
    'admin/goods/stock/updateSeqBatch',
    tmp_data,
    '已成功更新商品庫存'
  );
}

//選項一
export function create_color(item) {
  return put('admin/color', item, '已成功新增商品規格');
}
export function update_color(item) {
  return patch('admin/color', item, '已成功更新商品規格');
}
export function delete_color(id) {
  return del('admin/color/' + id, '已成功刪除商品規格');
}

//選項二
export function create_size(item) {
  return put('admin/size', item, '已成功新增商品規格');
}
export function update_size(item) {
  return patch('admin/size', item, '已成功更新商品規格');
}
export function delete_size(id) {
  return del('admin/size/' + id, '已成功刪除商品規格');
}

export function getOptionStock(id) {
  //選項一
  var option_1 = get('admin/color');
  //選項二
  var option_2 = get('admin/size');
  //庫存
  var stocks = get('admin/goods/stock/' + id);

  let promise_list = [option_1, option_2, stocks];

  return Promise.all(GetPromise(promise_list)).then(
    (res) => {
      if (promise_list.length == res.length) {
        return res;
      }
    },
    (err) => console.log(err)
  );
}

function GetPromise(promiseList) {
  return promiseList.map((promise) => promise.then((res) => res));
}
