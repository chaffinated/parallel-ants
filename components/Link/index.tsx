import { PropsWithChildren, EventHandler, MouseEvent } from 'react';
import {
  color,
  typography,
  space,
  lineHeight,
  TypographyProps,
  ColorProps,
  SpaceProps,
  variant,
  compose,
  system,
} from 'styled-system';
import styled from '@emotion/styled';
import Link, { LinkProps } from 'next/link';


interface StyledLinkProps extends LinkProps, TypographyProps, SpaceProps {
  href: string;
  target?: string;
  className?: string;
  textColor?: string | string[];
  textDecoration?: string;
  onClick?: EventHandler<MouseEvent>;
  onMouseOver?: EventHandler<MouseEvent>;
  onMouseOut?: EventHandler<MouseEvent>;
  variant?: string;
}

const keepProps = [
  'className',
  'textDecoration',
  'letterSpacing',
  'color',
  'textColor',
  'backgroundColor',
  'bg',
  'fontFamily',
  'fontWeight',
  'lineHeight',
  'fontSize',
  'variant',
  'onMouseOver',
  'onMouseOut',
  'margin',
  'mt',
  'marginTop',
  'mb',
  'marginBottom',
  'ml',
  'marginLeft',
  'mr',
  'marginRight',
  'mx',
  'marginx',
  'my',
  'marginY',
  'textAlign',
];

const shouldForwardProp = (prop: string) => !keepProps.includes(prop);
const textDecoration = (theme: { [key: string]: any }) => theme.textDecoration || 'none';
const textColor = compose(color, system({ textColor: { property: 'color' }}));

const StyledLink = styled('a', { shouldForwardProp })<StyledLinkProps>`
  ${variant({
    scale: 'text',
    variants: {
      link: {},
      navLink: {},
      footerLink: {},
    },
  })};
  text-decoration: ${textDecoration};
  ${color};
  ${textColor};
  ${space};
  ${typography};
  ${lineHeight};
`;

StyledLink.defaultProps = {
  href: '/',
  variant: 'link',
};

StyledLink.displayName = 'Link';

const LinkWithStyles = (props: PropsWithChildren<StyledLinkProps>) => {
  const { children, ...rest } = props;
  return (
    <Link {...rest} passHref>
      <StyledLink { ...rest }>
        { children }
      </StyledLink>
    </Link>
  );
};

export default LinkWithStyles;


interface FakeLinkProps extends Omit<StyledLinkProps, 'href'> {
  
}

export const FakeLink = styled('span', { shouldForwardProp })<FakeLinkProps>`
  cursor: pointer;
  text-decoration: ${textDecoration};
  ${color};
  ${textColor};
  ${space};
  ${typography};
  ${lineHeight};
`;
