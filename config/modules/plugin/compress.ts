/**
 * Used to package and output gzip. Note that this does not work properly in Vite, the specific reason is still being investigated
 * gzip压缩
 * https://github.com/anncwb/vite-plugin-compression
 */
import compressPlugin from 'vite-plugin-compression';

export default function configCompressPlugin(_env: ImportMetaEnv, isBuild: boolean) {
  if (!isBuild) {
    return undefined;
  }
  // gzip压缩
  return compressPlugin({
    //gzip静态资源压缩
    verbose: true, // 默认即可
    disable: false, //开启压缩(不禁用)，默认即可
    deleteOriginFile: false, //删除源文件
    threshold: 10240, //压缩前最小文件大小
    algorithm: 'gzip', //压缩算法
    ext: '.gz' //文件类型
  });
}
