import { get, patch } from '@/common/request.js';

// 取得訂單相關資料，可傳入每頁數量、第幾頁、篩選狀態、篩選會員ID
export function GetOrderList(
  data_per_page = 99999,
  page = -1,
  status = 'all',
  member_id = -1
) {
  let url = '/admin/trade?';
  data_per_page != -1 ? (url += 'PageLimit=' + data_per_page) : '';
  page != -1 ? (url += '&Page=' + page) : '';
  status != 'all' ? (url += '&Status=' + status) : '';
  member_id != -1 ? (url += '&MemberID=' + member_id) : '';

  // 訂單資訊
  let orders = get(url);
  // 物流資訊
  let shipping = get('admin/shipping');
  // 城市區域與郵遞區號
  let zip = get('zipcode');
  // 商品資訊
  let product = get('goods');
  // 付款資訊
  let payment = get('admin/payment');
  // 優惠資訊
  let discount = get('admin/discount');
  // 優惠代碼資訊
  let coupon = get('admin/coupon');
  let promise_list = [
    orders,
    shipping,
    zip,
    product,
    payment,
    discount,
    coupon,
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
