# frontend

## Project setup
```
Clone the project, go to the backend folder and run: npm install 

You need to have postgres installed at your machine.
After that, create a database and configure the connection and the database name/password at your .env file;

Then you need to go to the migrations folder and run: knex migrate:last
so the tables needed for this project will be created.
```

### Compiles and hot-reloads for development
```
npm run start - nodemon will control the hot-reload for you
```

### Run code for production
```
npm run production
```