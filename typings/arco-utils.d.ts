export {};

declare global {
  // Event TS
  type VKey = string | number | Record<string, any> | undefined
  type UISize = number | 'mini' | 'small' | 'medium' | 'large';
}
