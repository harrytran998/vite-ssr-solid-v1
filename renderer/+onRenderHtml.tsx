import {
  generateHydrationScript,
  renderToStream,
  renderToString,
} from 'solid-js/web';
import type { IPageContext } from 'types';
import {
  dangerouslySkipEscape,
  escapeInject,
  stampPipe,
} from 'vite-plugin-ssr/server';
import { AppHead } from './AppHead';

import { PageComponent } from './PageComponent';

async function onRenderHtml(pageContext: IPageContext): Promise<unknown> {
  const Head = pageContext.exports.Head || (() => <></>);

  const headHtml = renderToString(() => (
    <AppHead pageContext={pageContext}>
      <Head />
    </AppHead>
  ));

  const { pipe } = renderToStream(() => (
    <PageComponent pageContext={pageContext} isClient={false} />
  ));
  stampPipe(pipe, 'node-stream');

  const documentHtml = escapeInject`<!DOCTYPE html>
  <html lang="vi">
    <head>
      ${dangerouslySkipEscape(headHtml)}
      ${dangerouslySkipEscape(generateHydrationScript())}
    </head>
    <body>
      <div id="dreams-root">${pipe}</div>
    </body>
  </html>`;

  return {
    documentHtml,
  };
}
export default onRenderHtml;
