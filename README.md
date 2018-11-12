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

## License
MIT
