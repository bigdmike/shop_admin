import {
    post_image,
    patch,
    del,
    put,
    get
} from '@/common/request'

// 廣告分類
export function get_categories() {
    return get('admin/advertisement/category')
}
export function create_categories(list_item) {
    return put('admin/advertisement/category', list_item, "已成功新增廣告分類")
}
export function update_categories(list_item) {
    return patch('admin/advertisement/category', list_item, "已成功更新廣告分類")
}
export function update_categories_sort(list) {
    return patch('admin/advertisement/category/updateSeqBatch', list, "已成功更新廣告分類排序")
}
export function delete_categories(id) {
    return del('admin/advertisement/category/' + id, "已成功刪除廣告分類")
}

//廣告
export function get_advertisement() {
    return get('admin/advertisement')
}
export function create_advertisement(advertisement_item) {
    let data = Object.assign({}, advertisement_item)
    data.Image1 = ""
    return put('admin/advertisement', data)
}
export function update_advertisement(advertisement_item) {
    return patch('admin/advertisement', advertisement_item, "已成功更新廣告")
}
export function update_advertisement_sort(advertisement_list) {
    return patch('admin/advertisement/updateSeqBatch', advertisement_list, "已成功更新廣告排序")
}
export function delete_advertisement(id) {
    return del('admin/advertisement/' + id, "已成功刪除廣告")
}

export function update_advertisement_image(advertisement_id, advertisement_item) {
    let image_data = {}
    typeof advertisement_item.Image1 == "string" || advertisement_item.Image1 == null ? "" : image_data.Image1 = advertisement_item.Image1
    return post_image("admin/advertisement/image/" + advertisement_id, image_data, "已成功更新廣告")
}


export function get_all_data() {
    //分類
    var category = get('admin/advertisement/category')
    //廣告
    var advertisement = get('admin/advertisement')

    let promise_list = [category, advertisement]

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