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

## Demo

Either [try it out yourself](https://rwth-acis.github.io/openidconnect-signin/) or enjoy this gif that was made with :heart::

![openidconnect-signin in action](https://i.giphy.com/zkFD9Blr2cPxm.gif)

## License
MIT
