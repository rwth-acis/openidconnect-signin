openidconnect-signin
================

**<openidconnect-signin>** is a custom HTML5 element, based on lit-element, that makes it really easy to login to our OpenID Connect provider Keycloak. It
displays a button that is optimized for single-page applications.

The button performs the login of a user, and stores the OIDC access token and the user information in the session storage. Additionally, it dispatches 
the event `signed-in`. When logging out, the button clears the session storage and triggers the event `signed-out`.

### Example

1. Install the dependency
```
npm install rwth-acis/openidconnect-signin
```
2. Import it into your source code
```
import 'openidconnect-signin/openidconnect-signin.js'
```
3. Register an OIDC User-Client at Learning Layers using the [account console](https://auth.las2peer.org/auth/realms/main/account).
4. Add the HTML-element with your newly created client-id
```
<openidconnect-signin oidcAuthority="https://auth.las2peer.tech4comp.dbis.rwth-aachen.de/auth" kcRealm="main" oidcClientId="your-beautiful-clientID"></openidconnect-signin>
```
5. Use the HTML-element as button

Instead of using the element as a button, you can also hide the element and trigger the login and logout by events. Add
the HTML property `invisible` to the <openidconnect-signin> element and it will not be displayed anymore. By using the
events `login` and `logout`, the button will perform the actions.

Visit the [Github pages](https://rwth-acis.github.io/openidconnect-signin) for further documentation.

### Element properties
- `oidcAuthority`: the Domain of Keycloak. For Learning-Layers, we have to add `/auth` to it due to our Keycloak instance.
- `kcRealm`: *(optional)* the Keycloak realm at which the OIDC client was created. For Learning-Layers, you set it to `main`, which is the default value.
- `oidcClientId`: the ClientID of the OIDC client that you created. You can create them at the [account console](https://auth.las2peer.org/auth/realms/main/account).
- `loginRedirectUri`: *(optional)* the URI to which the user should be redirected after a login. If left out, the user will be redirected to where he came from.
- `logoutRedirectUri`: *(optional)* the URI to which the user should be redirected after a logout. If left out, the user will be redirected to where he came from.
- `oidcScope`: *(optional)* scopes that should be sent in the request to Keycloak additionally to `openid`. When adding multiple scopes, they have to be seperated by a blank, e.g., `oidcScope="mail address"`.
- `invisible`: hides the button, so that you can interact with it by using events. 

## Development

Clone this project and install the dependencies.

```bash
git clone git@github.com:rwth-acis/openidconnect-signin.git
cd openidconnect-signin
npm install
```

### Refresh Docs

Every time the API or a doc comment changes it is advisable to rebuild the documentation. 
Run the *docs* npm script and do not forget to add all docs files to git in case any new files have been created.

```bash
npm run docs
git add docs
git commit -am "Update docs"

```

## License
MIT
