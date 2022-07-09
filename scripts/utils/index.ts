// 通过 loadEnv 导出的环境变量为 Record<string, string>，这里用于转换成类型更准确的值
/* global ImportMetaEnv, SafeAny */
export function convertViteEnv(envRecord: Record<string, string>): ImportMetaEnv {
  const env: SafeAny = {};

  for (const key of Object.keys(envRecord)) {
    let value: SafeAny = envRecord[key].replace(/\\n/g, '\n');

    value = value === 'true' ? true : value === 'false' ? false : value;
    if (key === 'VITE_PORT') {
      value = Number(value);
    }
    env[key] = value;
  }
  return env;
}
