import { ComponentType } from 'react';
import {
  LayoutProps,
  SpaceProps,
  SizeProps,
  compose,
  variant,
  layout,
  system,
  space,
  size,
} from 'styled-system';
import { createShouldForwardProp } from '@styled-system/should-forward-prop';
import without from 'lodash-es/without';
import styled from '@emotion/styled';

export interface IconProps {
  className?: string;
}

/* === IMAGE === */
export const iconStyle = system({
  fill: {
    property: 'fill',
    scale: 'colors',
  },
  stroke: {
    property: 'stroke',
    scale: 'colors',
  },
  transform: {
    property: 'transform',
  },
});

export interface StyledIconProps extends SizeProps, SpaceProps, LayoutProps {
  fill?: string;
  stroke?: string;
  variant?: string | string[];
  transform?: string | string[];
}

const allStyleFns = compose(
  layout,
  space,
  size,
  iconStyle,
);

const allPropNames = without(allStyleFns.propNames || [], 'height', 'width');

export const shouldForwardProp = createShouldForwardProp(allPropNames);

const createStyledSVG = (svg: ComponentType<StyledIconProps>): ComponentType<StyledIconProps> => styled(svg, { shouldForwardProp })`
  ${iconStyle};
  ${variant({
    scale: 'icon',
    variants: {
      white: {},
      black: {},
      primary: {},
      secondary: {},
      tertiary: {},
      quaternary: {},
    },
  })};
  ${layout};
  ${space};
  ${size};
`;

createStyledSVG.defaultProps = {
  variant: 'primary',
};

export default createStyledSVG;
