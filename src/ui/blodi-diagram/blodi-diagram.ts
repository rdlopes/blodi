import {css, html, LitElement, PropertyValues, unsafeCSS} from 'lit';
import {customElement, query} from 'lit/decorators.js';
import Editor from "../../editor";
import styles from "./blodi-diagram.scss?inline"

@customElement('blodi-diagram')
export class BlodiDiagram extends LitElement {

  static readonly styles = css`${unsafeCSS(styles)}`

  @query('#diagram-holder')
  private readonly _diagramHolder!: HTMLDivElement;

  private _editor!: Editor

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
    this._editor = new Editor({
      container: this._diagramHolder,
    });
    this._editor.buildExample();
  }

  render() {
    return html`
      <div class="cds--css-grid">
        <div class="cds--css-grid-column">
          <div id="diagram-holder"></div>
        </div>
      </div>
    `
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'blodi-diagram': BlodiDiagram
  }
}
