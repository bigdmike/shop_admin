import { patch, del, put, get, post } from '@/common/request';

export function create_stock(list_item) {
  return post('admin/customgoods/stock', list_item, '已成功更新商品庫存');
}

//選項分類
export function get_category(id) {
  return get('admin/customgoods/category/' + id);
}
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
export function get_spec(id) {
  return get('admin/customgoods/spec/' + id);
}
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

// 禁用組合
export function create_black_list(data) {
  return put('admin/customgoods/blacklist', data, '已成功新增禁用組合');
}
export function update_black_list(data) {
  return patch('admin/customgoods/blacklist', data, '已成功更新禁用組合');
}
export function delete_black_list(id) {
  return del('admin/customgoods/blacklist/' + id, '已成功刪除禁用組合');
}

// 特殊價格組合
export function create_change_price(data) {
  return put('admin/customgoods/changeprice', data, '已成功新增特殊價格組合');
}
export function update_change_price(data) {
  return patch('admin/customgoods/changeprice', data, '已成功更新特殊價格組合');
}
export function delete_change_price(id) {
  return del('admin/customgoods/changeprice/' + id, '已成功刪除特殊價格組合');
}

// 取得全部資訊
export function getOptionStock(id) {
  //選項一
  var category = get('admin/customgoods/category/' + id);
  //選項二
  var spec = get('admin/customgoods/spec');
  //庫存
  var stocks = get('admin/customgoods/stock/' + id);
  // 黑名單
  var blacklist = get('/admin/customgoods/blacklist/' + id);
  // 特殊價格組合
  var change_price_list = get('/admin/customgoods/changeprice/' + id);

  let promise_list = [category, spec, stocks, blacklist, change_price_list];

  return Promise.all(GetPromise(promise_list)).then(
    (res) => {
      if (promise_list.length == res.length) {
        return res;
      }
    },
    (err) => console.log(err)
  );
}
export function getOption(good_id, id) {
  //選項
  var category = get('admin/customgoods/category/' + good_id);
  //規格
  var spec = get('admin/customgoods/spec/' + id);

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
