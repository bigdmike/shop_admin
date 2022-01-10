import {
    post_image,
    patch,
    del,
    put,
    get
} from '@/common/request'


export function get_carousel() {
    return get("admin/carousel")
}

export function create_carousel(carousel_item) {
    let data = {
        Image1: "",
        Image2: "",
        Link: carousel_item.Link,
        Seq: 0,
    };
    return put("admin/carousel", data)
}

export function update_carousel(carousel_item) {
    let data = {
        ID: carousel_item.CarouselID,
        Seq: carousel_item.Seq,
        Link: carousel_item.Link
    }
    return patch("admin/carousel", data, "已成功更新輪播圖")
}

export function update_carousel_image(carousel_id, carousel_item) {
    let image_data = {}
    typeof carousel_item.Image1 == "string" || carousel_item.Image1 == null ? "" : image_data.Image1 = carousel_item.Image1
    typeof carousel_item.Image2 == "string" || carousel_item.Image2 == null ? "" : image_data.Image2 = carousel_item.Image2
    return post_image("admin/carousel/image/" + carousel_id, image_data, "已成功更新輪播圖")
}

export function update_carousel_sort(carousel_list) {
    return patch("admin/carousel/updateSeqBatch", carousel_list, "已成功更新輪播圖排序")
}

export function delete_carousel(carousel_item) {
    return del("admin/carousel/" + carousel_item.CarouselID, "已成功刪除輪播圖")
}