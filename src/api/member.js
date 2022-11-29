import { get } from '@/common/request';

export function get_member() {
  let member = get('admin/member');
  let trade = get('admin/trade');
  let shipping = get('shipping');
  let promise_list = [member, trade, shipping];

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
