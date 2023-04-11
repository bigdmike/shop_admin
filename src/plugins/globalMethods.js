import Vue from 'vue';
// 金額逗號格式化
Vue.prototype.$MoneyFormat = (price) => {
  let val = (price / 1).toFixed(0).replace('.', ',');
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
// 圖片加上api domain
Vue.prototype.$ImageUrl = (item) => {
  return item == '' ? '' : process.env.VUE_APP_BASEURL + item;
};

// 建立圖片編輯物件
Vue.prototype.$SetImageObj = (item, image_url) => {
  let tmp_data = Object.assign({}, item);
  tmp_data.type = 'image';
  tmp_data.Image1 = null;
  tmp_data.PreviewImage = Vue.prototype.$ImageUrl(image_url);
  return tmp_data;
};

// 字串Y/N轉Boolean
Vue.prototype.$StrToBool = (item) => {
  Object.keys(item).forEach((key) => {
    item[key] == 'Y' ? (item[key] = true) : '';
    item[key] == 'N' ? (item[key] = false) : '';
  });
  return item;
};

// Boolean轉字串Y/N
Vue.prototype.$BoolToStr = (item) => {
  Object.keys(item).forEach((key) => {
    item[key] === true ? (item[key] = 'Y') : '';
    item[key] === false ? (item[key] = 'N') : '';
  });
  return item;
};

// 日期計算
Date.prototype.addDays = function(d) {
  return new Date(this.valueOf() + 864e5 * d);
};

// 日期格式
Date.prototype.Format = function(fmt) {
  //author: meizz
  var o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
  return fmt;
};

// HCT 新竹貨運配送單使用
Vue.prototype.$HexToAscii = (str1) => {
  let input = str1.replace(/[^A-Fa-f0-9]/g, '');
  if (input.length % 2) {
    return;
  }

  let binary = new Array();
  for (let i = 0; i < input.length / 2; i++) {
    let h = input.substr(i * 2, 2);
    binary[i] = parseInt(h, 16);
  }

  let byteArray = new Uint8Array(binary);
  return window.URL.createObjectURL(
    new Blob([byteArray], {
      type: 'application/octet-stream',
    })
  );
  //document.body.appendChild(img)
};
