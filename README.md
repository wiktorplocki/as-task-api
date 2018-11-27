# as-task-api
API for the clients and orders processing app

## Installation
````
yarn
yarn start
````

## Modules used
`express, mongoose, nodemon`

## Design philosophy
The project uses a MongoDB database as a service to achieve persistence of data as well as simplify the installation process for the end user(no need to have/install/manage a MongoDB server instance to run the app correctly). It also makes use of MongoDB references to link orders to clients similarly to SQL relations, as well as MongoDB Aggregation Framework to sum the amounts of all orders for a given client.
