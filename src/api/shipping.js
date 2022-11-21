import { patch, get, put, del } from '@/common/request';

export function get_shipping() {
  const shipping_list = get('admin/shipping');
  const shipping_type = get('admin/shipping/type');
  let promise_list = [shipping_list, shipping_type];

  return Promise.all(GetPromise(promise_list)).then(
    (res) => {
      if (promise_list.length == res.length) {
        return res;
      }
    },
    (err) => console.log(err)
  );
}
export function update_shipping(item) {
  return patch('admin/shipping', item, '已成功更新運送方式');
}
export function create_shipping(item) {
  return put('admin/shipping', item, '已成功新增運送方式');
}
export function delete_shipping(id) {
  return del('/admin/shipping/' + id, '已成功新增運送方式');
}

function GetPromise(promiseList) {
  return promiseList.map((promise) => promise.then((res) => res));
}
