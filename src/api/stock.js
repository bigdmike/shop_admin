import {
    patch,
    // del,
    post,
    get,
} from '@/common/request'

// 商品庫存
export function get_stock(id) {
    return get('admin/goods/stock/' + id)
}
export function create_stock(stock_item) {
    return post('admin/goods/stock', stock_item, "已成功新增商品")
}
export function update_stock(stock_item) {
    return post('admin/goods/stock', stock_item, "已成功更新商品")
}
export function update_stock_sort(list) {
    return patch('admin/goods/stock/updateSeqBatch', list, "已成功更新商品排序")
}
// export function delete_goods(id) {
//     return del('admin/goods/' + id, "已成功刪除商品")
// }

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