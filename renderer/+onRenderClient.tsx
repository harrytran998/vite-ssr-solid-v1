import { createStore, reconcile } from "solid-js/store";
import { hydrate, render } from "solid-js/web";
import { IPageContext } from "types";

import { PageComponent } from "./PageComponent";

const [pageContextStore, setPageContext] = createStore<IPageContext>({} as IPageContext);

let dispose: () => void;
let rendered = false;

function onRenderClient(pageContext: IPageContext) {
  if (!rendered) {
    const content = document.getElementById("dreams-root") as HTMLElement;

    // Dispose to prevent duplicate pages when navigating.
    if (dispose) dispose();
    setPageContext(pageContext);

    if (pageContext.isHydration) {
      dispose = hydrate(() => <PageComponent pageContext={pageContextStore} isClient />, content);
    } else {
      dispose = render(() => <PageComponent pageContext={pageContextStore} isClient />, content);
    }
    rendered = true;
  } else {
    setPageContext(reconcile(pageContext));
  }
}

export default onRenderClient;
