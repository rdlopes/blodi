import {css, html, LitElement, PropertyValues, unsafeCSS} from 'lit';
import {customElement, query} from 'lit/decorators.js';
import {ScaleTypes, StackedAreaChart} from '@carbon/charts'
import styles from "./blodi-chart.scss?inline"

@customElement('blodi-chart')
export class BlodiChart extends LitElement {

  static readonly styles = css`${unsafeCSS(styles)}`

  @query('#chart-holder')
  private readonly _chartHolder!: HTMLDivElement;

  private _barChart?: StackedAreaChart;

  connectedCallback() {
    super.connectedCallback();
    new MutationObserver(() => {
      const theme = document.documentElement.getAttribute('data-carbon-theme')
      this._barChart?.model.setOptions({theme})
    })
      .observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-carbon-theme']
      });
  }

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
    const theme = document.documentElement.getAttribute('data-carbon-theme')
    this._barChart = new StackedAreaChart(this._chartHolder, {
      options: {
        title: 'Vertical simple bar (discrete)',
        theme: theme ?? (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'),
        height: '400px',
        axes: {
          left: {
            mapsTo: 'value'
          },
          bottom: {
            mapsTo: 'group',
            scaleType: ScaleTypes.LABELS
          }
        },
      },
      data: [
        {group: 'Qty', value: 65000},
        {group: 'More', value: 29123},
        {group: 'Sold', value: 35213},
        {group: 'Restocking', value: 51213},
        {group: 'Misc', value: 16932}
      ]
    });
  }

  render() {
    return html`
      <div class="cds--content">
        <div class="cds--chart-holder" id="chart-holder"></div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'blodi-chart': BlodiChart
  }
}
