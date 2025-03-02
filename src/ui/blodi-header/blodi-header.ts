import {css, html, LitElement, unsafeCSS} from 'lit';
import {customElement, query} from 'lit/decorators.js';

import '@carbon/web-components/es/components/ui-shell/index.js'
import Switcher20 from '@carbon/web-components/es/icons/switcher/20.js';
import {CDSHeader, CDSHeaderName, CDSHeaderGlobalAction, CDSHeaderPanel} from "@carbon/web-components/es";

import styles from "./blodi-header.scss?inline"

@customElement('blodi-header')
export class BlodiHeader extends LitElement {

  static readonly styles = css`
    ${CDSHeader.styles}
    ${CDSHeaderName.styles}
    ${CDSHeaderGlobalAction.styles}
    ${CDSHeaderPanel.styles}
    ${unsafeCSS(styles)}
  `

  @query('#switcher-panel')
  private readonly _switcherPanel!: CDSHeaderPanel;

  @query('cds-header-global-action')
  private readonly _globalAction!: CDSHeaderGlobalAction;

  render() {
    return html`
      <cds-header aria-label="Blodi header">
        <cds-header-name
          href="javascript:void 0"
          prefix="Blodi"
        >Editor
        </cds-header-name>
        <div class="cds--header__global">
          <cds-header-global-action
            button-label-active="Close switcher"
            button-label-inactive="Open switcher"
            tooltip-text="Open switcher"
            panel-id="switcher-panel"
            tooltip-alignment="right"
            @click="${this._toggleSwitcherPanel}"
          >${Switcher20({slot: 'icon'})}
          </cds-header-global-action>
        </div>
        <cds-header-panel
          id="switcher-panel"
          aria-label="App switcher Panel"
          role="navigation"
        >App switcher Panel
        </cds-header-panel>
      </cds-header>
    `
  }

  private _toggleSwitcherPanel(): void {
    this._globalAction.active = !this._globalAction.active;
    this._switcherPanel.expanded = !this._switcherPanel.expanded
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'blodi-header': BlodiHeader
  }
}
