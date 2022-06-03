import React, { useContext, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useSpring, animated } from 'react-spring';
import { DialogContext } from './DialogProvider';
import Background from 'components/Background';
import Container from 'components/Container';


/* === TYPES === */
interface DialogRootProps {
  transition?: any;
  backgroundTransition?: any;
}


/* === STYLED === */
export const AnimatedBackground = animated(Background);


/* === ROOT COMPONENT === */
export const DialogRoot = (props: DialogRootProps) => {
  const { setRootEl, dialogs, backgroundTransition } = useContext(DialogContext);
  const dialogRootEl = useMemo(() => {
    const el = document.createElement('div');
    el.id = 'dialog-root';
    return el;
  }, []);

  useEffect(() => {
    setRootEl(dialogRootEl);
    document.body.appendChild(dialogRootEl);
    return () => {
      setRootEl(null);
      document.body.removeChild(dialogRootEl);
    };
  }, []);

  const [bgTransition, bgTransitionAPI] = useSpring(() => props.backgroundTransition || backgroundTransition || {
    to: { opacity: 0 },
  });

  useEffect(() => {
    bgTransitionAPI.start({ opacity: dialogs.length > 0 ? 0.8 : 0 });
  }, [dialogs]);

  const overlay = (
    <Container
      position='fixed'
      overflowX='hidden'
      overflowY='auto'
      maxWidth='100%'
      width='100%'
      padding='0'
      margin='0'
      bottom='0'
      top='0'
      style={{ perspective: '100rem' }}
      pointerEvents='none'
      transformStyle='preserve-3d'
      zIndex={2000}
      overflow={'hidden'}
    >
      <AnimatedBackground
        key='overlay'
        position='fixed'
        minHeight='100vh'
        zIndex={900}
        height='100%'
        width='100%'
        top='0'
        backgroundColor='black'
        style={bgTransition}
      /> 
    </Container>
  );

  return createPortal(
    overlay,
    dialogRootEl,
  );
};


export default DialogRoot;
