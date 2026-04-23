## Built With
- Express.js
- Node.js
- Postgres

## Project Structure
- `config` - Set up database connection
- `middleware/auth.js` - client/server authentication
- `routes/auth.js` - Sets up the /register and /login functionality etc
- `server.js` - defines server connection

## Dependencies
- **Node** – Provides runtime environment 
- **Express** – Handles routing and middlware
- **Postgres** – database was created with Postgres
- **CORS, cookie-parser, axios** - handle communication & security

## Requirements for database
- pg Admin is required to create the database (download postgres for your OS)
- gitignore has a hidden .env file containing the following
- after copying everything locally, add the .env file to /backend

PORT = 5000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=
DB_NAME=
DB_PASSWORD=
JWT_SECRET=
CLIENT_URL=http://localhost:5173

when creating a new database you will be required to provide a password (remember it and input it in the .env file)
username is the same as your database username (default is postgres)
name is whatever you named the database
to create your json web token (jwt_secret) run:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'));" 

- you can technically only run the database once, then it will exist persistently
- if you want to recreate the database right click on the database name and press 'drop' or 'drop force' 
- dropping the database will remove all data previously stored so proceed with caution
- to see what is currently in the database run:
select * from whatever_table_you_want
currently the only data in the database by default is the student role

## Getting started
----------------------
Frondend and backend are their own independent directories
cd into both of them and run 'npm run dev' on both dirs (will get cors error if you dont do this)
Ensure that database has been created

