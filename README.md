#### App does:
This is the backend for the PostAR app. It sets up the api flow that will allow the app to authenticate with the server, post location messages to save in database, and retrieve messages in a 200 meter radius.  It is deployed on Heroku, uses MongoDB for the database, and JWT for authentication.

#### Who worked on it:
The backend was worked on by Louie & Jessica for Milestone 2. The frontend was worked on by Louie & Mike & Tomas for Milestone 2.

#### Completed:
- Authentication route setup that verifies Firebase token and issues JWT token.
- Middleware for authentication check implemented to protect API routes
- Database model was updated to use GeoJSON for the posts which include a name, latitude, longitude, altitude and content of the message.
- API route added that allows client to request all data points within 200 meters of current location.

#### Known Problems:
- Code coverage in Jest is not robust
- JWT is unencrypted
