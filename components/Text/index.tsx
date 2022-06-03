import React, { forwardRef, Ref, PropsWithChildren, ReactElement, ComponentType } from 'react';
import shouldForwardProp from '@styled-system/should-forward-prop';
import styled, { StyledComponent } from '@emotion/styled';
import {
  typography,
  textStyle,
  shadow,
  layout,
  color,
  space,
  TypographyProps,
  TextStyleProps,
  ShadowProps,
  ColorProps,
  SpaceProps,
  variant,
  system,
} from 'styled-system';

/**************************
**** Text & Variants
**************************/
export const Tags = {
  p: 'p',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  span: 'span',
  label: 'label',
  input: 'input',
  caption: 'caption',
};

type TagNames = keyof typeof Tags;
type TextTransform = 'none' | 'capitalize' | 'uppercase' | 'lowercase' | 'full-width' | 'full-size-kan';

const whiteSpace = system({ whiteSpace: true });

export interface TextComponentProps extends TypographyProps, TextStyleProps, ShadowProps, ColorProps, SpaceProps {
  variant: TagNames;
  textTransform?: TextTransform;
  textDecoration?: string;
  className?: string;
  whiteSpace?: string;
}

type VariantMap = {
  [key in TagNames]: StyledComponent<TextComponentProps, any, any>;
}

const tags = Object.keys(Tags)
  .reduce((memo: Partial<VariantMap>, tagKey) => {
    const tag = Tags[tagKey as TagNames];
    const comp = styled(tag as TagNames, { shouldForwardProp })`
      ${variant({
        scale: 'text',
        variants: Object.fromEntries(Object.keys(Tags).map(tag => [tag, {}])),
      })};
      text-transform: ${({ textTransform }) => textTransform || 'none'};
      text-decoration: ${({ textDecoration }) => textDecoration || 'initial'};
      ${typography};
      ${textStyle};
      ${shadow};
      ${color};
      ${space};
      ${whiteSpace};
    `;
    
    comp.displayName = `${tag.slice(0,1).toUpperCase()}${tag.slice(1)}`;
    comp.defaultProps = {
      variant: tag,
    };
    return { ...memo, [tag.toString()]: comp };
  }, {});




interface ITextProps extends TextComponentProps {
  bold?: boolean;
  strong?: boolean;
  emphasis?: boolean;
}

type TextProps = PropsWithChildren<ITextProps>;

export const Text = forwardRef((props: PropsWithChildren<TextProps>, ref?: Ref<any>) => {
  const { variant, bold, strong, emphasis, children, ...rest } = props;
  const C = tags[variant] || tags.p;
  let content: ReactElement = <>{ children }</>;

  if (strong) {
    content = <strong>{ content }</strong>;
  }
  if (bold) {
    content = <b>{ content }</b>;
  }
  if (emphasis) {
    content = <em>{ content }</em>;
  }

  if (C == null) {
    throw new Error(`[theme]: Invalid "tag" prop: ${variant}`);
  }
  
  return (
    <C {...rest} variant={variant} ref={ref}>
      { content }
    </C>
  );
});

export default Text;

Text.displayName = 'Text';

/**************************
**** Validation Messages
**************************/

interface ValidationContainerProps {
  width?: string | number;
  padding?: string | number;
  margin?: string | number;
}

const ValidationContainer = styled.div<ValidationContainerProps>`
  ${space};
  ${layout};
`;

ValidationContainer.defaultProps = {
  width: '100%',
  padding: 0,
  margin: 0,
}

interface ValidationMessagesProps extends ColorProps, SpaceProps, TypographyProps {
  maxMessages: number;
  messages: string[];
  hide: boolean;
}

export const ValidationMessages = (props: ValidationMessagesProps) => {
  const { messages, maxMessages, hide, ...rest } = props;

  if (hide) {
    return null;
  }

  const truncMessages = maxMessages > 0 ? messages.slice(0, maxMessages) : messages;
  return (
    <ValidationContainer>
      { truncMessages.map((m) => 
        <Text variant='p' color='alert' my={0} {...rest} key={m}>
          { m }
        </Text>
      ) }
    </ValidationContainer>
  )
};

ValidationMessages.defaultProps = {
  maxMessages: 0,
  hide: false,
};

