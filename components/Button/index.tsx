import React, { PropsWithChildren, forwardRef, ForwardedRef, LegacyRef } from 'react';
import shouldForwardProp from '@styled-system/should-forward-prop';
import styled from '@emotion/styled';
import {
  buttonStyle,
  textStyle,
  space,
  color,
  layout,
  borderRadius,
  borderColor,
  borderStyle,
  typography,
  variant,
  SpaceProps,
  ColorProps,
  BorderProps,
  LayoutProps,
  TypographyProps,
  system,
} from 'styled-system';
import Spinner from 'components/Spinner';
import Link from 'components/Link';
import Flex from 'components/Flex';
import Box from 'components/Box';


export interface ButtonProps extends LayoutProps, SpaceProps, ColorProps, BorderProps, TypographyProps {
  color?: string;
  variant?: string;
  textTransform?: string;
  transition?: string;
  pointerEvents?: string;
  '&:hover'?: ButtonProps;
}

const customTextStyles = system({
  textTransform: {
    property: 'textTransform',
    scale: 'textStyles',
  },
  transition: {
    property: 'transition',
    scale: 'transitions',
  },
});

const pointerEvents = system({
  pointerEvents: true,
});

export const Button = styled('button', { shouldForwardProp })<ButtonProps>`
  display: inline-block;
  text-decoration: none;
  text-align: center;
  appearance: none;
  cursor: pointer;
  ${variant({
    scale: 'button',
    variants: {
      // link: {},
      // linkInverted: {},
      primary: {},
      secondary: {},
      tertiary: {},
      quaternary: {},
      outline: {},
      primaryInverted: {},
      secondaryInverted: {},
      tertiaryInverted: {},
      quaternaryInverted: {},
      outlineInverted: {},
      clear: {},
    },
  })};
  ${customTextStyles};
  ${layout};
  ${space};
  ${color};
  ${borderRadius};
  ${borderColor};
  ${borderStyle};
  ${buttonStyle};
  ${textStyle};
  ${typography};
  ${pointerEvents};

  p, a, span {
    text-transform: inherit;
    color: inherit;
    margin: 0;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

Button.defaultProps = {
  variant: 'primary',
};


/* === Fancy Button with Loading === */
interface ButtonLoadingProps extends ButtonProps, React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  disabled?: boolean;
  loading?: boolean;
}

function ButtonLoading(props: PropsWithChildren<ButtonLoadingProps>, ref: ForwardedRef<Element>) {
  const { loading, children, ...rest } = props;
  return (
    <Button tabIndex={1} display='inline-block' {...rest} ref={ref as LegacyRef<HTMLButtonElement>}>
      <Box position='relative' pointerEvents='none'>
        <Box
          opacity={loading ? 0.2 : 1}
          transition='all 400ms linear'
        >
          { children }
        </Box>

        {
          loading
            ? <Box
                position='absolute'
                width='100%'
                height='100%'
                top={0}
                bottom={0}
                opacity={loading ? 1 : 0}
                transition='all 400ms linear'
              >
                <Flex justifyContent='center' alignItems='center' height='100%'>
                  <Spinner
                    size={'1rem'}
                    rows={2}
                    columns={2}
                  />
                </Flex>
              </Box>
            : null
        }
      </Box>
    </Button>
  );
}

export default forwardRef(ButtonLoading);


/* === Button Link === */
export const ButtonLink = Button.withComponent(Link);

ButtonLink.defaultProps = {
  variant: 'primary',
};


/* === External Button Link === */
export const ButtonLinkExternal = Button.withComponent('a');

ButtonLinkExternal.defaultProps = {
  variant: 'primary',
};
