/**
 * 暗黑模式/亮白模式切换
 */
import { computed } from 'vue';
import { useDark, useToggle } from '@vueuse/core';
import { useAppStore } from '@/store';

export function useTheme() {
  const appStore = useAppStore();

  const isDark = useDark({
    selector: 'body',
    attribute: 'arco-theme',
    valueDark: 'dark',
    valueLight: 'light',
    storageKey: 'arco-theme',
    onChanged(dark: boolean) {
      // overridden default behavior
      appStore.toggleTheme(dark);
    }
  });
  const toggleTheme = useToggle(isDark);

  const theme = computed(() => appStore.theme);

  const handleToggleTheme = () => {
    toggleTheme();
  };

  return {
    isDark: isDark,
    theme,
    handleToggleTheme
  };
}
