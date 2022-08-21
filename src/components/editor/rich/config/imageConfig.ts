import type { IEditorConfig } from '@wangeditor/editor';
import type { InsertFnType, ImageElement } from '../types';
import { getToken } from '@/utils/auth';

const getDefaultConfig = () => {
  return {
    // form-data fieldName ，默认值 'wangeditor-uploaded-image'
    fieldName: 'file',

    // 单个文件的最大体积限制，默认为 2M
    maxFileSize: 5 * 1024 * 1024, // 5M

    // 最多可上传几个文件，默认为 100
    maxNumberOfFiles: 20,

    // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
    allowedFileTypes: [],

    // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
    meta: {},

    // 将 meta 拼接到 url 参数中，默认 false
    metaWithUrl: false,

    // 自定义增加 http  header
    headers: {
      token: getToken()
    },

    // 跨域是否传递 cookie ，默认为 false
    withCredentials: true,

    // 超时时间，默认为 10 秒
    timeout: 6 * 1000, // 6 秒
    // 自定义上传
    async customUpload(_file: File, insertFn: InsertFnType) {
      console.log('_file: ', _file);
      // file 即选中的文件
      // 自己实现上传，并得到图片 url alt href
      // 最后插入图片
      insertFn('https://picsum.photos/300', '图片', 'https://picsum.photos/300/2');
    }
  };
};

// 自定义校验图片
function customCheckImageFn(src: string, _alt: string, _url: string): boolean | undefined | string {
  if (!src) {
    return;
  }
  if (src.indexOf('http') !== 0 && src.indexOf('https') !== 0) {
    return '图片网址必须以 http/https 开头';
  }
  return true;
}

export default function getImageConfig(): Partial<IEditorConfig> {
  return {
    MENU_CONF: {
      // 插入网络图片
      insertImage: {
        onInsertedImage(imageNode: ImageElement | null) {
          if (imageNode == null) return;

          const { src, alt, url, href } = imageNode;
          console.log('inserted image', src, alt, url, href);
        },
        checkImage: customCheckImageFn
      },
      // 编辑网络图片
      editImage: {
        onUpdatedImage(imageNode: ImageElement | null) {
          if (imageNode == null) return;

          const { src, alt, url } = imageNode;
          console.log('updated image', src, alt, url);
        },
        checkImage: customCheckImageFn
      },
      // 上传图片
      uploadImage: getDefaultConfig()
    }
  };
}
