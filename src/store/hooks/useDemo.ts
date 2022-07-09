import { defineStore } from 'pinia';

export const demoStore = defineStore({
  id: 'cart',
  state: () => ({
    currentCount: 0
  }),
  getters: {
    /**
     * @returns {Array<{ name: string; amount: number }>}
     */
    count: state => state.currentCount
  },
  actions: {
    inCrement() {
      this.currentCount++;
    }
  }
});

export default function useDemo() {
  return demoStore();
}
