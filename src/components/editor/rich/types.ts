import type { SlateElement } from '@wangeditor/editor';

export enum ModeEnum {
  default = 'default',
  simple = 'simple'
}

export type ModeType = 'default' | 'simple';

export type InsertFnType = (url: string, alt: string, href: string) => void;

export type ImageElement = SlateElement & {
  src: string;
  alt: string;
  url: string;
  href: string;
};

export type InnerImageElement = ImageElement & {
  id: string;
};
