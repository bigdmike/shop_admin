import { patch, del, put, get, post } from '@/common/request';

// 商品分類
export function create_stock(list_item) {
  return post('admin/customgoods/stock', list_item, '已成功更新商品庫存');
}
export function update_stock_sort(list) {
  let tmp_data = [];
  list.forEach((item, item_index) => {
    tmp_data.push({
      GoodsID: item.GoodsID,
      Seq: item_index + 1,
    });
  });
  return patch(
    'admin/customgoods/stock/updateSeqBatch',
    tmp_data,
    '已成功更新商品庫存排序'
  );
}

//選項分類
export function create_category(item) {
  return put('admin/customgoods/category', item, '已成功新增選項分類');
}
export function update_category(item) {
  return patch('admin/customgoods/category', item, '已成功更新選項分類');
}
export function delete_category(id) {
  return del('admin/customgoods/category/' + id, '已成功刪除選項分類');
}
export function update_category_sort(list) {
  return patch(
    'admin/customgoods/category/updateSeqBatch',
    list,
    '已成功更新選項排序'
  );
}

//選項規格
export function create_spec(item) {
  return put('admin/customgoods/spec', item, '已成功新增選項規格');
}
export function update_spec(item) {
  return patch('admin/customgoods/spec', item, '已成功更新選項規格');
}
export function delete_spec(id) {
  return del('admin/customgoods/spec/' + id, '已成功刪除選項規格');
}
export function update_spec_sort(list) {
  return patch(
    'admin/customgoods/spec/updateSeqBatch',
    list,
    '已成功更新選項排序'
  );
}

// 取得全部資訊
export function getOptionStock(id) {
  //選項一
  var category = get('admin/customgoods/category');
  //選項二
  var spec = get('admin/customgoods/spec');
  //庫存
  var stocks = get('admin/customgoods/stock/' + id);

  let promise_list = [category, spec, stocks];

  return Promise.all(GetPromise(promise_list)).then(
    (res) => {
      if (promise_list.length == res.length) {
        return res;
      }
    },
    (err) => console.log(err)
  );
}
export function getOption() {
  //選項一
  var category = get('admin/customgoods/category');
  //選項二
  var spec = get('admin/customgoods/spec');

  let promise_list = [category, spec];

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
