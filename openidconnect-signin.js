/**
@license
Copyright (c) 2018 Advanced Community Information Systems (ACIS) Group, Chair of Computer Science 5 (Databases &
Information Systems), RWTH Aachen University, Germany. All rights reserved.
*/

import {LitElement, html, css} from 'lit';
import "keycloak-js/dist/keycloak.js";
import {openidconnectIcon, signOutIcon} from './openidconnect-icons.js';

/**
 * `<openidconnect-signin>` is used to authenticate with Keycloak as an OpenID Connect provider.
 *  Upon successful login a `signed-in` event is dispatched with a json containing the user information as the `event.detail`.
 *  Upon logout a `signed-out` event is dispatched.
 *
 *  The login and logout can also be triggered by the events `login` and `logout`.
 *  By setting the HTML property `invisible`, the button will not be displayed, which is useful if you only want to interact with it by events. *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 *
 */
class OpenIDConnectSignIn extends LitElement {

    static get styles() {
        return css`
            :host {
              display: inline-block;
            }
    
            .kc-button {
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
    
            .kc-button:hover {
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
        `;
    }

    render() {
        return html`
            <div class="kc-button" style="${this.invisible ? "display:none;" : ""}"
                 @click=${this._handleClick}>

                ${this._signedIn ? html`
                    <div class="icon">
                        ${signOutIcon}
                    </div>
                    <span class="label">
                  Sign out from Learning Layers
                </span>
                ` : html`
                    <div class="icon">
                        ${openidconnectIcon}
                    </div>
                    <span class="label">
                  Sign in using Learning Layers
                </span>
                `}
            </div>
        `;
    }

    static get properties() {
    return {
        /**
         * Can be set to make the HTML element invisible. You can interact with it by using the events `login` and `logout`..
         */
        invisible: {
            type: Boolean,
        },
        /**
         * URL of Keycloak. In out case, we have to add `/auth` to the end.
         */
        oidcAuthority: {
            type: String
        },
        /**
         * The realm of the OIDC client. Usually, you use `main`
         */
        kcRealm: {
            type: String
        },
        /**
         * The ID of your OIDC client. You can create one at the [account-console](https://auth.las2peer.org/auth/realms/main/account) of Learning-Layers
         */
        oidcClientId: {
            type: String
        },
        /**
         * (Optional) The URI to which Keycloak should redirect the user after the login. Has to be set in the settings
         * of the client. If left out, it sends the user back to the page where he came from.
         */
        loginRedirectUri: {
            type: String
        },
        /**
         * (Optional) The URI to which Keycloak should redirect the user after the logout. Has to be set in the settings
         * of the client. If left out, it sends the user back to the page where he came from.
         */
        logoutRedirectUri: {
            type: String
        },
        /**
         * (Optional) Additional scopes that should be requested from Keycloak. Multiple scopes can be requested, by
         * separating them with a blank, e.g. for requesting `mail` and `address`, set `oidcScope="mail address"`.
         * The scope `openid` is always set and will also be requested, if oidcScope is left out.
         */
        oidcScope: {
            type: String
        },
        /**
         * (Optional) Needed if your `silent-check-sso.html` file is not at the path "window.location.origin + '/silent-check-sso.html'"
         */
        silentCheckSsoUri: {
            type: String
        },
        _signedIn: {
            type: Boolean
        },
        _keycloak: {
            type: Object
        }
    };
    }

    constructor() {
        super();
        this._signedIn = false;
        this.oidcAuthority = "https://auth.las2peer.org/auth";
        this.kcRealm = "main";
        this.silentCheckSsoUri = window.location.origin + '/silent-check-sso.html';
        this.oidcClientId = "localtestclient";
        this.invisible = false;
        this.loginRedirectUri = "";
        this.logoutRedirectUri = "";
        this.oidcScope = "";
        window.addEventListener("login", () => {
            this._keycloak.login({
                redirectUri: this.loginRedirectUri,
                scope: this.oidcScope,
            });
        });
        window.addEventListener("logout", () => {
            sessionStorage.removeItem("oidc_user");
            sessionStorage.removeItem("access-token");
            dispatchEvent(new CustomEvent("signed-out", {bubbles: true}));
            this._keycloak.logout({
                redirectUri: this.logoutRedirectUri
            });
        })
    }

    /**
     * Triggered, whenever the element is loaded the first time. It checks if the user is already logged in and loads the user information
     * @param _changedProperties
     */
    firstUpdated(_changedProperties) {
        super.firstUpdated(_changedProperties);
        this._keycloak = new Keycloak({
            url: this.oidcAuthority,
            realm: this.kcRealm,
            clientId: this.oidcClientId
        });
        if (!this._signedIn) {
            let button = this;
            this._keycloak.init({
                onLoad: 'check-sso',
                silentCheckSsoRedirectUri: this.silentCheckSsoUri,
                scope: this.oidcScope,
            }).then((authenticated) => {
               if (authenticated) {
                   sessionStorage.setItem("access-token", this._keycloak.token);
                   this._keycloak.loadUserInfo().then(() => {
                       sessionStorage.setItem("oidc_user", JSON.stringify(this._keycloak.userInfo));
                       dispatchEvent(new CustomEvent("signed-in", {bubbles: true, detail: this._keycloak.userInfo}));
                   })
                   button._signedIn = true;
               }
               // else {
               //     console.log("User not authenticated");
               // }
            });
        }
    }

    /**
     * Performs the button click
     * @private
     */
    _handleClick() {
        if (!this._signedIn) {
            this._keycloak.login({
                redirectUri: this.loginRedirectUri,
                scope: this.oidcScope,
            });
        } else {
            sessionStorage.removeItem("oidc_user");
            sessionStorage.removeItem("access-token");
            dispatchEvent(new CustomEvent("signed-out", {bubbles: true}));
            this._keycloak.logout({
                redirectUri: this.logoutRedirectUri
            });
        }
    }

}
customElements.define('openidconnect-signin', OpenIDConnectSignIn);
