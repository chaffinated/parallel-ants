import React, { Suspense, PropsWithChildren } from 'react';
import Container from 'components/Container';
import Spinner from 'components/Spinner';
import Flex from 'components/Flex';
import Box from 'components/Box';

export const Loading = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Suspense fallback={<Spinner rows={2} columns={2} size='1rem' />}>
      { children }
    </Suspense>
  );
};

export const SpinnerFullScreen = () => (
  <Container
    minHeight='100vh'
    height='100vh'
    maxWidth='100%'
    width='100%'
    padding='0'
    margin='0'
  >
    <Flex alignItems='center' justifyContent='center' height='100%' width='100%'>
      <Spinner />
    </Flex>
  </Container>
);


interface SpinnerOverlayProps {
  isLoading?: boolean;
}

export const LoadingOverlay = ({ children, isLoading }: PropsWithChildren<SpinnerOverlayProps>) => {
  return (
    <Container position='relative' padding={0} margin={0}>
      { children }
      <Box
        position='absolute'
        display='flex'
        top={0}
        bottom={0}
        width='100%'
        backgroundColor={isLoading ? 'rgba(255,255,255,0.7)' : 'transparent'}
        justifyContent='center'
        alignItems='center'
        transition='all 320ms ease-in-out'
        pointerEvents={isLoading ? 'initial' : 'none'}
      >
        { isLoading ? <Spinner size='0.5rem' /> : null }
      </Box>
    </Container>
  )
};

export const LoadingFullScreen = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Suspense fallback={<SpinnerFullScreen />}>
      { children }
    </Suspense>
  );
};

export default Loading;
