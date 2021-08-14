const getPrefixCls = (suffixCls?: string, customizePrefixCls?: string) => {
  if (customizePrefixCls) return customizePrefixCls;
  return suffixCls ? `defat-${suffixCls}` : "defat";
};

const sleep = (wait: number) =>
  new Promise((resolve) => globalThis.setTimeout(resolve, wait));

export { getPrefixCls, sleep };
