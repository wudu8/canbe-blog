/**
 * 转换vue-props的const变量为interface类型
 */
import type { Prop } from 'vue';

type IfAny<T, Y, N> = 0 extends 1 & T ? Y : N;

type PublicRequiredKeys<T> = {
  [K in keyof T]: T[K] extends { required: true } ? K : never;
}[keyof T];

type PublicOptionalKeys<T> = Exclude<keyof T, PublicRequiredKeys<T>>;

type InnerRequiredKeys<T> = {
  [K in keyof T]: T[K] extends { required: true } | { default: SafeAny }
    ? T[K] extends { default: undefined }
      ? never
      : K
    : never;
}[keyof T];

type InnerOptionalKeys<T> = Exclude<keyof T, InnerRequiredKeys<T>>;

type InferPropType<T> = [T] extends [null]
  ? SafeAny
  : [T] extends [{ type: null | true }]
  ? SafeAny
  : [T] extends [ObjectConstructor | { type: ObjectConstructor }]
  ? Record<string, SafeAny>
  : [T] extends [BooleanConstructor | { type: BooleanConstructor }]
  ? boolean
  : [T] extends [DateConstructor | { type: DateConstructor }]
  ? Date
  : [T] extends [(infer U)[] | { type: (infer U)[] }]
  ? U extends DateConstructor
    ? Date | InferPropType<U>
    : InferPropType<U>
  : [T] extends [Prop<infer V, infer D>]
  ? unknown extends V
    ? IfAny<V, V, D>
    : V
  : T;
// 给业务代码使用的props类型转换器
export type ExtractPublicPropTypes<O> = {
  -readonly [K in keyof Pick<O, PublicRequiredKeys<O>>]: InferPropType<O[K]>;
} & {
  -readonly [K in keyof Pick<O, PublicOptionalKeys<O>>]?: InferPropType<O[K]>;
};
// 给组件代码使用的props类型转换器
export type ExtractInnerPropTypes<O> = {
  [K in keyof Pick<O, InnerRequiredKeys<O>>]: InferPropType<O[K]>;
} & {
  [K in keyof Pick<O, InnerOptionalKeys<O>>]?: InferPropType<O[K]>;
};
