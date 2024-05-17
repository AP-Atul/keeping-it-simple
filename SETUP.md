## Setup

1. Download postgres

   - For mac, use [postgresapp](https://postgresapp.com/)
   - For linux, and other follow [here](https://www.postgresql.org/download/)

2. Install node 18, use [nvm](https://github.com/nvm-sh/nvm)

   - `nvm install 18`

3. Run the setup script

   - `npm run setup`
   - this script will create database, run migrations, and setup `.env`
   - it will also seed the database
   - will also create `.env` for web

4. Starting the backend and frontend

   - `npm run start`

5. To run tests

   - `npm run test`

- Swagger documentation will be live [here](http://localhost:4000/documentation) (4000 port)
- Web will be live [here](http://localhost:5173/) (5173 port)
