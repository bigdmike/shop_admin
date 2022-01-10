import {
    post_image,
    patch,
    del,
    put,
    get
} from '@/common/request'

// 文章分類
export function get_categories() {
    return get('admin/news/category')
}
export function create_categories(list_item) {
    return put('admin/news/category', list_item, "已成功新增文章分類")
}
export function update_categories(list_item) {
    return patch('admin/news/category', list_item, "已成功更新文章分類")
}
export function update_categories_sort(list) {
    return patch('admin/news/category/updateSeqBatch', list, "已成功更新文章分類排序")
}
export function delete_categories(id) {
    return del('admin/news/category/' + id, "已成功刪除文章分類")
}

//分類
export function get_news() {
    return get('admin/news')
}
export function create_news(news_item) {
    let data = Object.assign({}, news_item)
    data.Image1 = ""
    return put('admin/news', data)
}
export function update_news(news_item) {
    return patch('admin/news', news_item, "已成功更新文章")
}
export function update_news_sort(news_list) {
    return patch('admin/news/updateSeqBatch', news_list, "已成功更新文章排序")
}
export function delete_news(id) {
    return del('admin/news/' + id, "已成功刪除文章")
}

export function update_news_image(news_id, news_item) {
    let image_data = {}
    typeof news_item.Image1 == "string" || news_item.Image1 == null ? "" : image_data.Image1 = news_item.Image1
    return post_image("admin/news/image/" + news_id, image_data, "已成功更新文章")
}


export function get_all_data() {
    //分類
    var category = get('admin/news/category')
    //文章
    var news = get('admin/news')

    let promise_list = [category, news]

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