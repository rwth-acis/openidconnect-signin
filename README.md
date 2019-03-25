openidconnect-signin
================

<openidconnect-signin> is a custom HTML5 element that makes it really easy to login to an OpenID Connect provider. It
displays a button that is optimized for single-page applications. It works with a popup instead of redirects, so the
context of your Web application in the user's browser remains the same.

The element is based on lit-element.

Example:
```
<openidconnect-signin clientid="..." scopes="openid profile"></openidconnect-signin>
```

Visit the [Github pages](https://rwth-acis.github.io) for further documentation.

## Demo

Either [try it out yourself](https://rwth-acis.github.io/#/elements/openidconnect-signin/demos/demo/index.html) or enjoy this gif that was made with :heart::

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
