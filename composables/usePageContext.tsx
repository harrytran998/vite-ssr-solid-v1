import { ParentComponent, createContext, useContext } from 'solid-js';
import { IPageContext } from 'types';

const AppContext = createContext<IPageContext>();

export const ContextProvider: ParentComponent<{ pageContext: IPageContext }> =
  ({ pageContext, children }) => {
    return (
      <AppContext.Provider value={pageContext}>{children}</AppContext.Provider>
    );
  };

export function usePageContext() {
  const pageContext = useContext(AppContext);
  return pageContext;
}
