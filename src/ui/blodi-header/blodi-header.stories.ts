import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from "lit";

import './blodi-header'

type BlodiHeaderProperties = {};

const meta = {
  title: 'Components / Header',
  component: 'blodi-header',
  render: () => {
    return html`
      <blodi-header></blodi-header>
    `;
  },
} satisfies Meta<BlodiHeaderProperties>;
export default meta;

export const Default: StoryObj<BlodiHeaderProperties> = {};
