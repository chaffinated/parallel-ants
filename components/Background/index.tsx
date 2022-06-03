import shouldForwardProp from '@styled-system/should-forward-prop'
import {
  background,
  position,
  layout,
  color,
  ColorProps,
  LayoutProps,
  PositionProps,
  BackgroundColorProps,
  BackgroundProps,
} from 'styled-system';
import styled from '@emotion/styled';


export interface StyledBackgroundProps extends ColorProps, PositionProps, BackgroundColorProps, LayoutProps, BackgroundProps {
  color?: string;
}

const Background = styled('div', { shouldForwardProp })<StyledBackgroundProps>`
  width: 100%;
  padding: 0;
  margin: 0;
  ${color};
  ${position};
  ${background};
  ${layout};
`;

Background.displayName = 'Background';
Background.defaultProps = {
  // bg: 'background',
};

export default Background;
