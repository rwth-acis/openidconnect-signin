/**
@license
Copyright (c) 2018 Advanced Community Information Systems (ACIS) Group, Chair of Computer Science 5 (Databases &
Information Systems), RWTH Aachen University, Germany. All rights reserved.
*/
import { LitElement } from "./node_modules/lit-element/lit-element.js";
import "./node_modules/oidc-client/lib/oidc-client.min.js";
/**
 * This element is required in order to successfully log a user out.
 * For this purpose it should be imported to a sperate resource.
 * See [repo](https://github.com/rwth-acis/openidconnect-signin/blob/master/demo/popup-signout-callback.html) for an example.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 *
 */

class OpenIDConnectPopupSignoutCallback extends LitElement {
  constructor() {
    super();
    new UserManager().signoutPopupCallback();
  }

}

customElements.define('openidconnect-popup-signout-callback', OpenIDConnectPopupSignoutCallback);