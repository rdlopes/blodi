import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from "lit";

import './blodi-chart.ts'

type BlodiChartProperties = {};

const meta = {
  title: 'Components / Chart',
  component: 'blodi-chart',
  render: () => {
    return html`
      <blodi-chart></blodi-chart>
    `;
  },
} satisfies Meta<BlodiChartProperties>;
export default meta;

export const Default: StoryObj<BlodiChartProperties> = {};
