import { createShouldForwardProp } from '@styled-system/should-forward-prop';
import styled from '@emotion/styled';
import {
  compose,
  background,
  boxShadow,
  position,
  flexbox,
  variant,
  layout,
  border,
  space,
  color,
  grid,
  system,
  GridProps,
  ColorProps,
  SpaceProps,
  BorderProps,
  LayoutProps,
  FlexboxProps,
  PositionProps,
  BoxShadowProps,
  BackgroundProps,
  BackgroundColorProps,
} from 'styled-system';

type PointerEvents = 'inherit' | 'initial' | 'revert' | 'unset' | 'auto' | 'none';

export interface BoxProps extends
  LayoutProps,
  ColorProps,
  BackgroundColorProps,
  BackgroundProps,
  BorderProps,
  FlexboxProps,
  GridProps,
  SpaceProps,
  BoxShadowProps,
  PositionProps
{
  color?: string;
  variant?: string;
  transition?: string;
  pointerEvents?: PointerEvents;
  outline?: string;
}

const transition = system({
  transition: true,
});

const outline = system({
  outline: true,
});

const pointerEvents = system({ pointerEvents: true });

const allHelpers = compose(
  layout,
  color,
  background,
  border,
  flexbox,
  grid,
  space,
  boxShadow,
  position,
  transition,
  outline,
  pointerEvents
);

const allProps = allHelpers.propNames || [];
const shouldForwardProp = createShouldForwardProp(allProps);

const Box = styled('div', { shouldForwardProp })<BoxProps>`
  ${variant({
    scale: 'box',
    variants: {
      default: {},
      card: {},
    },
  })};
  ${allHelpers};
`;

Box.displayName = 'Box';
Box.defaultProps = {
  variant: 'default',
};

export default Box;
