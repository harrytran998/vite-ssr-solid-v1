import { Component, createSignal } from 'solid-js';

import { usePageContext } from '#/composables/usePageContext';

const IndexPage: Component = () => {
  const [count, setCount] = createSignal(0);
  const context = usePageContext();
  // Always undefined
  console.log('context:', context);

  return (
    <>
      <h1>Welcome</h1>
      <div>
        This page is:
        <ul>
          <li>Rendered to HTML.</li>
          <li>
            Interactive.{' '}
            <button type="button" onClick={() => setCount((prev) => prev + 1)}>
              Counter {count()}
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default IndexPage;
