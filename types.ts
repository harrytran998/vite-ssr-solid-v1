import type { Component } from 'solid-js';
import type { PageContextBuiltIn } from 'vite-plugin-ssr';
import { PageContextBuiltInClient } from 'vite-plugin-ssr/client';

export type IPageContext = {
  Page: any;
  props: Record<string, unknown> & {
    document?: {
      title: string;
      description?: string;
    };
  };
  exports: {
    Head?: Component;
    Layout?: Component;
    Wrapper?: Component;
    props?: {
      document: {
        title: string;
        description?: string;
      };
    };
  };
  prerenderUrls: string[];
} & PageContextBuiltIn &
  PageContextBuiltInClient;
