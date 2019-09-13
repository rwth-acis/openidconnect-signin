openidconnect-signin
================

<openidconnect-signin> is a custom HTML5 element that makes it really easy to login to an OpenID Connect provider. It
displays a button that is optimized for single-page applications. It works with a popup instead of redirects, so the
context of your Web application in the user's browser remains the same.

The element is based on lit-element.

###Example

1. Install the dependency
```
npm install rwth-acis/openidconnect-signin
```
2. Import it into your source code
```
import 'openidconnect-signin/openidconnect-signin.js'
```
3. Register an OIDC-token using the [Learning Layers Self-service](https://api.learning-layers.eu/o/oauth2/manage/dev/dynreg)
4. Add the HTML-element with your newly created client-id
```
<openidconnect-signin clientid="..." scopes="openid profile"></openidconnect-signin>
```

Visit the [Github pages](https://rwth-acis.github.io/openidconnect-signin) for further documentation.

## Demo

Either [try it out yourself](https://rwth-acis.github.io/openidconnect-signin/#/elements/openidconnect-signin/demos/demo/index.html) or enjoy this gif that was made with :heart::

![openidconnect-signin in action](https://i.giphy.com/zkFD9Blr2cPxm.gif)

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
