import { isCardId, isMobile, isEmail, validateNumber, validUpperCase, isPhone, isBank } from '@/utils/validate.js';

// 表单校验规则
export const rulesObj = {
  fill: [{ required: true, message: '请输入', trigger: 'blur' }],
  select: [{ required: true, message: '请选择', trigger: 'change' }],
  upload: [{ required: true, message: '请上传文件', trigger: 'change' }],
  idNumber: [
    {
      validator: (rule, value, callback) => {
        if (isCardId(value) || !value) {
          callback();
        } else {
          callback(new Error('请输入有效身份证'));
        }
      },
      trigger: 'blur',
    },
  ],
  phone: [
    {
      validator: (rule, value, callback) => {
        if (isMobile(value) || !value) {
          callback();
        } else {
          callback(new Error('手机号格式错误，请重新输入'));
        }
      },
      trigger: 'blur',
    },
  ],
  //固定电话
  mobilePhone: [
    {
      validator: (rule, value, callback) => {
        // if (!value) {
        //   callback(new Error('请输入电话'));
        // } else
        if (value && !isPhone(value)) {
          callback(new Error('电话格式错误'));
        } else {
          callback();
        }
      },
      trigger: 'blur',
    },
  ],
  bank: [
    {
      validator: (rule, value, callback) => {
        // if (isBank(value) || !value) {
          callback();
        // } else {
        //   callback(new Error('卡号格式错误，请重新输入'));
        // }
      },
      // trigger: 'blur',
      // message: '卡号格式错误，请重新输入',
    },
  ],
  email: [
    {
      validator: (rule, value, callback) => {
        if (isEmail(value) || !value) {
          callback();
        } else {
          callback(new Error('邮箱格式错误，请重新输入'));
        }
      },
      trigger: 'blur',
    },
  ],

  // 限制输入数字
  onlyNumber: [
    {
      validator: (rule, value, callback) => {
        validateNumber(rule, value, callback);
      },
      trigger: 'blur',
    },
  ],
};

// 拼接校验提示
export const checkRules = (ruleObj, config, ruleName = []) => {
  let arr = ruleObj[config.ruleFielId] || [];
  const fielIdArr = ['fill', 'select', ...ruleName];
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
