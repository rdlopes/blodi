import type {Preview} from "@storybook/web-components";
import {setCustomElementsManifest} from '@storybook/web-components';
import {html} from 'lit';

import customElements from '../custom-elements.json';

setCustomElementsManifest(customElements)

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    html: {
      root: "#root-inner",
      removeComments: true,
      prettier: {
        tabWidth: 2,
        useTabs: false,
        htmlWhitespaceSensitivity: 'ignore',
        singleAttributePerLine: true,
        quoteProps: 'as-needed',
        bracketSpacing: true,
        bracketSameLine: false,
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Carbon Theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: ['white', 'g10', 'g90', 'g100'],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'white',
  },
  decorators: [
    (story, context) => {
      document.documentElement.setAttribute('data-carbon-theme', context.globals.theme);
      return html`
        ${story(context)}
      `
    }
  ],
};

export default preview;
