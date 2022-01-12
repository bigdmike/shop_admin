export function StrToBool(item) {
    Object.keys(item).forEach(key => {
        item[key] == "Y" ? item[key] = true : ""
        item[key] == "N" ? item[key] = false : ""
    })
    return item
}

export function BoolToStr(item) {
    console.log(item)
    Object.keys(item).forEach(key => {
        item[key] === true ? item[key] = "Y" : ""
        item[key] === false ? item[key] = "N" : ""
    })
    return item
}

export function ImageUrl(item) {
    return item == "" ? "" : process.env.VUE_APP_BASEURL + item
}

export function DataSort(moved_log, data) {
    let origin_data = JSON.parse(JSON.stringify(data))
    if (moved_log.moved.oldIndex > moved_log.moved.newIndex) {
        let old_data = data[moved_log.moved.oldIndex];
        for (let i = moved_log.moved.oldIndex; i > moved_log.moved.newIndex; i--) {
            data[i] = data[i - 1];
        }
        data[moved_log.moved.newIndex] = old_data;
    } else {
        let old_data = data[moved_log.moved.oldIndex];
        data.forEach((item, item_index) => {
            if (item_index > moved_log.moved.oldIndex && item_index <= moved_log.moved.newIndex) {
                data[item_index - 1] = item;
            }
        });
        data[moved_log.moved.newIndex] = old_data;
    }
    data.forEach((item, item_index) => {
        item.Seq = origin_data[item_index].Seq;
    });
    return data
}