import {
    patch,
    del,
    put,
    get
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

//選項一
export function create_color(item) {
    return put('admin/color', item, "已成功新增商品規格")
}
export function update_color(item) {
    return patch('admin/color', item, "已成功更新商品規格")
}
export function delete_color(id) {
    return del('admin/color/' + id, "已成功刪除商品規格")
}

//選項二
export function create_size(item) {
    return put('admin/size', item, "已成功新增商品規格")
}
export function update_size(item) {
    return patch('admin/size', item, "已成功更新商品規格")
}
export function delete_size(id) {
    return del('admin/size/' + id, "已成功刪除商品規格")
}


export function getOptionStock(id) {
    //選項一
    var option_1 = get('admin/color')
    //選項二
    var option_2 = get('admin/size')
    //庫存
    var stocks = get('admin/goods/stock/' + id)

    let promise_list = [option_1, option_2, stocks]

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