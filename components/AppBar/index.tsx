import shouldForwardProp from '@styled-system/should-forward-prop'
import {
  position,
  variant,
  system,
  border,
  shadow,
  layout,
  space,
  color,
  BoxShadowProps,
  PositionProps,
  BorderProps,
  SpaceProps,
  ColorProps,
  LayoutProps,
} from 'styled-system';
import styled from '@emotion/styled';

interface AppBarProps extends LayoutProps, SpaceProps, BorderProps, BoxShadowProps, ColorProps, PositionProps {
  color?: string;
  variant?: string;
  transform?: string;
  transition?: string;
  pointerEvents?: string;
}

const transform = system({
  transform: true,
});

const transition = system({
  transition: true,
});

const pointerEvents = system({ pointerEvents: true });

const AppBar = styled('div', { shouldForwardProp })<AppBarProps>`
  ${variant({
    scale: 'nav',
    variants: {
      default: {},
      sticky: {},
      clear: {},
    },
  })};
  ${layout};
  ${position};
  ${transform};
  ${transition};
  ${space};
  ${color};
  ${border};
  ${shadow};
  ${pointerEvents};

  & * {
    ${transition};
    ${color};
    background-color: transparent;
  }
  
  & svg * {
    ${transition};
    fill: inherit;
    stroke: inherit;
    background-color: transparent;
  }
`;

AppBar.displayName = 'AppBar';
AppBar.defaultProps = {
  variant: 'default',
  width: '100%',
};

export default AppBar;
