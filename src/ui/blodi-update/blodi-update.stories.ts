import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from "lit";

import './blodi-update'

type BlodiUpdateProperties = {
  needsRefresh: boolean
  offlineReady: boolean
};

const meta = {
  title: 'Components / Update Notification',
  component: 'blodi-update',
  args: {
    needsRefresh: false,
    offlineReady: false,
  },
  render: (args) => {
    return html`
      <blodi-update
        ._needsRefresh="${args.needsRefresh}"
        ._offlineReady="${args.offlineReady}"
      ></blodi-update>
    `;
  },
} satisfies Meta<BlodiUpdateProperties>;
export default meta;

export const NeedsRefresh: StoryObj<BlodiUpdateProperties> = {
  args: {
    needsRefresh: true,
  },
};

export const OfflineReady: StoryObj<BlodiUpdateProperties> = {
  args: {
    offlineReady: true,
  },
};
