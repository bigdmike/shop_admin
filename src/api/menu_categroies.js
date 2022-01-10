import {
    patch,
    del,
    put,
    get
} from '@/common/request'

// 選單目錄分類
export function get_categories() {
    return get('admin/menu/category')
}
export function create_categories(list_item) {
    return put('admin/menu/category', list_item, "已成功新增選單目錄分類")
}
export function update_categories(list_item) {
    return patch('admin/menu/category', list_item, "已成功更新選單目錄分類")
}
export function update_categories_sort(list) {
    return patch('admin/menu/category/updateSeqBatch', list, "已成功更新選單目錄分類排序")
}
export function delete_categories(id) {
    return del('admin/menu/category/' + id, "已成功刪除選單目錄分類")
}