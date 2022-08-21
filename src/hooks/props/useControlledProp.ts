import type { ComputedRef } from 'vue';
import { computed, shallowRef, toRaw, watch, useAttrs } from 'vue';
import { isFunction } from 'lodash-es';

import { callEmit } from '@/hooks/utils/callEmit';

export function useControlledProp<T, K extends keyof T>(
  props: T,
  key: K
): [ComputedRef<T[K]>, (value: T[K]) => void];
export function useControlledProp<T, K extends keyof T>(
  props: T,
  key: K,
  defaultOrFactory: T[K] | (() => T[K])
): [ComputedRef<Exclude<T[K], undefined>>, (value: Exclude<T[K], undefined>) => void];

export function useControlledProp<T, K extends keyof T>(
  props: T,
  key: K,
  defaultOrFactory?: T[K] | (() => T[K])
): [ComputedRef<T[K]>, (value: T[K]) => void] {
  const defaultValue =
    props[key] ?? (isFunction(defaultOrFactory) ? defaultOrFactory() : defaultOrFactory);
  const tempProp = shallowRef(defaultValue);

  watch(
    () => props[key],
    value => (tempProp.value = value)
  );

  const state = computed(() => props[key] ?? tempProp.value!);

  const setState = (value: T[K]) => {
    if (value !== toRaw(state.value)) {
      tempProp.value = value;
      callEmit((props as SafeAny)[`onUpdate:${key as string}`], value);
    }
  };

  return [state, setState];
}

export function useControlledPropByEmit<T, K extends keyof T>(
  props: T,
  key: K
): [ComputedRef<T[K]>, (value: T[K]) => void];
export function useControlledPropByEmit<T, K extends keyof T>(
  props: T,
  key: K,
  defaultOrFactory: T[K] | (() => T[K])
): [ComputedRef<Exclude<T[K], undefined>>, (value: Exclude<T[K], undefined>) => void];
export function useControlledPropByEmit<T, K extends keyof T>(
  props: T,
  key: K,
  defaultOrFactory?: T[K] | (() => T[K])
): [ComputedRef<T[K]>, (value: T[K]) => void] {
  const defaultValue =
    props[key] ?? (isFunction(defaultOrFactory) ? defaultOrFactory() : defaultOrFactory);
  const tempProp = shallowRef(defaultValue);

  watch(
    () => props[key],
    value => (tempProp.value = value)
  );

  const state = computed(() => props[key] ?? tempProp.value!);

  const emits = useAttrs();

  const setState = (value: T[K]) => {
    if (value !== toRaw(state.value)) {
      tempProp.value = value;
      (emits[`onUpdate:${key as string}`] as Fn)?.(value);
    }
  };

  return [state, setState];
}
