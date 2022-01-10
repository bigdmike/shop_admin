import {
    post_image,
    patch,
    del,
    put,
    get
} from '@/common/request'

//首頁KOL介紹
export function get_kol() {
    return get('admin/kol')
}
export function create_kol(kol_item) {
    let data = Object.assign({}, kol_item)
    data.Image1 = ""
    data.Image2 = ""
    return put('admin/kol', data)
}
export function update_kol(kol_item) {
    return patch('admin/kol', kol_item, "已成功更新網紅介紹")
}
export function update_kol_sort(kol_list) {
    return patch('admin/kol/updateSeqBatch', kol_list, "已成功更新網紅介紹排序")
}
export function delete_kol(id) {
    return del('admin/kol/' + id, "已成功刪除網紅介紹")
}

export function update_kol_image(kol_id, kol_item) {
    let image_data = {}
    typeof kol_item.Image1 == "string" || kol_item.Image1 == null ? "" : image_data.Image1 = kol_item.Image1
    return post_image("admin/kol/image/" + kol_id, image_data, "已成功更新網紅介紹")
}