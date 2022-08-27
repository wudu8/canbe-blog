import type { IToolbarConfig } from '@wangeditor/editor';

export default function getImageConfig(): Partial<IToolbarConfig> {
  return {
    // 排除菜单组，写菜单组 key 的值即可
    // 详见源码中：@wangeditor\packages\editor\src\init-default-config\config\toolbar.ts
    excludeKeys: ['group-video', 'insertVideo', 'uploadVideo', 'insertImage']
  };
}
