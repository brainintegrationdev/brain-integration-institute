# Work Experience Template (Client App)

## Overview
The client app is a very lean VITE React SPA with minimal boilerplate:
- `src/`
    - `assets/`
        - CSS, Images, Fonts, etc.
    - `components/`
        - React components (non-pages).
    - `providers/`
        - React provider components.
    - `routes/`
        - Page level components. These correspond to the routes defined in [`RouteProvider.jsx`](./src/providers/RouterProvider.jsx)
    - `hooks.js`
        - Reusable custom hooks.
    - `contexts.js`
        - React context object definitions
- `.env`
    - Environment Variable file for storing Auth0 and Cloudinary credentials as well as other environment-specific values.
- `vite.config.js`


## Authenticated Routes
To make a page require authentication from the user, simply wrap the component in the `withAuthenticationRequired` HOC. This should only need to be used on page-level components in `/routes` that get rendered from [`RouteProvider.jsx`](./src/providers/RouterProvider.jsx). For example:
```js
import { withAuthenticationRequired } from "@auth0/auth0-react";

export const ProtectedPage = withAuthenticationRequired(() => <div>Protected Page</div>)
```

