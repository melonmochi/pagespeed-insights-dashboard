import { createContext, useReducer, FC } from 'react';
// eslint-disable-next-line import/no-cycle
import { globalReducers } from '@/contexts';
import { GlobalInterface } from '@/typings';

export const initialState: GlobalInterface['State'] = {
  versions: ['main'],
};

const defaultDispatch: GlobalInterface['Dispatch'] = () => false;

const Context = createContext({
  state: initialState,
  dispatch: defaultDispatch,
});

const ContextProvider: FC = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(globalReducers, initialState);
  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
};

export { Context as GlobalContext, ContextProvider as GlobalContextProvider };
