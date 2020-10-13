import { createContext, useReducer, FC } from 'react';
import { PageInterface } from '@/typings';
import { pageReducers } from '../reducers';

export const initialState: PageInterface['State'] = { versions: ['main'] };

const defaultDispatch: PageInterface['Dispatch'] = () => false;

const Context = createContext({
  state: initialState,
  dispatch: defaultDispatch,
});

const ContextProvider: FC = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(pageReducers, initialState);
  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
};

export { Context as PageContext, ContextProvider as PageContextProvider };
