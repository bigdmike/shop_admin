import {
    patch,
    del,
    put,
    get,
    post_image
} from '@/common/request'

// 商品
export function get_goods() {
    return get('admin/goods')
}
export function create_goods(goods_item) {
    return put('admin/goods', goods_item, "已成功新增商品")
}
export function update_goods(goods_item) {
    return patch('admin/goods', goods_item, "已成功更新商品")
}
export function update_goods_sort(list) {
    return patch('admin/goods/updateSeqBatch', list, "已成功更新商品排序")
}
export function delete_goods(id) {
    return del('admin/goods/' + id, "已成功刪除商品")
}

export function update_goods_image(goods_id, goods_item) {
    let image_data = {}
    typeof goods_item.Image1 == "string" || goods_item.Image1 == null ? "" : image_data.Image1 = goods_item.Image1
    typeof goods_item.Image2 == "string" || goods_item.Image2 == null ? "" : image_data.Image2 = goods_item.Image2
    return post_image("admin/goods/image/" + goods_id, image_data, "已成功更新商品圖")
}


export function getGoodsAndCategory(id = -1) {
    //分類
    var category = get('admin/menu')
    //商品
    var goods = get('admin/goods')

    let promise_list = [category, goods]
    if (id != -1) {
        //圖片
        var images = get('admin/goods/picture/' + id)
        promise_list.push(images)
    }

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