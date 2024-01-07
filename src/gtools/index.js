import { dateFormat, showEnmuName } from '../utils/tools';
function dateformat(time, fmt = 'YYYY-MM-DD HH:mm:ss') {
  return dateFormat(time, fmt);
}

// code转name枚举数据过滤器
function codeToName(code, dictArr, valId = 'value', nameId = 'label') {
  return showEnmuName(dictArr, code, valId, nameId);
}

export default function gtools(app) {
  app.config.globalProperties.$gtools = {
    dateformat,
    codeToName,
  };
}
