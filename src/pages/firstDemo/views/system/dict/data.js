export const formColumn = [
  {
    label: '接口名称',
    ruleFielId: 'fill',
    fielId: 'name',
    maxlength: 50,
  },
  {
    label: '接口类型',
    ruleFielId: 'select',
    fielId: 'type',
    type: 'radio',
    labelFile: 'name',
    valueKey: 'value',
    optionsFielId: 'privateEnmu1',
  },
  {
    label: '接口地址',
    fielId: 'url',
    ruleFielId: 'fill',
    maxlength: 2000,
    type: 'textarea',
    rows: 2,
    showWordLimit: false,
    delayLoad: { prop: 'type', value: 2 },
  },
  {
    label: '请求方式',
    fielId: 'way',
    type: 'radio',
    labelFile: 'name',
    valueKey: 'value',
    optionsFielId: 'privateEnmu2',
    delayLoad: { prop: 'type', value: 2 },
  },
  {
    label: '入参',
    fielId: 'param',
    maxlength: 200,
    type: 'textarea',
    rows: 2,
    showWordLimit: false,
    delayLoad: { prop: 'type', value: 2 },
  },
  {
    label: '',
    type: 'middleInster',
    isOnlyViewNotLoad: true,
    delayLoad: { prop: 'type', value: 1 },
  },
  {
    label: '查询语句',
    fielId: 'querySql',
    ruleFielId: 'fill',
    maxlength: 200,
    type: 'textarea',
    rows: 2,
    showWordLimit: false,
    isOnlyView: true,
    delayLoad: { prop: 'type', value: 1 },
  },
];

export const headerColumnList = [
  {
    label: '字典名称',
    fielId: 'dictName',
  },
  {
    label: '字典类型',
    fielId: 'dictType',
  },
  {
    label: '字典类型',
    fielId: 'dictType',
  },
  {
    label: '字典类型',
    fielId: 'dictType',
  },
  {
    label: '字典类型',
    fielId: 'dictType',
  },
  {
    label: '字典类型',
    fielId: 'dictType',
  },
  {
    label: '字典类型',
    fielId: 'dictType',
  },
  {
    label: '字典类型',
    fielId: 'dictType',
  },
  {
    label: '字典类型',
    fielId: 'dictType',
  },
  {
    label: '状态',
    fielId: 'status',
    type: 'select',
    labelFile: 'label',
    valueKey: 'value',
    optionsFielId: 'sys_normal_disable',
  },
  {
    label: '创建时间',
    fielId: 'dateRange',
    type: 'date',
    dateType: 'daterange',
  },
];

export const tableColumnList = [
  {
    label: '字典编号',
    fielId: 'dictId',
  },
  {
    label: '字典名称',
    fielId: 'dictName',
  },
  {
    label: '字典类型',
    fielId: 'dictType',
  },
  {
    label: '字典编号',
    fielId: 'dictId',
  },
  {
    label: '状态',
    fielId: 'status',
    type: 'select',
    labelFile: 'label',
    valueKey: 'value',
    optionsFielId: 'sys_normal_disable',
  },
  {
    label: '备注',
    fielId: 'remark',
  },
  {
    label: '创建时间',
    fielId: 'createTime',
    type: 'datetime',
  },
];
