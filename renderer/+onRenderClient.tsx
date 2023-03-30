import { createSignal } from "solid-js";
import { hydrate } from "solid-js/web";
import { IPageContext } from "types";

import { ContextProvider } from "#/composables/usePageContext";
import PageLayout, { Route } from "#/layout/BaseLayout";

let layoutReady = false;

// Central signal to track the current active route.
const [route, setRoute] = createSignal<Route | null>(null);

function onRenderClient(pageContext: IPageContext) {
  console.log("onRenderClient  👻  pageContext:", { pageContext });
  const content = document.getElementById("dreams-root") as HTMLElement;
  const { Page, pageProps } = pageContext;

  // Set the new route.
  setRoute({ Page, pageProps });

  // If haven't rendered the layout yet, do so now.
  if (!layoutReady) {
    // Render the page.
    // This is the first page rendering; the page has been rendered to HTML
    // and we now make it interactive.
    hydrate(
      () => (
        <ContextProvider pageContext={pageContext}>
          <PageLayout route={() => route()} />
        </ContextProvider>
      ),
      content
    );
    layoutReady = true;
  }
}

export default onRenderClient;
