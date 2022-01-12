import {
    patch,
    del,
    put,
    get
} from '@/common/request'

// 連結群組
export function get_categories() {
    return get('admin/weblink/category')
}
export function create_categories(list_item) {
    return put('admin/weblink/category', list_item, "已成功新增連結群組")
}
export function update_categories(list_item) {
    return patch('admin/weblink/category', list_item, "已成功更新連結群組")
}
export function update_categories_sort(list) {
    return patch('admin/weblink/category/updateSeqBatch', list, "已成功更新連結群組排序")
}
export function delete_categories(id) {
    return del('admin/weblink/category/' + id, "已成功刪除連結群組")
}

//連結
export function get_weblink() {
    return get('admin/weblink')
}
export function create_weblink(weblink_item) {
    return put('admin/weblink', weblink_item, "已成功新增連結")
}
export function update_weblink(weblink_item) {
    return patch('admin/weblink', weblink_item, "已成功更新連結")
}
export function update_weblink_sort(weblink_list) {
    return patch('admin/weblink/updateSeqBatch', weblink_list, "已成功更新連結排序")
}
export function delete_weblink(id) {
    return del('admin/weblink/' + id, "已成功刪除連結")
}


export function getWeblinkAndCategory() {
    //分類
    var category = get('admin/weblink/category')
    //連結
    var weblink = get('admin/weblink')

    let promise_list = [category, weblink]

    return Promise.all(GetPromise(promise_list))
        .then(
            res => {
                if (promise_list.length == res.length) {
                    return (res)
                }
            }, err => console.log(err)
        )
}

function GetPromise(promiseList) {
    return promiseList.map(promise =>
        promise.then((res) => res)
    )
}