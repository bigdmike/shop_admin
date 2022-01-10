import {
    post_image,
    get,
    put,
    del,
    patch
} from '@/common/request'

//首頁底部商品連結
export function get_promote() {
    return get('admin/promote')
}
export function create_promote(promote_item) {
    return put('admin/promote', promote_item)
}
export function update_promote(promote_item) {
    let data = {
        ID: parseInt(promote_item.ID),
        Seq: parseInt(promote_item.Seq),
        Link: promote_item.Link
    }
    return patch('admin/promote', data, "已成功更新商品")
}

export function delete_promote(id) {
    return del('admin/promote/' + id, "已成功刪除商品連結")
}

export function update_promote_image(promote_item) {
    let image_data = {}
    typeof promote_item.Image1 == "string" || promote_item.Image1 == null ? "" : image_data.Image1 = promote_item.Image1
    return post_image("admin/promote/image/" + promote_item.ID, image_data, "已成功更新相簿")
}
export function update_promote_sort(promote_list) {
    return patch("admin/promote/updateSeqBatch", promote_list, "已成功更新相簿")
}