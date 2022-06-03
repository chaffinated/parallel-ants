import React from 'react';
import { css, keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import range from 'lodash-es/range';
import get from 'lodash-es/get';

interface Theme {
  [key: string]: any;
}

const animationDuration = 3400;
const animationEasing = 'ease-in-out';
const unitReg = /^(\d+(?:\.\d+)?)(rem|em|px|pt|in|ex|ch|cm|vh|vw|%)/;

const rotateKeyframes = keyframes`
  0% { transform: rotate3d(1, -1, 0, 0deg); }
  30% { transform: rotate3d(1, -1, 0, -200deg); }
  70% { transform: rotate3d(1, -1, 0, 4deg); }
  100% { transform: rotate3d(1, -1, 0, 0deg); }
`;

const makeRotateAnimation = (delay: number) => css`
  animation: ${animationDuration}ms ${animationEasing} ${delay}ms
    ${rotateKeyframes} infinite forwards;
`;

const makeGlareKeyframes = (reversed = false) => keyframes`
  0% { opacity: 0; }
  30% { opacity: ${reversed ? 0.1 : 0.8}; }
  70% { opacity: ${reversed ? 0.8 : 0.1}; }
  100% { opacity: 0; }
`;

const spinnerStyle = (reverse = false) => `
  position: absolute;
  min-height: 100%;
  height: 100%;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transform: translateZ(${reverse ? -1 : 0}px);
  backface-visibility: hidden;
`;

const makeSpinnerStyle = (color1: string, color2: string, reverse = false) => {
  return `
    ${spinnerStyle(reverse)};
    background: linear-gradient(
      to left,
      ${color1},
      ${color2}
    );
    transform: ${
      reverse ? 'rotate3d(1, -1, 0, 180deg) translateZ(-1px)' : 'none'
    };
  `;
}

const SpinnerContainer = styled.div`
  padding: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  max-width: ${(theme: Theme) => `calc(${theme.width} + 1.6rem)`};
  transform: translateZ(10px);
`;

const Panels = styled.div`
  position: relative;
  perspective: 300px;
  transform-style: preserve-3d;
  display: flex;
  flex-wrap: wrap;
`;

interface PanelProps {
  delay?: number;
  size?: number | string;
}

const mainStyle = (size: number | string) => `
  width: ${size};
  height: ${size};
  transform-style: preserve-3d;
`;

const PanelGroup = styled.div<PanelProps>`
  ${({ size }) => mainStyle(size || '2.8rem')}
  ${({ delay }) => makeRotateAnimation(delay || 0)}
`;

const Panel = ({ delay = 0, size = '2.8rem' }: PanelProps) => (
  <PanelGroup delay={delay} size={size}>
    <PanelBack />
    <PanelFront />
    <PanelGlareFront delay={delay} />
    <PanelGlareBack delay={delay} />
  </PanelGroup>
);

const PanelBack = styled.div<PanelProps>`
  ${({ theme }) =>
    makeSpinnerStyle(
      get(theme, 'colors.white'),
      get(theme, 'colors.whites.2'),
      true
    )}
`;

const PanelFront = styled.div<PanelProps>`
  ${({ theme }) => makeSpinnerStyle(get(theme, 'colors.primary'), get(theme, 'colors.primary'), false)}
`;

const PanelGlareBack = styled.div<PanelProps>`
  ${({ theme }) => makeSpinnerStyle('rgba(220, 220, 220, 0.5)', 'rgba(255, 255, 255, 0.9)', false)};
  opacity: 0;
  ${({ delay }) => css`
    animation: ${animationDuration}ms ${animationEasing} ${makeGlareKeyframes()} ${delay}ms infinite forwards;
  `}
`;

const PanelGlareFront = styled.div<PanelProps>`
  ${makeSpinnerStyle('rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0.8)', false)};
  opacity: 0;
  animation: ${animationDuration}ms ${animationEasing} ${makeGlareKeyframes()}  infinite forwards;
`;

interface SpinnerProps {
  size?: number | string;
  rows?: number;
  columns?: number;
}

export const Spinner = ({
  size = '2.4rem',
  rows = 6,
  columns = 6,
}: SpinnerProps) => {
  const numPanels = rows * columns;
  const delay = animationDuration / Math.max(numPanels, 36);
  const units = size.toString().match(unitReg);
  let maxWidth = '100%';

  if (units) {
    const [_, value, unit] = units;
    maxWidth = `${parseFloat(value) * columns}${unit}`;
  }

  return (
    <SpinnerContainer width={maxWidth}>
      <Panels>
        {range(0, numPanels).map((i) => {
          return (
            <Panel
              size={size}
              key={i}
              delay={(i % columns) * delay + Math.floor(i / columns) * delay}
            />
          );
        })}
      </Panels>
    </SpinnerContainer>
  );
};

// export default withTheme(Spinner);
export default Spinner;
