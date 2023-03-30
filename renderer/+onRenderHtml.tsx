import { generateHydrationScript, renderToStream } from 'solid-js/web';
import type { IPageContext } from 'types';
import {
  dangerouslySkipEscape,
  escapeInject,
  stampPipe,
} from 'vite-plugin-ssr/server';

import { ContextProvider } from '#/composables/usePageContext';
import PageLayout from '#/layouts/BaseLayout';

async function onRenderHtml(pageContext: IPageContext): Promise<unknown> {
  console.log(
    'onRenderHtml  👻  pageContext:',
    pageContext?.documentProps?.title
  );
  const { Page, pageProps } = pageContext || {};

  const { pipe } = renderToStream(() => (
    <ContextProvider pageContext={pageContext}>
      <PageLayout route={() => ({ Page, pageProps })} />
    </ContextProvider>
  ));
  stampPipe(pipe, 'node-stream');

  const [title, description] = ['Title', 'description'];

  const documentHtml = escapeInject`<!DOCTYPE html>
  <html lang="vi">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${title}</title>
      <meta name="description" content="${description}" key="description" />
      ${dangerouslySkipEscape(generateHydrationScript())}
    </head>
    <body>
      <div id="root">${pipe}</div>
    </body>
  </html>`;

  return {
    documentHtml,
    pageContext: {
      enableEagerStreaming: true,
    },
  };
}
export default onRenderHtml;
