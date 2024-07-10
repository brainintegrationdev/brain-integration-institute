# Braintrust Institute

## Project Structure
- `.env`
    - Server environment variables
- `index.js`
    - Main application entry point
- `server.js`
    - Exports Express.js server instance
- `client/`
    - Client web app. See [Client Docs](./client//README.md)
- `middleware/`
    - `auth.js`
        - Authentication related middleware
    - `cdn.js`
        - Cloudinary middleware for managing file uploads
    - `log.js`
        - General-use logging and error handling middleware
- `models/*.js`
    - Contains Mongoose data models
- `routes/*.js`
    - Contains Express.js routes
- `services/*.js`
    - Utility functions for accessing data models

## Getting Started

> Note: You will need to create valid accounts for [Cloudinary](https://cloudinary.com/), [Atlas](https://www.mongodb.com/) and [Auth0](https://auth0.com/) to run the application. It is recommended that each developer on the project create their own free accounts instead of sharing one.

### Clone project
```bash
git clone <url>

# To use a different template, checkout to the corresponding branch. Available templates are listed above under Templates.
git checkout <branch>
```

### Set up development environment
```bash
# create .env files.
# please read the .env.template files for documentation on each variable value
cat .env.template >> .env
cat client/.env.template >> client/.env

# install server dependencies
npm i

# install client dependencies
cd client && npm i
```

### Set Up Authentication
All users are managed by Auth0. In order to configure the application to authenticate correctly, you will need to create an Auth0 account. In addition, there are a few things you need to do from the Auth0 dashboard:

##### Register New Web Client Application
In order for Auth0 to know which application users are logging into (and where to redirect back to), we need to create and register the web client application from the Auth0 dashboard.

Under Applications, select Applications and click create. Select Single Page Web Application. Under settings tab add the URL of your Vite client server (e.g. `http://localhost:5173`) to the following form fields: 
- Allowed Callback URL's
    - Make sure to include the full path to where users should be directed to after authentication (e.g. `http://localhost:5173/profile`)
- Allowed Logout URL's
- Allowed Web Origins

At the top of settings you will find the credentials for connecting to the Auth0 Service from your frontend web application. See [`client/.env.template`](client/.env.template) file for reference.

When running the web app locally you should be able to log in and sign up users successfully from the landing page.

##### Create API Application
In order for the server to authenticate requests, we need to create and configure an Auth0 API which will allow requests to made to our server `api/` endpoints

Under Applications Menu, select APIs and click Create API. Give it a name and use the server endpoint as your identifier (e.g. `http://localhost:8080`). Your identifier will be used for the `VITE_AUTH0_AUDIENCE` and `AUTH0_AUDIENCE` environment variables. Under Quickstart --> Node.js you will see the `AUTH0_ISSUER_BASE_URL` value needed to configure your Auth0 server connection.


##### Define and Apply Permissions (Optional)
You can define the permissions that apply to this API under the Permissions tab. These can be whatever you want, as determined by your application needs. To enforce them, Under Users --> Roles you must create a User Role and apply the relevant permissions for the selected API. Finally, a role can be assigned to any user using either Management API or manually in the Auth0 dashboard under Users. To authorize requests to your server, you an use the `allow()` middleware function which will prevent users without the specified permissions to access the endpoint.
```js
// example
server.get('/authorized-to-read', allow(['read:resource'], (req, res) => {res.status(200).send('resources sent!')}) )
``` 

---

### Create MongoDB Database

From the main dashboard create a new project and follow the steps to create a new database. Select the databse and click Connect and select the first option (NodeJs Driver). The connection string looks something like this:
```bash
mongodb+srv://<user>:<password>@<database>.mongodb.net/<name>
```

---

### Register Cloudinary CDN
Once you create an account you can easily retrieve the SDK environment variables from the console.

---

### Run locally
Before you run the applications, make sure all the environment variables have been defined and are correct or else you will likely see errors.

```bash
# run dev server (from root project folder)
npm run dev

# on a different terminal window, run web client
cd client && npm run dev
```
> See [Web Client Docs](./client/README.md) for more.

### Troubleshooting
- The most common issue when initiating the app is incorrect/misspelled environment variables in `.env`. Double check these to make sure they match your cloud configurations. See `.env.template` files for reference.

- Authentication will often fail if the callback URL's are not accurate. Auth0 will break even if the URL says `http://127.0.0.1:<port>` instead 
of `http://localhost:<port>`. Make sure your browser URL matches exactly.