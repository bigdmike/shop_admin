import { post_image, post } from '@/common/request';

//通用欄位
export async function get_common_column(column_list) {
  let data = {
    Column: column_list,
  };
  let res = await post('admin/column', data);
  let res_obj = {};
  res.data.forEach((item) => {
    res_obj[item.Title] = item;
  });
  return res_obj;
}
export function update_common_column(column_item, front_show = 'Y') {
  let data = {
    Title: column_item.Title,
    Content: column_item.Content,
    Front: front_show,
  };
  return post('admin/column/replace', data, '已成功更新欄位');
}
export function update_common_column_image(column_name, column_item) {
  let image_data = {};
  typeof column_item.Image1 == 'string' || column_item.Image1 == null
    ? ''
    : (image_data[column_name] = column_item.Image1);
  // image_data.Front = front_show
  return post_image('admin/column/image', image_data, '已成功更新欄位');
}

export function updateData(column_list) {
  let request_list = [];

  Object.keys(column_list).forEach((key) => {
    const column = column_list[key];
    if (column.type == 'image') {
      let image_data = {};
      typeof column.Image1 == 'string' || column.Image1 == null
        ? ''
        : (image_data[column.Title] = column.Image1);
      request_list.push(
        post_image('admin/column/image', image_data, '已成功更新欄位')
      );
    } else {
      const column_data = {
        Title: column.Title,
        Content: column.Content,
        Front: column.Front,
      };
      request_list.push(
        post('admin/column/replace', column_data, '已成功更新欄位')
      );
    }
  });

  return Promise.all(GetPromise(request_list)).then(
    (res) => {
      if (request_list.length == res.length) {
        return res;
      }
    },
    (err) => console.log(err)
  );
}

function GetPromise(promiseList) {
  return promiseList.map((promise) => promise.then((res) => res));
}
