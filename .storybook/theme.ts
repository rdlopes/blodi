import {create} from '@storybook/theming/create';
import {ThemeVars} from "@storybook/theming";
import {version} from '../package.json';

export default create({
  base: 'light',
  fontBase: "'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif",
  fontCode: "'IBM Plex Mono', Menlo, Courier, monospace",
  brandTitle: `Blodi Editor v${version}`,
  brandUrl: 'https://github.com/rdlopes/blodi',
  brandTarget: '_blank',
} as ThemeVars);
