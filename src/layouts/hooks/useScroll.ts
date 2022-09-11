import type { Ref } from 'vue';

import { inject, watch, onMounted, ref } from 'vue';
import { useScroll } from '@vueuse/core';

/**
 * 根据layout的token监听滚动事件，用以使用layout布局的滚动监听
 * @param layoutToken provide token
 * @returns
 */
export function useLayoutScroll<
  T extends { scrollEl: Ref<HTMLElement | { $el: HTMLElement } | undefined> }
>(layoutToken: symbol) {
  const layoutInject = inject<T>(layoutToken);
  if (!layoutInject) {
    return {
      x: ref(0),
      toTop: ref(0),
      toBottom: ref(0),
      isScrolling: ref(false),
      scrollEl: ref<T>()
    };
  }
  const { scrollEl } = layoutInject;
  const { x, y, isScrolling } = useScroll(scrollEl as Ref<HTMLElement | undefined>);
  const toBottom = ref<number>(0);
  onMounted(() => {
    watch(
      y,
      value => {
        let el = (scrollEl.value as { $el: HTMLElement })?.$el;
        if (!el && scrollEl.value) {
          el = scrollEl.value as HTMLElement;
        }
        if (el) {
          const curDomBottom = el.scrollHeight - value - el.offsetHeight;
          toBottom.value = curDomBottom < 0 ? 0 : curDomBottom;
        }
      },
      { immediate: true }
    );
  });

  return {
    x,
    toTop: y,
    toBottom,
    isScrolling,
    scrollEl
  };
}
