import React from 'react';
import shouldForwardProp from '@styled-system/should-forward-prop';
import styled from '@emotion/styled';
import {
  borderRadius,
  borderWidth,
  borderStyle,
  borderColor,
  color,
  layout,
  BorderProps,
  LayoutProps,
  BackgroundColorProps,
} from 'styled-system';

export interface ToggleChoice {
  label: string;
  value: any;
}

interface ToggleProps {
  choices: [ToggleChoice, ToggleChoice];
  selection: any;
  size: number;
  onToggle: (newValue: any) => any;
}

export const Toggle = (props: ToggleProps) => {
  const { choices, selection, size, onToggle } = props;
  const values = choices.map((c) => c.value);
  const idx = values.indexOf(selection);
  if (idx === -1) {
    console.warn('[Toggle] initialSelection is not included in choices', { choices, selection });
    return null;
  }

  const handleClick = () => {
    const newIdx = idx === 1 ? 0 : 1;
    const newValue = choices[newIdx];
    onToggle(newValue.value);
  };

  return (
    <Channel
      onClick={handleClick}
      width={`calc(${size * 2}rem + 4px)`}
      height={`calc(${size}rem + 4px)`}
      borderRadius={`${size}rem`}
    >
      <Nub width={`${size}rem`} height={`${size}rem`} active={idx === 1} />
    </Channel>
  );
};

Toggle.displayName = 'Toggle';
Toggle.defaultProps = {
  size: 2,
};

export default Toggle;


interface NubProps {
  width?: string | number;
  height?: string | number;
  backgroundColor?: string;
  active: boolean;
}

const Nub = styled('div', { shouldForwardProp })<NubProps>`
  display: inline-block;
  transition: all 300ms ease-in-out;
  border-radius: 50%;
  margin: 1px;
  ${color};
  ${layout};
  transform: ${({ active }) => active ? 'translateX(100%)' : 'none'}
`;

Nub.defaultProps = {
  width: '2rem',
  height: '2rem',
  backgroundColor: 'primary',
};


interface ChannelProps extends BorderProps, BackgroundColorProps, LayoutProps {
  
}

const Channel = styled('div', { shouldForwardProp })<ChannelProps>`
  ${borderWidth};
  ${borderStyle};
  ${borderColor};
  ${borderRadius};
  ${layout};
  ${color};
`;

Channel.defaultProps = {
  width: '4rem',
  height: '2rem',
  borderColor: 'primary',
  borderWidth: '1px',
  borderStyle: 'solid',
  backgroundColor: 'background',
};
