/**
 * 判断url是否是http或https
 * @param {string} path
 * @returns {Boolean}
 */
export function isHttp(url) {
  return url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1;
}

/**
 * 判断path是否为外链
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true;
  }
  return false;
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]';
  }
  return Array.isArray(arg);
}

/**
 * 是否为有效的身份证号
 *
 * @param {string} val
 * @returns {boolean}
 */
export function isCardId(val) {
  var reg = /^\d{6}(19|2\d)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X|x)?$/;

  return reg.test(val);
}

export function formatPhone(phone, str = '****') {
  let reg = /(\d{3})\d{4}(\d{4})/;

  return phone.replace(reg, '$1' + str + '$2');
}

/**
 * 是否为有效的手机号
 * @param {string} val
 * @returns {boolean}
 */
export function isMobile(val) {
  var reg = /^[1][23456789]\d{9}$/;

  return reg.test(val);
}

/**
 * 是否为有效的手机号及固定电话
 * @param {string} val
 * @returns {boolean}
 */
export function isPhone(val) {
  var reg = /^(0?1[23456789]\d{9})$|^\d{3}$|^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/;

  return reg.test(val);
}

/**
 * 是否为中文
 * @param {string} val
 * @returns {boolean}
 */
export function isCN(val) {
  var reg = /[\u4e00-\u9fa5]/;

  return reg.test(val);
}

/**
 * 是否为有效邮箱
 * @param {string} val
 * @returns {boolean}
 */
export function isEmail(val) {
  var reg = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  return reg.test(val);
}

/**
 * 是否为有效的密码(8-16位大小字母加数字组合，不能包含空格)
 * @param {string} val
 * @returns {boolean}
 *
 * isValidPwd('Aa123456')
 */
export function isValidPwd(val) {
  var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8, 16}$/;
  // var reg = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,16}$/;

  return reg.test(val);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor'];
  return valid_map.indexOf(str.trim()) >= 0;
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg =
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return reg.test(url);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  const reg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
}

/**
 * 表单自定义验证方法
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
//验证数字
export function validateNumber(rule, value, callback) {
  let reg = /^[0-9]*$/;
  if (value && !reg.test(value)) {
    callback(new Error('请输入整数类型~'));
  } else {
    callback();
  }
}

//验证固话及手机号码
export function validatePhone(rule, value, callback) {
  let reg = /^(0?1[3456789]\d{9})$|^\d{3}$|^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/;
  if (value && !reg.test(value)) {
    callback(new Error('请输入正确的号码格式~'));
  } else {
    callback();
  }
}
//验证银行卡号
export function isBank(value) {
  let reg = /^[0-9]{9,19}$/;
  return reg.test(value);
}
