import type { DepOptimizationOptions } from 'vite';

export function createViteOptimizeDeps(_env: ImportMetaEnv): {
  optimizeDeps: DepOptimizationOptions;
} {
  return {
    optimizeDeps: {}
  };
}
