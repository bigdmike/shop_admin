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