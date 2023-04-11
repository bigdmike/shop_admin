import { patch, get } from '@/common/request';

export function get_payment() {
  return get('admin/payment');
}
export function update_payment(item) {
  return patch('admin/payment', item, '已成功更新付款方式');
}
