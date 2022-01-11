import {
    patch,
    del,
    // post,
    get,
    post_image
} from '@/common/request'

// 商品
export function get_picture(id) {
    return get('admin/goods/picture/' + id)
}
export function create_picture(picture_item) {
    picture_item.SizeID == "" ? picture_item.SizeID = 0 : ""
    picture_item.ColorID == "" ? picture_item.ColorID = 0 : ""
    let data = {}
    data.Seq1 = picture_item.Seq
    data.Image1 = picture_item.Image
    return post_image(`admin/goods/picture/${picture_item.GoodsID}/${picture_item.SizeID}/${picture_item.ColorID}`, data, "已成功新增商品圖片")
}
// export function update_picture(picture_item) {
//     return patch('admin/goods', picture_item, "已成功更新商品")
// }
export function update_picture_sort(list) {
    return patch('admin/goods/picture/updateSeqBatch', list, "已成功更新商品排序")
}
export function delete_picture(id) {
    return del('admin/goods/picture/' + id, "已成功刪除商品")
}

export function update_picture_image(goods_id, picture_item) {
    return post_image("admin/goods/picture/" + goods_id + '/0/0', picture_item, "已成功更新商品圖")
}


export function getGoodsAndCategory(id = -1) {
    //分類
    var color = get('admin/color')
    var size = get('admin/size')

    let promise_list = [color, size]
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