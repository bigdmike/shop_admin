import {
    patch,
    del,
    put,
    get,
    post_image
} from '@/common/request'

// 商品分類
export function get_categories() {
    return get('admin/menu/category')
}
export function get_menu() {
    return get('admin/menu')
}
export function create_menu(list_item) {
    return put('admin/menu', list_item, "已成功新增商品分類")
}
export function update_menu(list_item) {
    return patch('admin/menu', list_item, "已成功更新商品分類")
}
export function update_menu_sort(list) {
    return patch('admin/menu/updateSeqBatch', list, "已成功更新商品分類排序")
}
export function delete_menu(id) {
    return del('admin/menu/' + id, "已成功刪除商品分類")
}

export function update_menu_image(menu_id, menu_item) {
    let image_data = {}
    typeof menu_item.Image1 == "string" || menu_item.Image1 == null ? "" : image_data.Image1 = menu_item.Image1
    return post_image("admin/menu/image/" + menu_id, image_data, "已成功更新商品分類圖")
}


export function getMenuAndCategory() {
    //分類
    var category = get('admin/menu/category')
    //問題
    var menu = get('admin/menu')

    let promise_list = [category, menu]

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