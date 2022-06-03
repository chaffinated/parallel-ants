import { createShouldForwardProp } from '@styled-system/should-forward-prop'
import styled from '@emotion/styled';
import {
  system,
  layout,
  flexbox,
  position,
  size,
  ResponsiveValue,
  PositionProps,
  FlexboxProps,
  LayoutProps,
  Scale,
  compose,
} from 'styled-system';
import { SpacingValue } from 'types/styled';


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
  backfaceVisibility: {
    property: 'backfaceVisibility',
    defaultScale: ['hidden'],
  },
});


function transformParentMargin(value: ResponsiveValue<string | number | null>, scale?: Scale): ResponsiveValue<string | number | null> {
  if (value == null) return null;
  const val = Array.isArray(scale) ? scale[+value] : scale?.[value as string | number] || value;
  
  if (Array.isArray(val)) {
    return val.map((val) => transformParentMargin(val, scale)) as ResponsiveValue<string | number | null>;
  }
  return val == null ? null : `-${val}`;
}


const parentSpacing = system({
  spacing: {
    properties: ['marginLeft', 'marginRight', 'marginBottom', 'marginTop'],
    scale: 'space',
    transform: transformParentMargin,
  },
  spacingX: {
    properties: ['marginLeft', 'marginRight'],
    scale: 'space',
    transform: transformParentMargin,
  },
  // spacingY: {
  //   properties: ['marginTop', 'marginBottom'],
  //   scale: 'space',
  //   transform: transformParentMargin,
  // },
});

const spacing = system({
  spacing: {
    properties: ['marginLeft', 'marginRight', 'marginBottom', 'marginTop'],
    scale: 'space',
  },
  spacingX: {
    properties: ['marginLeft', 'marginRight'],
    scale: 'space',
  },
  spacingY: {
    properties: ['marginTop', 'marginBottom'],
    scale: 'space',
  },
});

const firstChildSpacing = system({
  spacingX: {
    properties: ['marginLeft'],
    scale: 'space',
    transform: (value, scale) => {
      const val = scale && scale[value] ? `-${scale[value]}` : value;
      return 0;
    },
  },
  spacingY: {
    properties: ['marginTop'],
    scale: 'space',
    transform: (value, scale) => {
      const val = scale && scale[value] ? `-${scale[value]}` : value;
      return 0;
    },
  },
});

const lastChildSpacing = system({
  spacingX: {
    properties: ['marginRight'],
    scale: 'space',
    transform: (value, scale) => {
      return 0;
    },
  },
  spacingY: {
    properties: ['marginBottom'],
    scale: 'space',
    transform: (value, scale) => {
      return 0;
    },
  },
});

const allProps = compose(
  size,
  position,
  flexbox,
  layout,
  transform,
  parentSpacing,
  spacing,
  firstChildSpacing,
  lastChildSpacing,
);

const shouldForwardProp = createShouldForwardProp(allProps.propNames!)


export interface FlexProps extends FlexboxProps, LayoutProps, PositionProps {
  transform?: string | string[];
  transformOrigin?: string;
  transformStyle?: string;
  transformBox?: string;
  backfaceVisibility?: string;
  transition?: string;
  spacing?: SpacingValue;
  spacingX?: SpacingValue;
  spacingY?: SpacingValue;
}


const Flex = styled('div', { shouldForwardProp })<FlexProps>`
  display: flex;
  ${size};
  ${position};
  ${flexbox};
  ${layout};
  ${transform};
  transition: ${({ transition }) => transition == null ? 'none' : transition};
  ${parentSpacing};

  & > * {
    ${spacing};
  }
  
  & > *:first-child {
    ${firstChildSpacing};
  }
  
  & > *:last-child {
    ${lastChildSpacing};
  }
`;

Flex.displayName = 'Flex';
Flex.defaultProps = {
  flex: '1 1 auto',
  // spacing: 0,
  // flexWrap: 'wrap',
  // justifyContent: 'center',
  alignItems: 'center',
  maxWidth: '100%',
};

export default Flex;
