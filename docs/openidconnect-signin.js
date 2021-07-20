/**
@license
Copyright (c) 2018 Advanced Community Information Systems (ACIS) Group, Chair of Computer Science 5 (Databases &
Information Systems), RWTH Aachen University, Germany. All rights reserved.
*/
import { LitElement, html } from "./node_modules/lit-element/lit-element.js";
import { openidconnectIcon, signOutIcon } from './openidconnect-icons.js';
import "./node_modules/oidc-client/lib/oidc-client.min.js";
/**
 * `<openidconnect-signin>` is used to authenticate with an OpenID Connect provider, allowing you to interact
 *  with OpenID APIs.
 *  Upon successful login a [signed-in](/#/elements/OpenIDConnectSignin#method-_handleSignedIn) event is dispatched with a oidc-user-object as the `event.detail`.
 *  The content of this object is displayed as part of the [demo](/#/elements/openidconnect-signin/demos/demo/index.html) after a successful login and can be retrieved via the protected [_user-property](/#/elements/openidconnect-signin#property-_user).
 *  The `profile.sub` attribute can be used to identify a user and the `access_token` can be passed as `Bearer` token within the `Authorization` header to authenticate a user against the [learning-layers API](https://api.learning-layers.eu/o/oauth2/).
 *  Upon logout a [signed-out](/#/elements/OpenIDConnectSignin#method-_handleSignedIn) event is dispatched.
 *  The element also has the protected [_signedIn-property](/#/elements/openidconnect-signin#property-_signedIn) indicating whether a user is logged in.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 *
 */

class OpenIDConnectSignin extends LitElement {
  static get properties() {
    return {
      authority: {
        type: String
      },
      clientId: {
        type: String
      },

      /**
       * Mandatory attribute. The resource this points to only has to import the `<openidconnect-popup-signin-callback>`
       * or `<openidconnect-redirect-signin-callback>` depending on whether redirect is used or not.
       * See [repo](https://github.com/rwth-acis/openidconnect-signin/blob/master/demo/popup-signin-callback.html) for an example.
       */
      popupRedirectUri: {
        type: String
      },

      /**
       * Mandatory attribute. The resource this points to only has to import the `<openidconnect-popup-signout-callback>`.
       * See [repo](https://github.com/rwth-acis/openidconnect-signin/blob/master/demo/popup-signout-callback.html) for an example.
       */
      popupPostLogoutRedirectUri: {
        type: String
      },
      providerName: {
        type: String
      },
      scope: {
        type: String
      },

      /**
       * Mandatory attribute. The resource this points to only has to import the `<openidconnect-signin-silent-callback>`.
       * See [repo](https://github.com/rwth-acis/openidconnect-signin/blob/master/demo/silent-callback.html) for an example.
       */
      silentRedirectUri: {
        type: String
      },

      /**
       * If set, the login procedure works via a redirect to the learning-layers api.
       * In that case you have to import the `<openidconnect-redirect-signin-callback>`
       * element in the resource `popupRedirectUri` points to (instead of `<openidconnect-popup-signin-callback>`).
       * See [redirect-signin-callback](https://github.com/rwth-acis/openidconnect-signin/blob/master/demo/redirect-signin-callback.html)
       * for an example.
       */
      useRedirect: {
        type: Boolean
      },

      /**
       * If set, the login uses the `Authorization Code Flow` instead of the `Implicit Flow`.
       * This enables to request `refresh tokens`, that can be used to refresh your access token.
       */
      useCodeFlow: {
        type: Boolean
      },
      _signedIn: {
        type: Boolean
      },
      _user: {
        type: Object
      }
    };
  }

  constructor() {
    super();
    this._signedIn = false;
    this.useRedirect = false;
    this.useCodeFlow = false;
  }

  render() {
    return html`
      <style>
        :host {
          display: inline-block;
        }

        .button {
          /* Styles (c) https://developers.google.com/identity/sign-in/web/sign-in */
          min-width: 120px;
          height: 36px;
          -webkit-border-radius: 1px;
          border-radius: 1px;
          -webkit-box-shadow: 0 2px 4px 0px rgba(0,0,0,.25);
          box-shadow: 0 2px 4px 0 rgba(0,0,0,.25);
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          -webkit-transition: background-color .218s,border-color .218s,box-shadow .218s;
          transition: background-color .218s,border-color .218s,box-shadow .218s;
          -webkit-user-select: none;
          -webkit-appearance: none;
          background-color: #fff;
          background-image: none;
          color: #262626;
          cursor: pointer;
          outline: none;
          overflow: hidden;
          position: relative;
          text-align: center;
          vertical-align: middle;
          white-space: nowrap;
        }

        .button:hover {
          -webkit-box-shadow: 0 0 3px 3px rgba(66,133,244,.3);
          box-shadow: 0 0 3px 3px rgba(66,133,244,.3);
        }

        .icon {
          padding: 8px;
          width: 18px;
          height: 18px;
          float: left;
        }

        .label {
          font-family: Roboto;
          font-size: 13px;
          line-height: 34px;
          margin-right: 8px;
        }
      </style>

      <div class="button"
           @click=${this._handleClick}>
        
          ${this._signedIn ? html`
            <div class="icon">
              ${signOutIcon}
            </div>
            <span class="label">
              Sign out${this.providerName ? html` from ${this.providerName}` : ''}
            </span>
          ` : html`
            <div class="icon">
              ${openidconnectIcon}
            </div>
            <span class="label">
              Sign in${this.providerName ? html` using ${this.providerName}` : ''}
            </span>
          `}
      </div>
    `;
  }

  updated(changedProperties) {
    const settings = {
      authority: this.authority,
      client_id: this.clientId,
      redirect_uri: this._pathToUri(this.popupRedirectUri),
      post_logout_redirect_uri: this._pathToUri(this.popupPostLogoutRedirectUri),
      response_type: this.useCodeFlow ? 'code' : 'id_token token',
      response_mode: this.useCodeFlow ? 'fragment' : null,
      scope: this.scope,
      popup_redirect_uri: this._pathToUri(this.popupRedirectUri),
      popup_post_logout_redirect_uri: this._pathToUri(this.popupPostLogoutRedirectUri),
      silent_redirect_uri: this._pathToUri(this.silentRedirectUri),
      automaticSilentRenew: true,
      //silentRequestTimeout: 10000,
      filterProtocolClaims: true,
      loadUserInfo: true
    };
    this._manager = new UserManager(settings);

    this._manager.events.addUserLoaded(user => {
      this._user = user;

      this._handleSignedIn();
    });

    this._manager.events.addUserUnloaded(user => {
      this._user = undefined;

      this._handleSignedOut();
    });

    this._manager.events.addSilentRenewError(function (error) {
      console.error('error while renewing the access token', error);
    });

    if (!this._signedIn) {
      // try silent login
      this._manager.signinSilent().catch(err => {});
    }
  }
  /**
   * Completes a path to a full URI by using protocol, host and port of the current request.
   *
   * If path is "/my/path" and the current request is targeted at "https://example.com/app/",
   * then this function returns "https://example.com/my/path".
   * If in above example the path is "my/path/", then this function returns "https://example.com/app/my/path".
   *
   * @param path A path like "/my/path" or "my/path".
   * @private
   */


  _pathToUri(path) {
    path = path.trim();

    if (path.startsWith('http')) {
      return path;
    }

    if (path.startsWith('/')) {
      // the path is absolute and we need to append it after the origin part of the current location
      return window.location.origin + path;
    } else {
      // the path is relative and we need to append it to the current path without the part after the last slash
      return window.location.href.substr(0, window.location.href.lastIndexOf('/') + 1) + path;
    }
  }

  _handleClick(e) {
    if (this._signedIn) {
      const errorHandler = () => {
        // could not log out, at least clear state
        this._manager.clearStaleState();

        this._manager.removeUser();
      };

      if (this.useRedirect) {
        this._manager.signoutRedirect({
          state: window.location.href
        }).catch(errorHandler);
      } else {
        this._manager.signoutPopup().catch(errorHandler);
      }
    } else {
      if (this.useRedirect) {
        this._manager.signinRedirect({
          state: window.location.href
        });
      } else {
        this._manager.signinPopup();
      }
    }
  }

  _handleSignedIn() {
    this._signedIn = true;
    this.dispatchEvent(new CustomEvent('signed-in', {
      bubbles: true,
      detail: this._user
    }));
  }

  _handleSignedOut() {
    this._signedIn = false;
    this.dispatchEvent(new CustomEvent('signed-out', {
      bubbles: true
    }));
  }

}

customElements.define('openidconnect-signin', OpenIDConnectSignin);