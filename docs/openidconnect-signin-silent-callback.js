/**
@license
Copyright (c) 2018 Advanced Community Information Systems (ACIS) Group, Chair of Computer Science 5 (Databases &
Information Systems), RWTH Aachen University, Germany. All rights reserved.
*/
import { LitElement } from "./node_modules/lit-element/lit-element.js";
import "./node_modules/oidc-client/lib/oidc-client.min.js";

class OpenIDConnectSigninSilentCallback extends LitElement {
  constructor() {
    super();
    new UserManager().signinSilentCallback();
  }

}

customElements.define('openidconnect-signin-silent-callback', OpenIDConnectSigninSilentCallback);