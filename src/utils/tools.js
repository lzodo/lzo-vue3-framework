import dayjs from 'dayjs';
// import { MessageBox, Message } from "element-ui";

/**
 * 判断是否为对象
 * @param {} obj
 * @returns
 */
export function isObj(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

// 格式化日期
export const dateFormat = (datetime, format = 'YYYY-MM-DD HH:mm:ss', isEmpty) => {
  if (datetime == '无' || datetime == 'null' || !datetime) return isEmpty ? '' : '--';
  return dayjs(datetime).format(format);
};

export function dateFormatCustom(time, type = 'YYYY-MM-DD') {
  return dayjs(time).format(type);
}

// 查找枚举字段文字
export const showEnmuName = (arr = [], value, valId = 'value', nameId = 'label') => {
  const obj = arr.find(item => {
    return item[valId] == value;
  });
  return (obj || {})[nameId] || '--';
};

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
export function handleTree(data, id, parentId, children) {
  let config = {
    id: id || 'id',
    parentId: parentId || 'parentId',
    childrenList: children || 'children',
  };

  var childrenListMap = {};
  var nodeIds = {};
  var tree = [];

  for (let d of data) {
    let parentId = d[config.parentId];
    if (childrenListMap[parentId] == null) {
      childrenListMap[parentId] = [];
    }
    nodeIds[d[config.id]] = d;
    childrenListMap[parentId].push(d);
  }

  for (let d of data) {
    let parentId = d[config.parentId];
    if (nodeIds[parentId] == null) {
      tree.push(d);
    }
  }

  for (let t of tree) {
    adaptToChildrenList(t);
  }

  function adaptToChildrenList(o) {
    if (childrenListMap[o[config.id]] !== null) {
      o[config.childrenList] = childrenListMap[o[config.id]];
    }
    if (o[config.childrenList]) {
      for (let c of o[config.childrenList]) {
        adaptToChildrenList(c);
      }
    }
  }
  return tree;
}

/**
 * 实现canvas图片直接上传功能
 * base64 转 file
 */
export function dataURLtoBlob(base64, fileName) {
  // 将base64按照 , 进行分割 将前缀  与后续内容分隔开
  let data = base64.split(',');
  // 利用正则表达式 从前缀中获取图片的类型信息（image/png、image/jpeg、image/webp等）
  let type = data[0].match(/:(.*?);/)[1];
  // 从图片的类型信息中 获取具体的文件格式后缀（png、jpeg、webp）
  let suffix = type.split('/')[1];
  // 使用atob()对base64数据进行解码  结果是一个文件数据流 以字符串的格式输出
  const bstr = window.atob(data[1]);
  // 获取解码结果字符串的长度
  let n = bstr.length;
  // 根据解码结果字符串的长度创建一个等长的整形数字数组
  // 但在创建时 所有元素初始值都为 0
  const u8arr = new Uint8Array(n);
  // 将整形数组的每个元素填充为解码结果字符串对应位置字符的UTF-16 编码单元
  while (n--) {
    // charCodeAt()：获取给定索引处字符对应的 UTF-16 代码单元
    u8arr[n] = bstr.charCodeAt(n);
  }
  // 利用构造函数创建File文件对象
  // new File(bits, name, options)
  const file = new File([u8arr], `${fileName}.${suffix}`, {
    type: type,
  });
  // 将File文件对象返回给方法的调用者
  return file;
}

/**
 * 获取到的二进制文件 转 base64文件
 * @param file
 * @param scale ----压缩比例
 * @param callback ---回调函数
 */
export function fileToCompressBase64AndBlob(file, scale, callback) {
  const reader = new FileReader();
  reader.readAsDataURL(file); // 添加二进制文件
  reader.onload = function (event) {
    console.log('转换成功');
    const base64 = event.target.result;
    compressImg(base64, scale, callback);
  };
  //转 失败
  reader.onerror = function (error) {
    console.log('转换失败');
    callback(false);
  };
}

/**
 * 压缩图片方法
 * @param base64  ----baser64文件
 * @param scale ----压缩比例 画面质量0-9，数字越小文件越小画质越差
 * @param callback ---回调函数
 */
function compressImg(base64, scale, callback) {
  console.log(`缩放比例 ${scale}`);

  // 处理缩放，转换格式
  const img = new Image();
  img.src = base64;
  img.onload = function () {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.setAttribute('width', img.width);
    canvas.setAttribute('height', img.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // 绘制白底（png图片默认黑底）
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // 绘制图片
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    // 转成base64 文件, png 图片无效（可以用 canvas-png-compression）
    // let base64 = canvas.toDataURL('image/jpeg');
    let base64 = canvas.toDataURL('image/jpeg');
    // 方案1、直接用传入的压缩比例
    base64 = canvas.toDataURL('image/jpeg', scale);
    // 方案2、限制图片最大为3M
    // while (base64.length > 1024 * 1024 * 3) {
    //   scale -= 0.01;
    //   base64 = canvas.toDataURL('image/jpeg', scale);
    // }
    // baser64 TO blob
    const arr = base64.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bytes = atob(arr[1]);
    const bytesLength = bytes.length;
    const u8arr = new Uint8Array(bytesLength);
    for (let i = 0; i < bytes.length; i++) {
      u8arr[i] = bytes.charCodeAt(i);
    }
    const blob = new Blob([u8arr], { type: mime });
    // 回调函数
    callback(true, blob, base64);
  };
}

// ================================== 新 ====================================
// ================================== = =====================================
// ================================== = =====================================
// ================================== = =====================================
// ================================== 老 ====================================
// -------------------------------------------------------------------------
// ------------------------------------------------------------------------
// -----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ---------------------------------------------------------------------
// --------------------------------------------------------------------
// -------------------------------------------------------------------
// ------------------------------------------------------------------
// -----------------------------------------------------------------
// ----------------------------------------------------------------
// ---------------------------------------------------------------
// --------------------------------------------------------------
// -------------------------------------------------------------
// ------------------------------------------------------------
// -----------------------------------------------------------
// ----------------------------------------------------------
// ---------------------------------------------------------
// --------------------------------------------------------
// -------------------------------------------------------
// ------------------------------------------------------
// -----------------------------------------------------
// ----------------------------------------------------
// ---------------------------------------------------
// -------------------------------------------------
// -----------------------------------------------
// ---------------------------------------------
// -------------------------------------------
// -----------------------------------------
// ---------------------------------------
// -------------------------------------
// -----------------------------------
// ---------------------------------
// -------------------------------
// -----------------------------
// ---------------------------
// -------------------------
// -----------------------
// ---------------------
// -------------------
// -----------------
// ---------------
// -------------
// -----------
// ---------
// -------
// -----
// ---
// -

/**
 * 判断是否是IE
 * @returns boolean
 */
export function isInternetExplor() {
  if (!!window.ActiveXobject || 'ActiveXObject' in window) {
    return true;
  } else {
    return false;
  }
}
/**
 * 判断是否是IE11
 * @returns boolean
 */
export function isIE11() {
  if (/Trident\/7\./.test(navigator.userAgent)) {
    return true;
  } else {
    return false;
  }
}
// 中文转拼音isLowerCase:1-字符串全部转小写
// export const chineseToEn = (cnStr, isLowerCase = 1) => {
//   let pinyin = require('js-pinyin');
//   pinyin.setOptions({ checkPolyphone: false, charCase: 0 });
//   let transferStr = pinyin.getFullChars(cnStr);
//   if (isLowerCase) {
//     transferStr = transferStr.toLowerCase();
//   }
//   return transferStr;
// };

/**
 * 获取href参数
 * @param {url}
 */
export function getURLParams(url) {
  var params = {},
    reg = /([^?=&]+)=([^&]*)/gi;
  url.replace(reg, function (str, a, b) {
    params[a] = b;
  });
  return params;
}
export function getURLQueryString(name) {
  if (!name) {
    return '';
  }
  const urlParams = getURLParams(window.location.href);
  return urlParams[name] || '';
}

// 千分位转换
export const formatThousand = num => {
  if (num === undefined || num === null) return '';
  let source = String(num).split('.');
  source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'), '$1,');
  let _tempResult = '';
  _tempResult = source.join('.');
  if (_tempResult !== '' && _tempResult.indexOf('.') < 0) {
    _tempResult = _tempResult;
  }
  return _tempResult;
};

// element表单拼接校验规则文字
export function checkRules(ruleObj, config, fielIdArr = ['fill', 'select']) {
  let arr = ruleObj[config.ruleFielId];
  if (fielIdArr.indexOf(config.ruleFielId) > -1) {
    arr = arr.map(item => {
      return {
        ...item,
        message: `${item.message || ''}${config.label || ''}`,
      };
    });
  }
  return arr;
}

// 数组转化成树形结构
export function tranListToTreeData(arr, id, pId, sortField = 'sort') {
  const newArr = [];
  // 1. 构建一个字典：能够快速根据id找到对象。
  const map = {};
  arr.forEach(item => {
    // 为了计算方便，统一添加children
    item.children = [];
    // 构建一个字典
    const key = item[id];
    map[key] = item;
  });

  // 2. 对于arr中的每一项
  arr.forEach(item => {
    const parent = map[item[pId]];
    if (parent) {
      //    如果它有父级，把当前对象添加父级元素的children中
      parent.children.push(item);
      if (sortField) {
        parent.children.sort((a, b) => {
          return a[sortField] - b[sortField];
        });
      }
    } else {
      //    如果它没有父级（pid:''）,直接添加到newArr
      newArr.push(item);
    }
  });

  if (sortField) {
    newArr.sort((a, b) => {
      return a[sortField] - b[sortField];
    });
  }

  return newArr;
}
//树结构展开为扁平化
/**
 *
 * @param {*} tree  树结构数据
 * @param {*} property children字段名
 * @returns
 */
export function treeToArray(tree, property) {
  let res = [];
  tree.forEach(el => {
    res.push(el);
    el[property] && res.push(...treeToArray(el[property], property));
  });
  return res;
}

// data 是树型数组
// key 是String 对象中的key值
// value 是key值符合的条件
export function getAllChidlren(data, value, key, childKey = 'child') {
  var result = [];
  var fn = function (data) {
    if (Array.isArray(data)) {
      // 判断是否是数组并且没有的情况下，
      data.forEach(item => {
        if ((Array.isArray(value) && (value || []).some(val => item[key] == val)) || item[key] === value) {
          // 数据循环每个子项，并且判断子项下边是否有id值
          result.push(item); // 返回的结果等于每一项
        } else if (item[childKey]) {
          fn(item[childKey]); // 递归调用下边的子项
        }
      });
    }
  };
  fn(data); // 调用一下
  return result;
}

// 获取应用门户对应的code
export function getApplyPrefixCode(targetUrl) {
  const winTopUrl = targetUrl || window.top.location.pathname || '';
  const mkey = getPageKey(winTopUrl);
  const moduleKeyMap = {
    erpPortal: 'ERP',
    crmPortal: 'CRM',
    leaderShow: 'LEADER',
  };
  return moduleKeyMap[mkey] || '';
}

// 获取文件夹名称
export function getPageKey(targetUrl) {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isDebug = process.env.VUE_APP_MODE === 'debug';
  const path = targetUrl || location.pathname;
  const names = path.split('/');
  const applyName = isDevelopment ? names[1] : isDebug ? names[1] : names[1];
  return applyName;
}

/**
 * 导出-下载文件
 * @param {*} res -后端返回二进制流
 * @param {*} fileName -文件名需要带后缀名
 * @param {*} blobConfig -Blob配置可不传
 */
// export function exportDownFile(res, fileName, blobConfig) {
//   try {
//     let enc = new TextDecoder("utf-8");
//     let rtnData = JSON.parse(enc.decode(new Uint8Array(res)));
//     if (rtnData.code && rtnData.code != 200) {
//       Message({
//         message: rtnData.msg || "导出失败",
//         type: "error",
//       });
//     }
//   } catch (error) {
//     let blob = blobConfig ? new Blob([res], blobConfig) : new Blob([res]);
//     let url = window.URL.createObjectURL(blob);
//     let link = document.createElement("a");
//     link.download = fileName;
//     link.href = url;
//     link.dispatchEvent(new MouseEvent("click"));
//     URL.revokeObjectURL(url);
//   }
// }

/**
 * 千位分割数字
 */
export function toDecimalMark(num) {
  if (typeof parseFloat(num) != 'number') {
    return '--';
  }
  return num.toLocaleString('en-US');
}

/**
 * 数字转中文数字
 * @param {*} num
 * @returns
 */
export function changeNumToHan(num) {
  var arr1 = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  var arr2 = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万', '十', '百', '千', '亿'];
  if (!num || isNaN(num)) return '零';
  var english = num.toString().split('');
  var result = '';
  for (var i = 0; i < english.length; i++) {
    var des_i = english.length - 1 - i; // 倒序排列设值
    result = arr2[i] + result;
    var arr1_index = english[des_i];
    result = arr1[arr1_index] + result;
  }
  result = result.replace(/零(千|百|十)/g, '零').replace(/十零/g, '十'); // 将【零千、零百】换成【零】 【十零】换成【十】
  result = result.replace(/零+/g, '零'); // 合并中间多个零为一个零
  result = result.replace(/零亿/g, '亿').replace(/零万/g, '万'); // 将【零亿】换成【亿】【零万】换成【万】
  result = result.replace(/亿万/g, '亿'); // 将【亿万】换成【亿】
  result = result.replace(/零+$/, ''); // 移除末尾的零
  // 将【一十】换成【十】
  result = result.replace(/^一十/g, '十');
  return result;
}

function isObject(target) {
  if (typeof target === 'object') {
    return true;
  }
  return false;
}

function isArray(target) {
  if (Array.isArray(target)) {
    return true;
  }
  return false;
}

export function calculateDiffTime(startTime, endTime, type) {
  var runTime = parseInt(endTime - startTime);
  var year = Math.floor(runTime / 86400 / 365);
  runTime = runTime % (86400 * 365);
  var month = Math.floor(runTime / 86400 / 30);
  runTime = runTime % (86400 * 30);
  var day = Math.floor(runTime / 86400);
  runTime = runTime % 86400;
  var hour = Math.floor(runTime / 3600);
  runTime = runTime % 3600;
  var minute = Math.floor(runTime / 60);
  runTime = runTime % 60;
  var second = runTime;
  if (type === 1) {
    // 返回相差年数
    return year + '年';
  } else if (type === 2) {
    // 返回相差年数月数
    return year + '年' + month + '月';
  } else if (type === 3) {
    // 返回相差年数月数天数
    return year + '年' + month + '月' + day + '日';
  } else {
    // 返回相差年数月数天数时分秒
    let time = '';
    if (year > 0) {
      time = year + '年';
    }
    if (month > 0) {
      time += month + '月';
    }
    if (day > 0) {
      time += day + '日';
    }
    if (hour > 0) {
      time += hour + '时';
    }
    if (minute > 0) {
      time += minute + '分';
    }
    if (second > 0) {
      time += second + '秒';
    }
    return time;
  }
}

/**
 *
 * @param {*} money
 * @returns 金额转中文大写
 */
export function translateMoney(money) {
  //汉字的数字
  var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
  //基本单位
  var cnIntRadice = new Array('', '拾', '佰', '仟');
  //对应整数部分扩展单位
  var cnIntUnits = new Array('', '万', '亿', '兆');
  //对应小数部分单位
  var cnDecUnits = new Array('角', '分', '毫', '厘');
  //整数金额时后面跟的字符
  var cnInteger = '整';
  //整型完以后的单位
  var cnIntLast = '元';
  //最大处理的数字
  var maxNum = 999999999999999.9999;
  //金额整数部分
  var integerNum;
  //金额小数部分
  var decimalNum;
  //输出的中文金额字符串
  var chineseStr = '';
  //分离金额后用的数组，预定义
  var parts;
  if (money == '') {
    return '';
  }
  money = parseFloat(money);
  if (money >= maxNum) {
    //超出最大处理数字
    return '';
  }
  if (money == 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger;
    return chineseStr;
  }
  //转换为字符串
  money = money.toString();
  if (money.indexOf('.') == -1) {
    integerNum = money;
    decimalNum = '';
  } else {
    parts = money.split('.');
    integerNum = parts[0];
    decimalNum = parts[1].substr(0, 4);
  }
  //获取整型部分转换
  if (parseInt(integerNum, 10) > 0) {
    var zeroCount = 0;
    var IntLen = integerNum.length;
    for (var i = 0; i < IntLen; i++) {
      var n = integerNum.substr(i, 1);
      var p = IntLen - i - 1;
      var q = p / 4;
      var m = p % 4;
      if (n == '0') {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0];
        }
        //归零
        zeroCount = 0;
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
      }
      if (m == 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q];
      }
    }
    chineseStr += cnIntLast;
  }
  //小数部分
  if (decimalNum != '') {
    var decLen = decimalNum.length;
    for (let i = 0; i < decLen; i++) {
      let n = decimalNum.substr(i, 1);
      if (n != '0') {
        chineseStr += cnNums[Number(n)] + cnDecUnits[i];
      }
    }
  }
  if (chineseStr == '') {
    chineseStr += cnNums[0] + cnIntLast + cnInteger;
  } else if (decimalNum == '') {
    chineseStr += cnInteger;
  }
  return chineseStr;
}

// html标签反转义
export function HTMLDecode(text) {
  var temp = document.createElement('div');
  temp.innerHTML = text;
  var output = temp.innerText || temp.textContent;
  temp = null;
  return output;
}
// html标签转义
export function HTMLEncode(html) {
  var temp = document.createElement('div');
  temp.textContent != null ? (temp.textContent = html) : (temp.innerText = html);
  var output = temp.innerHTML;
  temp = null;
  return output;
}
// 获取字典label
export function getEnumStr(data, key) {
  let result = this[key].filter(item => {
    return item.value == data;
  });
  if (result.length) {
    return result[0].label;
  }
  return '--';
}
// 时间处理
export function handleTime(param = {}, handleKey = []) {
  let result = {
    ...param,
  };
  let keyArr = [...handleKey];
  keyArr.forEach(item => {
    if (!result[item].length) {
      result[item] = null;
    } else {
      result[item] = [`${result[item][0]} 00:00:00`, `${result[item][1]} 23:59:59`];
    }
  });
  return result;
}

//js将数值转为万，亿，万亿并保留两位小数
export function bigNumberTransform(value) {
  if (!value) {
    return '--';
  }
  let param = {};
  let k = 10000;
  let sizes = ['', '万', '亿', '万亿'];
  let i;
  if (value < k) {
    param.value = value;
    param.unit = '';
  } else {
    i = Math.floor(Math.log(value) / Math.log(k));
    param.value = (value / Math.pow(k, i)).toFixed(2);
    param.unit = sizes[i];
  }
  return param.value + param.unit;
}
