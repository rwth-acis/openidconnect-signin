openidconnect-signin
================

**<openidconnect-signin>** is a custom HTML5 element, based on lit-element, that makes it really easy to login to our OpenID Connect provider Keycloak. It
displays a button that is optimized for single-page applications.

The button performs the login of a user, and stores the OIDC access token and the user information in the session storage. Additionally, it dispatches 
the event `signed-in`. When logging out, the button clears the session storage and triggers the event `signed-out`.

Because of reasons, the import of the Keycloak package is not working correctly in React projects. Use **<openidconnect-signin-react>** in your React project instead. 

#### Important note:
The functionality of the button mainly relies on [keycloak-js](https://www.npmjs.com/package/keycloak-js). Unfortunately, this means that the button also includes its limitations:

After rendering, the button uses an iframe to check, if the user is already logged in. This "silent check-sso" makes use of 
third-party cookies, which are (partially) blocked at some browsers. In this case, the check is done with a short redirect, 
which leads to an additional loading of the page. More information about this problem [here](https://www.keycloak.org/docs/latest/securing_apps/#_modern_browsers).

### Element properties
- `oidcClientId`: the ClientID of the OIDC client that you created. You can create them at the [account console](https://auth.las2peer.org/auth/realms/main/account).
- `oidcAuthority`: *(optional)* the Domain of Keycloak. Defaults to Learning-Layers (`https://auth.las2peer.org/auth`).
- `kcRealm`: *(optional)* the Keycloak realm at which the OIDC client was created. Defaults to realm of Learning-Layers (`main`)
- `loginRedirectUri`: *(optional)* the URI to which the user should be redirected after a login. If left out, the user will be redirected to where he came from.
- `logoutRedirectUri`: *(optional)* the URI to which the user should be redirected after a logout. If left out, the user will be redirected to where he came from.
- `oidcScope`: *(optional)* scopes that should be sent in the request to Keycloak additionally to `openid`. When adding multiple scopes, they have to be seperated by a blank, e.g., `oidcScope="mail address"`.
- `silentCheckSsoUri`: *(optional)* the URI at which the `silent-check-sso.html` file is accessible and might have to be changed, depending on the project structure. Defaults to `window.location.origin + '/silent-check-sso.html'`.
- `invisible`: *(optional)* hides the button, so that you can interact with it by using events.

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
<openidconnect-signin oidcClientId="your-beautiful-clientID"></openidconnect-signin>
```
5. Add the file [silent-check-sso.html](silent-check-sso.html) to your project. You might have to set the property `silentCheckSsoUri`, depending on the URI at which the file is accessible.
6. Use the HTML-element as button

Instead of using the element as a button, you can also hide the element and trigger the login and logout by events. Add
the HTML property `invisible` to the <openidconnect-signin> element and it will not be displayed anymore. By using the
events `login` and `logout`, the button will perform the actions.

Visit the [Github pages](https://rwth-acis.github.io/openidconnect-signin) for further documentation.

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
