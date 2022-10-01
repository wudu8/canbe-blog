/**
 * 判断当前设备类型
 */
import { useAppStore } from '@/store';
import { addEventListen, removeEventListen } from '@/utils/event';

const WIDTH = 992; // https://arco.design/vue/component/grid#responsivevalue

function queryDevice() {
  const rect = document.body.getBoundingClientRect();
  return rect.width - 1 < WIDTH;
}

export enum DeviceType {
  mobile = 'mobile',
  desktop = 'desktop'
}

/**
 * @description: 响应式hook，识别当前屏幕大小，判定是移动端或电脑端
 * @param {boolean} immediate
 * @return {*}
 */
export function useResponsive(immediate?: boolean) {
  const appStore = useAppStore();
  function resizeHandler() {
    if (!document.hidden) {
      const isMobile = queryDevice();
      appStore.toggleDevice(isMobile ? DeviceType.mobile : DeviceType.desktop);
    }
  }
  const debounceFn = useDebounceFn(resizeHandler, 100);
  onMounted(() => {
    if (immediate) resizeHandler();
  });
  onBeforeMount(() => {
    addEventListen(window, 'resize', debounceFn);
  });
  onBeforeUnmount(() => {
    removeEventListen(window, 'resize', debounceFn);
  });
}
