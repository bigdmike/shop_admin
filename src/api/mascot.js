import {
    post_image,
    patch,
    del,
    put,
    get
} from '@/common/request'

//角色館
export function get_mascot() {
    return get('admin/mascot')
}
export function create_mascot(mascot_item) {
    let data = Object.assign({}, mascot_item)
    data.Image1 = ""
    data.Image2 = ""
    return put('admin/mascot', data)
}
export function update_mascot(mascot_item) {
    return patch('admin/mascot', mascot_item, "已成功更新角色館")
}
export function update_mascot_sort(mascot_list) {
    return patch('admin/mascot/updateSeqBatch', mascot_list, "已成功更新角色館排序")
}
export function delete_mascot(id) {
    return del('admin/mascot/' + id, "已成功刪除角色館")
}

export function update_mascot_image(mascot_id, mascot_item) {
    let image_data = {}
    typeof mascot_item.Image1 == "string" || mascot_item.Image1 == null ? "" : image_data.Image1 = mascot_item.Image1
    return post_image("admin/mascot/image/" + mascot_id, image_data, "已成功更新角色館")
}