import {css, html, LitElement, unsafeCSS} from 'lit';
import {customElement, property, state, query} from 'lit/decorators.js';

import {registerSW} from "virtual:pwa-register";

import '@carbon/web-components/es/components/notification/index.js'
import CDSActionableNotification from "@carbon/web-components/es/components/notification/actionable-notification.js"

import styles from "./blodi-update.scss?inline"

/**
 * PWA update notification.
 *
 * @element blodi-update
 */
@customElement('blodi-update')
export class BlodiUpdate extends LitElement {

  static readonly styles = css`${unsafeCSS(styles)}`

  @property({type: Number, reflect: true, attribute: 'update-period'})
  updatePeriod: number = 60 * 60 * 1000 // check for updates every hour

  @state()
  protected _needsRefresh: boolean = false
  @state()
  protected _offlineReady: boolean = false
  @state()
  private _swActivated: boolean = false
  @state()
  private _updateServiceWorker: undefined | ((reloadPage?: boolean) => Promise<void>)

  @query('cds-actionable-notification')
  protected _notificationPopup?: CDSActionableNotification

  constructor() {
    super();
    addEventListener('cds-notification-closed', this._onBadgeClosed)
  }

  firstUpdated() {
    this._updateServiceWorker = registerSW({
      immediate: true,
      onOfflineReady: () => (this._offlineReady = true),
      onNeedRefresh: () => (this._needsRefresh = true),
      onRegisteredSW: this._onRegisteredSW
    })
  }

  render() {
    if (this._notificationPopup) {
      this._notificationPopup.open = this._offlineReady || this._needsRefresh;
    }
    return html`
      <cds-actionable-notification
        title="PWA Lifecycle"
        subtitle="${this._message()}"
        inline
        ?open=${this._needsRefresh || this._offlineReady}>
        <cds-actionable-notification-button
          slot="action"
          @click="${this._reloadApp}"
        >Reload
        </cds-actionable-notification-button>
      </cds-actionable-notification>
    `
  }

  private _message() {
    if (this._needsRefresh) return 'New content available, click on reload button to update'
    if (this._offlineReady) return 'App ready to work offline'
    return 'No new content'
  }

  private _onBadgeClosed() {
    this._offlineReady = false
    this._needsRefresh = false
  }

  private _onRegisteredSW(swUrl: string, serviceWorkerRegistration?: ServiceWorkerRegistration) {
    if (this.updatePeriod <= 0) return
    if (serviceWorkerRegistration?.active?.state === 'activated') {
      this._swActivated = true
      this._registerPeriodicSync(swUrl, serviceWorkerRegistration)
    } else if (serviceWorkerRegistration?.installing) {
      serviceWorkerRegistration.installing.addEventListener('statechange', (e) => {
        const sw = e.target as ServiceWorker
        this._swActivated = sw.state === 'activated'
        if (this._swActivated)
          this._registerPeriodicSync(swUrl, serviceWorkerRegistration)
      })
    }
  }

  private _reloadApp() {
    return this._updateServiceWorker ? this._updateServiceWorker(true) : Promise.resolve();
  }

  private _registerPeriodicSync(swUrl: string, serviceWorkerRegistration: ServiceWorkerRegistration) {
    if (this.updatePeriod <= 0) return

    setInterval(async () => {
      if ('onLine' in navigator && !navigator.onLine)
        return

      const resp = await fetch(swUrl, {
        cache: 'no-store',
        headers: {
          'cache': 'no-store',
          'cache-control': 'no-cache',
        },
      })

      if (resp?.status === 200)
        await serviceWorkerRegistration.update()
    }, this.updatePeriod)
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'blodi-update': BlodiUpdate
  }
}
