import {
    patch,
    del,
    put,
    get,
    post_image
} from '@/common/request'

export function get_discount() {
    return get("admin/discount");
}

export function create_discount(discount_item) {
    return put("admin/discount", discount_item, "已成功新增優惠代碼");
}

export function update_discount(discount_item) {
    return patch("admin/discount", discount_item, "已成功更新優惠代碼");
}

export function delete_discount(discount_id) {
    return del("admin/discount/" + discount_id, "已成功刪除優惠代碼");
}

export function update_menu_image(discount_id, discount_item) {
    let image_data = {}
    typeof discount_item.Image1 == "string" || discount_item.Image1 == null ? "" : image_data.Image1 = discount_item.Image1
    return post_image("admin/discount/image/" + discount_id, image_data, "已成功更新商品分類圖")
}