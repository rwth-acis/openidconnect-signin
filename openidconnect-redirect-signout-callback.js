/**
 @license
 Copyright (c) 2018 Advanced Community Information Systems (ACIS) Group, Chair of Computer Science 5 (Databases &
 Information Systems), RWTH Aachen University, Germany. All rights reserved.
 */

import {LitElement} from 'lit-element';

import 'oidc-client';

/**
 * This element is required in order to successfully log a user out when the `useredirect` attribute is set.
 * For this purpose it should be imported to a sperate resource.
 * See [repo](https://github.com/rwth-acis/openidconnect-signin/blob/master/demo/redirect-signout-callback.html) for an example.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 *
 */
class OpenIDConnectRedirectSignoutCallback extends LitElement {

    constructor() {
        super();

        new UserManager().signoutRedirectCallback()
            .then(function(response) {
            window.history.replaceState({}, window.document.title, window.location.origin + window.location.pathname);
            window.location = response.state || "/";
        });
    }

}

customElements.define('openidconnect-redirect-signout-callback', OpenIDConnectRedirectSignoutCallback);
