export function SetEditData(value_data, edit_data) {
  let tmp_edit_data = JSON.parse(JSON.stringify(edit_data));
  let tmp_value_data = JSON.parse(JSON.stringify(value_data));

  tmp_edit_data.forEach((edit_item) => {
    if (edit_item.type == 'card') {
      edit_item.columns.forEach((column_item) => {
        column_item.components.forEach((component_item) => {
          if (
            component_item.type == 'image' ||
            component_item.type == 'image_card'
          ) {
            tmp_value_data = SetImageData(tmp_value_data, component_item);
          }
        });
      });
    } else if (edit_item.type == 'image_card') {
      tmp_value_data = SetImageData(tmp_value_data, edit_item);
    }
  });

  return tmp_value_data;
}

function SetImageData(value_data, component_item) {
  let tmp_value_data = JSON.parse(JSON.stringify(value_data));
  let tmp_data = Object.assign({}, value_data[component_item.column_key]);

  tmp_data.type = 'image';
  tmp_data.Image1 = null;
  tmp_data.PreviewImage = SetImageUrl(
    value_data[component_item.column_key].Content
  );

  tmp_value_data[component_item.column_key] = tmp_data;

  return tmp_value_data;
}

function SetImageUrl(val) {
  return val == '' ? '' : process.env.VUE_APP_BASEURL + val;
}
