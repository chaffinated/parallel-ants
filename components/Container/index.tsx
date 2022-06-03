import shouldForwardProp from '@styled-system/should-forward-prop'
import {
  system,
  color,
  position,
  variant,
  layout,
  space,
  SpaceProps,
  LayoutProps,
  PositionProps,
} from 'styled-system';
import styled from '@emotion/styled';


export interface ContainerProps extends PositionProps, SpaceProps, LayoutProps {
  variant?: string;
  transform?: string | string[];
  transformOrigin?: string;
  transformStyle?: string;
  transformBox?: string;
  transition?: string;
  color?: string;
  pointerEvents?: string;
}

const transform = system({
  transform: {
    property: 'transform',
  },
  transformOrigin: {
    property: 'transformOrigin',
  },
  transformStyle: {
    property: 'transformStyle',
  },
  transformBox: {
    property: 'transformBox',
    defaultScale: ['fill-box'],
  },
});

const pointerEvents = system({ pointerEvents: true });

export const Container = styled('div', { shouldForwardProp })<ContainerProps>`
  ${variant({
    scale: 'container',
    variants: {
      default: {},
      main: {},
    },
  })};
  ${position};
  ${layout};
  ${space};
  ${transform};
  ${color};
  ${pointerEvents};
  transition: ${({ transition }) => transition == null ? 'none' : transition};
`;

Container.defaultProps = {
  variant: 'default',
};

Container.displayName = 'Container';

export default Container;
