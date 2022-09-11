import type { Ref } from 'vue';

/**
 * portalLayout provide key
 */
export const portalLayoutToken = Symbol('portal-layout');
export const creatorLayoutToken = Symbol('creator-layout');

export interface PortalLayoutProvide {
  scrollEl: Ref<HTMLElement | undefined>;
}

export interface CreatorLayoutProvide {
  scrollEl: Ref<HTMLElement | undefined>;
}
