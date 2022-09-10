<script lang="tsx">
import { defineComponent, ref, h, compile, computed } from 'vue';
import { useRoute, useRouter, RouteRecordRaw } from 'vue-router';
import type { RouteMeta } from 'vue-router';
import { useAppStore } from '@/store';
import { listenerRouteChange } from '@/utils/route-listener';
import { openWindow, regexUrl } from '@/utils/menuUtils';
import { useMenuTree } from '@/hooks';
import routes from '@/router/routes';
import { bMenuProps } from './types';

export default defineComponent({
  emit: ['collapse'],
  props: bMenuProps,
  setup(props) {
    const appStore = useAppStore();
    const router = useRouter();
    const route = useRoute();
    const appRoute = computed(() => {
      if (props.menus) {
        return props.menus;
      }
      if (appStore.settings.menuFromServer) {
        return appStore.appAsyncMenus;
      }
      return routes;
    });
    const { menuTree } = useMenuTree(appRoute);
    const collapsed = computed({
      get() {
        if (!appStore.isMobile && props.useCollapsed) return appStore.settings.menuCollapse;
        return false;
      },
      set(value: boolean) {
        appStore.updateSettings({ menuCollapse: value });
      }
    });

    const openKeys = ref<string[]>([]);
    const selectedKey = ref<string[]>([]);

    const goto = (item: RouteRecordRaw) => {
      // Open external link
      if (regexUrl.test(item.path)) {
        openWindow(item.path);
        selectedKey.value = [item.name as string];
        return;
      }
      // Eliminate external link side effects
      const { hideInMenu } = item.meta as RouteMeta;
      if (route.name === item.name && !hideInMenu) {
        selectedKey.value = [item.name as string];
        return;
      }
      // Trigger router change
      router.push({
        name: item.name as string
      });
    };
    const findMenuOpenKeys = (name: string) => {
      const result: string[] = [];
      let isFind = false;
      const backtrack = (item: RouteRecordRaw, keys: string[], target: string) => {
        if (item.name === target) {
          isFind = true;
          result.push(...keys, item.name as string);
          return;
        }
        if (item.children?.length) {
          item.children.forEach(el => {
            backtrack(el, [...keys], target);
          });
        }
      };
      menuTree.value.forEach((el: RouteRecordRaw) => {
        if (isFind) return; // Performance optimization
        backtrack(el, [el.name as string], name);
      });
      return result;
    };
    // 监听路由变更，刷新当前选中的菜单
    listenerRouteChange(newRoute => {
      const { hideInMenu } = newRoute.meta;
      if (!hideInMenu) {
        const menuOpenKeys = findMenuOpenKeys(newRoute.name as string);

        const keySet = new Set([...menuOpenKeys, ...openKeys.value]);
        // 设置展开的节点
        openKeys.value = [...keySet];

        selectedKey.value = [menuOpenKeys[menuOpenKeys.length - 1]];
      }
    }, true);
    const setCollapse = (val: boolean) => {
      if (!appStore.isMobile) appStore.updateSettings({ menuCollapse: val });
    };

    const renderSubMenu = () => {
      function travel(_route: RouteRecordRaw[], nodes = []) {
        if (_route) {
          _route.forEach(element => {
            // This is demo, modify nodes as needed
            const icon = element?.meta?.icon ? () => h(compile(`<${element?.meta?.icon}/>`)) : null;
            const node =
              element?.children && element?.children.length !== 0 ? (
                <a-sub-menu
                  key={element?.name}
                  v-slots={{
                    icon,
                    title: () => h(compile(element?.meta?.title || ''))
                  }}
                >
                  {travel(element?.children)}
                </a-sub-menu>
              ) : (
                <a-menu-item key={element?.name} v-slots={{ icon }} onClick={() => goto(element)}>
                  {element?.meta?.title || ''}
                </a-menu-item>
              );
            nodes.push(node as never);
          });
        }
        return nodes;
      }
      return travel(menuTree.value);
    };

    return () => (
      <a-menu
        v-model:collapsed={collapsed.value}
        v-model:open-keys={openKeys.value}
        show-collapse-button={!appStore.isMobile}
        auto-open={false}
        selected-keys={selectedKey.value}
        auto-open-selected={true}
        level-indent={34}
        style="height: 100%"
        onCollapse={setCollapse}
      >
        {renderSubMenu()}
      </a-menu>
    );
  }
});
</script>

<style lang="less" scoped>
:deep(.arco-menu-inner) {
  .arco-menu-inline-header {
    display: flex;
    align-items: center;
  }

  .arco-icon {
    &:not(.arco-icon-down) {
      font-size: 18px;
    }
  }
}
</style>
