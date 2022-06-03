import React, {
  useMemo,
  useState,
  useCallback,
  createContext,
  PropsWithChildren,
} from 'react';
import type { IDialog } from './Dialog';

/* === TYPES === */
export interface IDialogContext {
  root?: HTMLElement | null;
  dialogs: IDialog[];
  addDialog: (d: IDialog) => any;
  setDialogs: (d: IDialog[]) => any;
  removeDialog: (d: IDialog) => any;
  setRootEl: (el: HTMLElement | null) => void;
  transition?: { [key: string]: any };
  backgroundTransition?: { [key: string]: any };
}

export interface DialogProviderProps {
  transition?: { [key: string]: any };
  backgroundTransition?: { [key: string]: any };
}


/* === CONTEXT === */

const defaultContext: IDialogContext = {
  dialogs: [],
  addDialog: () => null,
  setDialogs: () => null,
  removeDialog: () => null,
  setRootEl: () => null,
};

export const DialogContext = createContext(defaultContext);
const { Provider } = DialogContext;


/* === PROVIDER ROOT === */
export const DialogProvider = (props: PropsWithChildren<DialogProviderProps>) => {
  const { children, transition, backgroundTransition } = props;
  const [dialogs, setDialogs]: [IDialog[], (v: any) => any] = useState([]);
  const [rootEl, setRootEl] = useState<HTMLElement | null>(null);

  const addDialog = useCallback((d: IDialog) => {
    const extant = dialogs.find((dia) => dia.name === d.name);
    if (extant) {
      return;
    }
    setDialogs(dialogs.concat(d));
  }, [dialogs]);
  
  const removeDialog = useCallback((d: IDialog) => {
    const idx = dialogs.findIndex((dia) => dia.name === d.name);
    if (idx === -1) {
      return;
    }
    const remaining = dialogs.concat();
    remaining.splice(idx, 1);
    setDialogs(remaining);
  }, [dialogs]);

  const context = useMemo(() => ({
    root: rootEl,
    setRootEl,
    dialogs,
    setDialogs,
    addDialog,
    removeDialog,
    transition,
    backgroundTransition,
  }), [dialogs]);

  return (
    <Provider value={context}>
      { children }
    </Provider>
  );
};

export default DialogProvider;
