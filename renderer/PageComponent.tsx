import { ParentComponent } from "solid-js";

import { IPageContext } from "#/types";
import { PageContextProvider } from "#/composables/usePageContext";

type Props = {
  pageContext: IPageContext;
  isClient: boolean;
};

const PassThrough: ParentComponent = props => {
  return <>{props.children}</>;
};

export const PageComponent: ParentComponent<Props> = ({ pageContext }) => {
  const Layout = pageContext.exports?.Layout ?? PassThrough;
  const Wrapper = pageContext.exports?.Wrapper ?? PassThrough;
  const { Page, props } = pageContext;

  return (
    <PageContextProvider value={pageContext}>
      <Wrapper>
        <Layout>
          <Page {...(props || {})} />
        </Layout>
      </Wrapper>
    </PageContextProvider>
  );
};
