openidconnect-signin
================

<openidconnect-signin> is a custom HTML5 element that makes it really easy to login to OpenID Connect servers. It
displays a button that is optimized for single-page applications. It works with a popup instead of redirects, so the
context of your Web application in the user's browser remains the same.

Example:
```
<openidconnect-signin client-id="..." scopes="openid profile"></google-signin>
```
