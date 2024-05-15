# initial db setup; used by local
echo "

create user kis with password 'kis1234';
drop database if exists kis_backend;
drop database if exists kis_backend_test;
create database kis_backend owner kis;
create database kis_backend_test owner kis;

" >> setup_db.sql
psql -U postgres -f setup_db.sql

# remove generated file
rm setup_db.sql

# run all migrations
npm run db:migrate
