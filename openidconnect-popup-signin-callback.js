/**
@license
Copyright (c) 2018 Advanced Community Information Systems (ACIS) Group, Chair of Computer Science 5 (Databases &
Information Systems), RWTH Aachen University, Germany. All rights reserved.
*/

import {LitElement} from 'lit-element';

import 'oidc-client';

/**
 * This element is required in order to successfully log a user in.
 * For this purpose it should be imported to a sperate resource.
 * See [repo](https://github.com/rwth-acis/openidconnect-signin/blob/master/demo/popup-signin-callback.html) for an example.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 *
 */
class OpenIDConnectPopupSigninCallback extends LitElement {

  constructor() {
    super();
    new UserManager().signinPopupCallback();
  }

}

customElements.define('openidconnect-popup-signin-callback', OpenIDConnectPopupSigninCallback);
