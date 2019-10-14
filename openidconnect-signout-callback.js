/**
@license
Copyright (c) 2018-2019 Advanced Community Information Systems (ACIS) Group, Chair of Computer Science 5 (Databases &
Information Systems), RWTH Aachen University, Germany. All rights reserved.
*/

import {LitElement} from 'lit-element';

class OpenIDConnectSignoutCallback extends LitElement {

  constructor() {
    super();
    new UserManager().signoutCallback();
  }

}

customElements.define('openidconnect-signout-callback', OpenIDConnectSignoutCallback);
