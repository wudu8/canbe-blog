import type { IEditorConfig } from '@wangeditor/editor';

// 自定义校验链接
function customCheckLinkFn(text: string, url: string): string | boolean | undefined {
  if (!url) {
    return;
  }
  if (url.indexOf('http') !== 0 && url.indexOf('https') !== 0) {
    return '链接必须以 http/https 开头';
  }

  return true;
}

export default function getLinkConfig(): Partial<IEditorConfig> {
  return {
    MENU_CONF: {
      // 插入链接
      insertLink: {
        checkLink: customCheckLinkFn
      },
      // 更新链接
      editLink: {
        checkLink: customCheckLinkFn
      }
    }
  };
}
