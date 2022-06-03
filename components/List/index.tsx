import { PropsWithChildren } from 'react';
import shouldForwardProp from '@styled-system/should-forward-prop'
import styled from '@emotion/styled';
import {
  typography,
  layout,
  space,
  size,
  TypographyProps,
  LayoutProps,
  SpaceProps,
  SizeProps,
} from 'styled-system';

type ListStyleType =
  'disc'
  | 'armenian'
  | 'circle'
  | 'cjk-ideographic'
  | 'decimal'
  | 'decimal-leading-zero'
  | 'georgian'
  | 'hebrew'
  | 'hiragana'
  | 'hiragana-iroha'
  | 'katakana'
  | 'katakana-iroha'
  | 'lower-alpha'
  | 'lower-greek'
  | 'lower-latin'
  | 'lower-roman'
  | 'none'
  | 'square'
  | 'upper-alpha'
  | 'upper-greek'
  | 'upper-latin'
  | 'upper-roman'
  | 'initial'
  | 'inherit';

type ListStylePosition = 'outside' | 'inside'


interface ListProps extends LayoutProps, SizeProps, SpaceProps {
  ordered?: boolean;
  listStyleType?: ListStyleType;
  listStylePosition?: ListStylePosition;
}

const UnorderedList = styled('ul', { shouldForwardProp })<ListProps>`
  list-style-type: ${({ listStyleType }) => listStyleType};
  list-style-position: ${({ listStylePosition }) => listStylePosition};
  ${size};
  ${space};
  ${layout};
`;

UnorderedList.displayName = 'UnorderedList';
UnorderedList.defaultProps = {
  listStyleType: 'disc',
  listStylePosition: 'outside',
};

const OrderedList = styled('ol', { shouldForwardProp })<ListProps>`
  list-style-type: ${({ listStyleType }) => listStyleType};
  list-style-position: ${({ listStylePosition }) => listStylePosition};
  ${size};
  ${space};
  ${layout};
`;

OrderedList.displayName = 'OrderedList';
OrderedList.defaultProps = {
  listStyleType: 'decimal',
  listStylePosition: 'outside',
};


function List(props: PropsWithChildren<ListProps>) {
  const { ordered, ...rest } = props;
  return ordered
    ? <OrderedList {...rest} />
    : <UnorderedList {...rest} />
}


interface ListItemProps extends LayoutProps, SizeProps, TypographyProps, SpaceProps {

}

export const ListItem = styled('li', { shouldForwardProp })<ListItemProps>`
  ${size};
  ${space};
  ${layout};
  ${typography};

  & p {
    margin-top: 0;
    margin-bottom: 0;
  }
`;

export default List;
