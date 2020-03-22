# RYSOLV API Structure

### Configuring the DB
RYSOLV uses a postgreSQL database and node pg to connect

Create a `.env` with the following inputs (matching your local db). Will be pulled in by `/db/connect.js`
* `DB_USER=user`
* `DB_PASSWORD=password`
* `DB_PORT=5432`
* `DB_HOST=localhost`
* `DB_NAME=rysolv`

To seed data - run `npm run seed`

#### Running with /graphql dev GUI
Set `graphiql: true,` in `/index.js` // will make .env for this later


### File Structure
* `index.js` - lanches web server and handles routing through /graphql
* `port.js` - set listening port
* `/db` - exports all db functions, schemas, connection pool, and seed data
* `/graphql` - holds `/resolvers` and `/schema`. Resolvers handles all logic

### Dependencies
* `"chalk": "^2.4.2"` // idk some logging thing
* `"express": "4.16.4"` // handles routing / listening
* `"express-graphql": "^0.9.0"` // direct all routes through /graphql
* `"graphql": "^14.6.0"`// handles incoming queries / mutations
* `"pg": "^7.18.2"` // Manages node postgres connection
* `"uuid": "^7.0.2"` // generate unique IDs - use V4
* `"minimist": "1.2.0"` // idk what this does
* `"dotenv": "^8.2.0"` // load env variables from .env

### Dev Dependencies
* "make-runnable": "^1.3.6" // may be removable
