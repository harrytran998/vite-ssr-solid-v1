import { createContext, useContext } from 'solid-js';
import { Store } from 'solid-js/store';
import { IPageContext } from 'types';

function getGlobalObject<T extends Record<string, unknown> = never>(
  key: `${string}.ts`,
  defaultValue: T
): T {
  const allGlobalObjects = globalThis.__vite_plugin_ssr || {};
  // rome-ignore lint/nursery/noAssignInExpressions: self-assign then return
  const globalObject = (allGlobalObjects[key] =
    (allGlobalObjects[key] as T) || defaultValue);
  return globalObject;
}

const { Context } = getGlobalObject('PageContextProvider.ts', {
  Context: createContext<Store<IPageContext>>(),
});

export function PageContextProvider({ value, children }) {
  if (!value) throw new Error('Argument pageContext missing');
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

/** Access the pageContext from any SolidJS component */
export function usePageContext() {
  const pageContext = useContext(Context);
  console.log('usePageContext  👻  pageContext:', pageContext);
  // if (!pageContext)
  //   throw new Error("<PageContextProvider> is needed for being able to use usePageContext()");
  return pageContext;
}
