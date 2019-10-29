/**
@license
Copyright (c) 2018 Advanced Community Information Systems (ACIS) Group, Chair of Computer Science 5 (Databases &
Information Systems), RWTH Aachen University, Germany. All rights reserved.
*/

import {LitElement} from 'lit-element';

import 'oidc-client';

class OpenIDConnectRedirectSigninCallback extends LitElement {

  constructor() {
    super();
    new UserManager().signinRedirectCallback()
	  .then(function(user) {
		  window.history.replaceState({}, window.document.title, window.location.origin + window.location.pathname);
		  window.location = user.state || "/";
	  });
  }

}

customElements.define('openidconnect-redirect-signin-callback', OpenIDConnectRedirectSigninCallback);
