import { useState, useLayoutEffect } from 'react';
import { useRecoilValue } from 'recoil';
import themeStore from './theme';

interface WindowSize {
  height?: number;
  width?: number;
}

export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window?.innerWidth,
    height: window?.innerHeight,
  });

  useLayoutEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}


export function useMediaBreakpointMatches() {
  const breakpoints = useRecoilValue(themeStore.selectors.breakpoints);
  const [matchingBreakpoints, setMatchingBreakpoints] = useState<(string | number)[]>([]);

  useLayoutEffect(() => {
    function updateMatches() {
      const updatedMatches = breakpoints
        .map((b) => `(max-width: ${typeof b == 'number' ? `${b}px` : b})`)
        .filter((q) => window.matchMedia(q).matches);
      setMatchingBreakpoints(updatedMatches);
    }

    updateMatches();
    window.addEventListener('resize', updateMatches);

    return () => window.removeEventListener('resize', updateMatches);
  }, [breakpoints]);

  return matchingBreakpoints;
}


export function useIsMobile() {
  const breakpoints = useRecoilValue(themeStore.selectors.breakpoints);
  const matchingBreakpoints = useMediaBreakpointMatches();
  return matchingBreakpoints.length === breakpoints.length;
}
