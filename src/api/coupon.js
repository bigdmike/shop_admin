import {
    patch,
    del,
    put,
    get
} from '@/common/request'

export function get_coupon() {
    return get("admin/coupon");
}

export function create_coupon(coupon_item) {
    return put("admin/coupon", coupon_item, "已成功新增優惠代碼");
}

export function update_coupon(coupon_item) {
    return patch("admin/coupon", coupon_item, "已成功更新優惠代碼");
}

export function delete_coupon(coupon_id) {
    return del("admin/coupon/" + coupon_id, "已成功刪除優惠代碼");
}