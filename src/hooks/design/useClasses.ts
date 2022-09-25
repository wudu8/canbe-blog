/**
 * 拼接APP class前缀
 */

import type { MaybeRef } from '@vueuse/shared';
import type { ComputedRef, Ref } from 'vue';

const appPrefix = import.meta.env.VITE_APP_PREFIX;

export function useClasses(classes: Ref<string>): ComputedRef<string>;
export function useClasses(classes: string): string;
export function useClasses(): string;

export function useClasses(classes?: MaybeRef<string>): MaybeRef<string> {
  if (!classes) {
    return appPrefix;
  }

  if (isRef(classes)) {
    return computed(() => {
      const unrefClasses = unref(classes);
      return formartClasses(unrefClasses);
    });
  } else {
    return formartClasses(classes);
  }
}

function formartClasses(unrefClasses: string): string {
  return `${appPrefix}-${unrefClasses}`;
}
