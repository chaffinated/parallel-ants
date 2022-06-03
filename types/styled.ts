import { ResponsiveValue } from 'styled-system';

export type FlexValue = ResponsiveValue<'row' | 'row-reverse' | 'column' | 'column-reverse'>;
export type JustifyContentValue = ResponsiveValue<'stretch' | 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around'>;
export type AlignItemsValue = ResponsiveValue<'stretch' | 'center' | 'flex-start' | 'flex-end'>;
export type SpacingValue = ResponsiveValue<(string | number)[] | string | number>;
export type LayoutValue = "fill" | "fixed" | "intrinsic" | "responsive";
export type DisplayDimension = ResponsiveValue<(string | number)[] | string | number>;
