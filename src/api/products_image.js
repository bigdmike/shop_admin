import {
  patch,
  del,
  // post,
  get,
  post_image,
} from '@/common/request';

// 商品
export function get_picture(id) {
  return get('admin/goods/picture/' + id);
}
export function create_picture(picture_item) {
  picture_item.SizeID == '' ? (picture_item.SizeID = 0) : '';
  picture_item.ColorID == '' ? (picture_item.ColorID = 0) : '';
  let data = {};
  data.Seq1 = picture_item.Seq;
  data.Image1 = picture_item.Image;
  return post_image(
    `admin/goods/picture/${picture_item.GoodsID}/${picture_item.ColorID}/${picture_item.SizeID}`,
    data,
    '已成功新增商品圖片'
  );
}

export function update_picture_sort(list) {
  return patch(
    'admin/goods/picture/updateSeqBatch',
    list,
    '已成功更新商品排序'
  );
}
export function delete_picture(id) {
  return del('admin/goods/picture/' + id, '已成功刪除商品');
}

export function update_picture_image(goods_id, picture_item) {
  return post_image(
    'admin/goods/picture/' + goods_id + '/0/0',
    picture_item,
    '已成功更新商品圖'
  );
}
