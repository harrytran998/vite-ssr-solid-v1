import type { Accessor, Component } from 'solid-js';

export interface Route {
  Page: Component;
  pageProps: Record<string, unknown>;
}
interface Props {
  route: Accessor<Route | null>;
}

const BaseLayout: Component<Props> = (props) => {
  const renderedRoute = () => {
    const { Page, pageProps } = props.route() ?? {};
    return Page && <Page {...pageProps} />;
  };
  return renderedRoute();
};

export default BaseLayout;
