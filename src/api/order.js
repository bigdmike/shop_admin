import { get, patch } from '@/common/request.js';

export function GetOrderList(data_per_page = 99999, page, status, member_id) {
  let url = '/admin/trade?';
  data_per_page != -1 ? (url += 'PageLimit=' + data_per_page) : '';
  page != -1 ? (url += '&Page=' + page) : '';
  status != 'all' ? (url += '&Status=' + status) : '';
  member_id != -1 ? (url += '&MemberID=' + member_id) : '';
  let shipping = get('admin/shipping');
  let orders = get(url);
  let zip = get('zipcode');
  let product = get('admin/goods');
  let payment = get('admin/payment');
  let promise_list = [orders, shipping, zip, product, payment];

  return Promise.all(GetPromise(promise_list)).then(
    (res) => {
      if (promise_list.length == res.length) {
        return res;
      }
    },
    (err) => console.log(err)
  );
}

export function GetOrderAndProduct() {
  let promise_list = [
    get('admin/goods'),
    get('admin/trade'),
    get('admin/discount'),
    get('admin/coupon'),
    get('admin/payment'),
    get('admin/shipping'),
    get('zipcode'),
  ];

  return Promise.all(GetPromise(promise_list)).then(
    (res) => {
      if (promise_list.length == res.length) {
        return res;
      }
    },
    (err) => console.log(err)
  );
}

export function UpdateOrderInfo(order_data) {
  let data = {
    ID: order_data.TradeID,
    Status: order_data.Status,
    ShippingTime: order_data.ShippingTime,
    ShippingCode: order_data.ShippingCode,
    PaymentTime: order_data.PaymentTime,
    ReceiverName: order_data.ReceiverName,
    ReceiverPhone: order_data.ReceiverPhone,
    ReceiverEmail: order_data.ReceiverEmail,
    ReceiverAddressCode: order_data.ReceiverAddressCode,
    ReceiverAddress: order_data.ReceiverAddress,
    ReceiverStoreNo: order_data.ReceiverStoreNo,
    ReceiverStoreInfo: order_data.ReceiverStoreInfo,
    AdminMemo: order_data.AdminMemo,
  };
  return patch('admin/trade', data);
}

export function GetHCTOrder(order_id) {
  return get('admin/trade/HCT/' + order_id);
}

export function GetCVSOrder(order_id) {
  return get('admin/trade/ECLogistics/' + order_id);
}

export function CancelOrder(order_id) {
  return get('/order_cancel/' + order_id);
}

function GetPromise(promiseList) {
  return promiseList.map((promise) => promise.then((res) => res));
}
