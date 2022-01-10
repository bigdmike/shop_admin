import {
    patch,
    del,
    put,
    get
} from '@/common/request'

// 問題分類
export function get_categories() {
    return get('admin/question/category')
}
export function create_categories(list_item) {
    return put('admin/question/category', list_item, "已成功新增問題分類")
}
export function update_categories(list_item) {
    return patch('admin/question/category', list_item, "已成功更新問題分類")
}
export function update_categories_sort(list) {
    return patch('admin/question/category/updateSeqBatch', list, "已成功更新問題分類排序")
}
export function delete_categories(id) {
    return del('admin/question/category/' + id, "已成功刪除問題分類")
}

//問題
export function get_question() {
    return get('admin/question')
}
export function create_question(question_item) {
    return put('admin/question', question_item, "已成功新增問題")
}
export function update_question(question_item) {
    return patch('admin/question', question_item, "已成功更新問題")
}
export function update_question_sort(question_list) {
    return patch('admin/question/updateSeqBatch', question_list, "已成功更新問題排序")
}
export function delete_question(id) {
    return del('admin/question/' + id, "已成功刪除問題")
}


export function getQuestionAndCategory() {
    //分類
    var category = get('admin/question/category')
    //問題
    var question = get('admin/question')

    let promise_list = [category, question]

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