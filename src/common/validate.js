/* eslint-disable no-useless-escape */

//信箱驗證
export function validEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
}

//手機號碼驗證
export function validPhone(phone) {
  const reg = /^09[0-9]{8}$/;
  return reg.test(phone);
}

//中文姓名驗證
export function validName(name) {
  const reg = /[\u4E00-\u9FA5]{2,5}$/;
  return reg.test(name);
}

//地址驗證
export function validAddress(address) {
  return address.length >= 6;
}

//密碼驗證
export function validPassword(pwd) {
  return pwd.length >= 6;
}

//密碼確認驗證
export function validRePassword(pwd, re_pwd) {
  return pwd == re_pwd;
}

//不留空驗證
export function validEmpty(val) {
  return val != '' && val.length > 0 && val != null && val != undefined;
}

//不留空檔案驗證
export function validFileEmpty(val) {
  return val != '' && val != null && val != undefined;
}
