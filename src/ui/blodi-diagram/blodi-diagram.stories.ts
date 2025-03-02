import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from "lit";

import './blodi-diagram.ts'

type BlodiDiagramProperties = {};

const meta = {
  title: 'Components / Diagram',
  component: 'blodi-diagram',
  render: () => {
    return html`
      <blodi-diagram></blodi-diagram>
    `;
  },
} satisfies Meta<BlodiDiagramProperties>;
export default meta;

export const Default: StoryObj<BlodiDiagramProperties> = {};
