import { post_image, patch, del, put, get } from '@/common/request';

// 影片分類
export function get_categories() {
  return get('admin/video/category');
}
export function create_categories(list_item) {
  return put('admin/video/category', list_item, '已成功新增影片分類');
}
export function update_categories(list_item) {
  return patch('admin/video/category', list_item, '已成功更新影片分類');
}
export function update_categories_sort(list) {
  return patch(
    'admin/video/category/updateSeqBatch',
    list,
    '已成功更新影片分類排序'
  );
}
export function delete_categories(id) {
  return del('admin/video/category/' + id, '已成功刪除影片分類');
}

//分類
export function get_video() {
  return get('admin/video');
}
export function create_video(video_item) {
  let data = Object.assign({}, video_item);
  data.Image1 = '';
  return put('admin/video', data);
}
export function update_video(video_item) {
  return patch('admin/video', video_item, '已成功更新影片');
}
export function update_video_sort(video_list) {
  return patch('admin/video/updateSeqBatch', video_list, '已成功更新影片排序');
}
export function delete_video(id) {
  return del('admin/video/' + id, '已成功刪除影片');
}

export function update_video_image(video_id, video_item) {
  let image_data = {};
  typeof video_item.Image1 == 'string' || video_item.Image1 == null
    ? ''
    : (image_data.Image1 = video_item.Image1);
  return post_image(
    'admin/video/image/' + video_id,
    image_data,
    '已成功更新影片'
  );
}

export function get_all_data() {
  //分類
  var category = get('admin/video/category');
  //影片
  var video = get('admin/video');

  let promise_list = [category, video];

  return Promise.all(GetPromise(promise_list)).then(
    (res) => {
      if (promise_list.length == res.length) {
        return res;
      }
    },
    (err) => console.log(err)
  );
}

function GetPromise(promiseList) {
  return promiseList.map((promise) => promise.then((res) => res));
}
