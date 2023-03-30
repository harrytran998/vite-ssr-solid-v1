export default {
  passToClient: ['pageProps', 'documentProps', 'someAsyncProps'],
  clientRouting: true,
  hydrationCanBeAborted: true,
  meta: {
    renderMode: {
      env: 'config-only',
      effect({ configDefinedAt, configValue }) {
        let env: string | undefined;
        if (configValue === 'HTML') env = 'server-only';
        if (configValue === 'SPA') env = 'client-only';
        if (configValue === 'SSR') env = 'server-and-client';
        if (!env)
          throw new Error(
            `${configDefinedAt} should be 'SSR', 'SPA', or 'HTML'`
          );
        return {
          meta: {
            Page: { env },
          },
        };
      },
    },
  },
  configDefinitions: {
    documentProps: {
      c_env: 'server-and-client',
    },
    onBeforeRenderIsomorphic: {
      c_env: 'c_config',
      sideEffect({
        configDefinedBy,
        configValue,
      }: {
        configValue: unknown;
        configDefinedBy: string;
      }) {
        if (typeof configValue !== 'boolean') {
          throw new Error(`${configDefinedBy} should be a boolean`);
        }
        if (configValue) {
          return {
            configDefinitions: {
              onBeforeRender: {
                c_env: 'server-and-client',
              },
            },
          };
        }
      },
    },
  },
};
