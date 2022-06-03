import React, {
  useRef,
  useMemo,
  useEffect,
  useContext,
  PropsWithChildren,
} from 'react';
import { useTransition, animated } from 'react-spring';
import { createPortal } from 'react-dom';
import { DialogContext } from './DialogProvider';
import Box, { BoxProps } from 'components/Box';
import { FakeLink } from 'components/Link';
import Flex from 'components/Flex';
import Icon from 'components/Icon';


/* === TYPES === */
export interface DialogOptions extends Omit<BoxProps, 'transition'> {
  name?: string;
  dismissOnClickBackground?: boolean;
  showCloseButton?: boolean;
  onClose: () => any;
  show?: boolean;
  transition?: { [key: string]: any };
}

export interface IDialog {
  name: string;
  show: boolean;
}


/* === ANIMATED COMPONENTS === */
const AnimatedContainer = animated(Flex);


/* === COMPONENT === */
export const Dialog = (props: PropsWithChildren<DialogOptions>) => {
  const {
    name: propName,
    children,
    dismissOnClickBackground,
    showCloseButton,
    onClose,
    show = false,
    transition: transitionProp,
    ...containerProps
  } = props;
  const {
    root,
    dialogs,
    addDialog,
    removeDialog,
    transition: defaultTransition,
  } = useContext(DialogContext);

  const name = useMemo(() => {
    return propName || performance.now().toString();
  }, [propName]);

  const dialogItem = useMemo<IDialog>(() => ({
    name,
    show,
  }), []);
  
  const index = dialogs.indexOf(dialogItem);
  const isOnTop = dialogs.length - 1 === index;
  const transition = transitionProp || defaultTransition || {
    config: { mass: 0.9, tension: 311, friction: 24, precision: 0.0001 },
    key: name,
    enter: (item: any) => {
      return {
        to: {
          transform: `translate3d(0, 0vh, 0rem)`,
          opacity: 1,
        },
        from: {
          transform: `translate3d(0, 100vh, 0rem)`,
          opacity: 0,
        },
      };
    },
    update: (item: any) => {
      const l = dialogs.length || 1;
      const d = (index - l + 1) * 10;
      return {
        transform: show ? `translate3d(0, 0vh, ${d}rem)` : `translate3d(0, 100vh, ${d}rem)`,
        opacity: (index + 1) / l,
      };
    },
    leave: (item: any) => {
      return {
        to: {
          transform: `translate3d(0, 100vh, 0rem)`,
          opacity: 0,
        },
        from: {
          transform: `translate3d(0, 0vh, 0rem)`,
          opacity: 1,
        },
      };
    },
  };

  const handleClickBackground = () => {
    if (!dismissOnClickBackground) {
      return;
    }
    removeDialog(dialogItem);
    onClose();
  };

  const dialogItems = <DialogContent {...props} key={name}>
    { children }
  </DialogContent>;
  const transitions = useTransition(dialogItems, transition);

  useEffect(() => {
    if (show) {
      addDialog(dialogItem);
    } else {
      removeDialog(dialogItem);
    }
  }, [show])

  const el = (
    <Flex
      position='fixed'
      overflow='hidden'
      width='100%'
      maxWidth='100%'
      height='100vh'
      maxHeight='100vh'
      bottom='0'
      top='0'
      justifyContent='center'
      alignItems='center'
      zIndex={2010}
      style={{ pointerEvents: show ? 'initial' : 'none', perspective: '100rem' }}
      onClick={handleClickBackground}
    >
      { transitions((p, item) => {
        return (
          <AnimatedContainer
            key={name}
            justifyContent='center'
            zIndex={1000 + index}
            maxWidth='100%'
            maxHeight='100%'
            overflow='auto'
            style={{
              pointerEvents: isOnTop ? 'initial' : 'none',
              ...p
            }}
          >
            { item }
          </AnimatedContainer>
        );
      }) 
    }
    </Flex>
  );

  return root
    ? createPortal(el, root)
    : null;
};


function DialogContent(props: PropsWithChildren<DialogOptions>) {
  const {
    children,
    dismissOnClickBackground,
    showCloseButton,
    onClose,
    show = false,
    transition: transitionProp,
    ...containerProps
  } = props;
  const boxRef = React.useRef<HTMLDivElement | null>(null);
  
  const paddingWithDefault = containerProps.padding != null
    ? containerProps.padding
    : containerProps.p != null
    ? containerProps.p
    : [3, 4];
  
  const makeKeyDownCloseHandler = (key: string): React.KeyboardEventHandler => (e: React.KeyboardEvent) => {
    if (e.key !== key) return;
    onClose();
  };

  React.useEffect(() => {
    boxRef.current?.focus();
  }, [boxRef]);
  
  return (
    <Box
      onClick={(e) => e.stopPropagation()}
      minWidth='32rem'
      maxWidth='72rem'
      bg='background'
      width={['92%', '72%']}
      boxShadow={0}
      position='relative'
      {...containerProps}
      padding={paddingWithDefault}
      onKeyDown={makeKeyDownCloseHandler('Escape')}
      ref={(el) => { boxRef.current = el; }}
      tabIndex={1}
    >
      { children }
      <Box position='absolute' top={'0.8rem'} right={'0.8rem'}>
        <FakeLink onClick={onClose} onKeyDown={makeKeyDownCloseHandler('Enter')}>
          <Icon
            name='close'
            size={'3.2rem'}
            variant='secondary'
            tabIndex='1'
          />
        </FakeLink>
      </Box>
    </Box>
  );
}

export default Dialog;
