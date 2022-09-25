/**
 * 暗黑模式/亮白模式切换
 */
import { useAppStore } from '@/store';

export function useTheme() {
  const appStore = useAppStore();

  const isDark = useDark({
    selector: 'body',
    attribute: `${import.meta.env.VITE_APP_PREFIX}-theme`,
    valueDark: 'dark',
    valueLight: 'light',
    storageKey: `${import.meta.env.VITE_APP_PREFIX}-theme`,
    onChanged(dark: boolean) {
      // overridden default behavior
      appStore.toggleTheme(dark);
    }
  });
  const toggleTheme = useToggle(isDark);

  const theme = computed(() => appStore.settings.theme);

  const handleToggleTheme = () => {
    toggleTheme();
  };

  return {
    isDark: isDark,
    theme,
    handleToggleTheme
  };
}
