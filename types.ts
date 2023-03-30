import type { PageContextBuiltIn } from 'vite-plugin-ssr';
import { PageContextBuiltInClient } from 'vite-plugin-ssr/client';

export type IPageContext = {
  Page: any;
  pageProps: Record<string, unknown>;
  exports: {
    documentProps?: {
      title: string;
      description?: string;
    };
  };
  documentProps?: {
    title: string;
    description?: string;
  };
  prerenderUrls: string[];
} & PageContextBuiltIn &
  PageContextBuiltInClient;
