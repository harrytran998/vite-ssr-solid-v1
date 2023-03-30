import { IPageContext } from 'types';

async function onBeforeRender(pageContext: IPageContext) {
  return {
    pageContext: {
      documentProps: {
        title: 'Page Ttile',
        description: 'Page Description',
      },
    },
  };
}

export default onBeforeRender;
