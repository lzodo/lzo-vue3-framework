export const formColumnList = [
  {
    label: '字典名称',
    fielId: 'dictName',
    ruleFielId: 'fill',
    maxlength: 50,
  },
  {
    label: '字典类型',
    fielId: 'dictType',
    ruleFielId: 'fill',
    maxlength: 50,
  },
  {
    label: '状态',
    ruleFielId: 'select',
    fielId: 'status',
    type: 'radio',
    labelFile: 'label',
    valueKey: 'value',
    optionsFielId: 'sys_normal_disable',
  },
  {
    label: '备注',
    fielId: 'remark',
    type: 'textarea',
    maxlength: 100,
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
