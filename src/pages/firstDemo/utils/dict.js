import useDictStore from "@/pages/firstDemo/store/dict";
import { getDicts } from "@/pages/firstDemo/api/system/dict/data";

/**
 * 获取字典数据
 */
export function useDict(...args) {
  const res = ref({});
  console.log(args, 416123);
  return (() => {
    args.forEach((dictType, index) => {
      res.value[dictType] = [];
      // 去 store 取传入 dictType 的类型
      const dicts = useDictStore().getDict(dictType);
      // 如果存在就直接返回
      if (dicts) {
        res.value[dictType] = dicts;
      } else {
        // 返回调用接口获取
        getDicts(dictType).then((resp) => {
          // 存入res中
          res.value[dictType] = resp.data.map((p) => ({
            label: p.dictLabel,
            value: p.dictValue,
            elTagType: p.listClass,
            elTagClass: p.cssClass,
          }));

          // 得到的结果存入 store
          useDictStore().setDict(dictType, res.value[dictType]);
        });
      }
    });

    // 将一个响应式对象转换为一个普通对象，这个普通对象的每个属性都是指向源对象相应属性的 ref。每个单独的 ref 都是使用 toRef() 创建的。
    return toRefs(res.value);
  })();
}
