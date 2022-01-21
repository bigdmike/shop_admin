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

export function update_goods_menu(goods_id, menu_list) {
    return patch('admin/menu2goods/goods/' + goods_id, menu_list, "已成功更新商品所屬分類")
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

export function create_goods_all(goods_item, images) {

    const menu_list = goods_item.Menu
    // delete goods_item.Image1;
    // delete goods_item.Image2;
    // delete goods_item.Menu;

    var goods_info = put('admin/goods', goods_item, "已成功更新商品")

    return goods_info.then((res) => {
        if (res.code == 200) {

            var goods_menu = patch('admin/menu2goods/goods/' + res.data.GoodsID, menu_list, "已成功更新商品所屬分類")

            let promise_list = [goods_menu]
            if (images[0] != null && images[1] != null) {
                let image_data = {}
                typeof images[0] == "string" || images[0] == null ? "" : image_data.Image1 = images[0]
                typeof images[1] == "string" || images[1] == null ? "" : image_data.Image2 = images[1]
                let goods_image = post_image("admin/goods/image/" + res.data.GoodsID, image_data, "已成功更新商品圖")
                promise_list.push(goods_image)
            }
            return Promise.all(GetPromise(promise_list))
                .then(
                    res => {
                        if (promise_list.length == res.length) {
                            return (res)
                        }
                    }, err => console.log(err)
                )
        } else {
            return "error"
        }
    })


}

export function getStockAndImage(id) {
    //庫存
    var stocks = get('admin/goods/stock/' + id)
    var images = get('admin/goods/picture/' + id)

    let promise_list = [stocks, images]

    return Promise.all(GetPromise(promise_list))
        .then(
            res => {
                if (promise_list.length == res.length) {
                    return (res)
                }
            }, err => console.log(err)
        )
}



export function update_goods_all(goods_item, images) {

    goods_item.ID = goods_item.GoodsID;
    delete goods_item.Image1;
    delete goods_item.Image2;

    var goods_info = patch('admin/goods', goods_item, "已成功更新商品")
    var goods_menu = patch('admin/menu2goods/goods/' + goods_item.ID, goods_item.MenuID, "已成功更新商品所屬分類")

    let promise_list = [goods_info, goods_menu]
    if (images[0] != null || images[1] != null) {
        let image_data = {}
        typeof images[0] == "string" || images[0] == null ? "" : image_data.Image1 = images[0]
        typeof images[1] == "string" || images[1] == null ? "" : image_data.Image2 = images[1]
        let goods_image = post_image("admin/goods/image/" + goods_item.ID, image_data, "已成功更新商品圖")
        promise_list.push(goods_image)
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