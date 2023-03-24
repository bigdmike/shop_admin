import { post_image, patch, del, put, get } from '@/common/request';

//分類
export function get_dealers() {
  return get('admin/advertisement');
}
export function create_dealer(dealer_item) {
  let data = Object.assign({}, dealer_item);
  data.Image1 = '';
  return put('admin/advertisement', data);
}
export function update_dealer(dealer_item) {
  return patch('admin/advertisement', dealer_item, '已成功更新經銷');
}
export function update_dealers_sort(dealer_list) {
  return patch(
    'admin/advertisement/updateSeqBatch',
    dealer_list,
    '已成功更新經銷排序'
  );
}
export function delete_dealer(id) {
  return del('admin/advertisement/' + id, '已成功刪除經銷');
}

export function update_dealer_image(dealer_id, dealer_item) {
  let image_data = {};
  typeof dealer_item.Image1 == 'string' || dealer_item.Image1 == null
    ? ''
    : (image_data.Image1 = dealer_item.Image1);
  return post_image(
    'admin/advertisement/image/' + dealer_id,
    image_data,
    '已成功更新經銷'
  );
}

export function get_all_data() {
  //分類
  var zip_code = get('zipcode');
  //經銷
  var dealers = get('admin/advertisement');

  let promise_list = [zip_code, dealers];

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
