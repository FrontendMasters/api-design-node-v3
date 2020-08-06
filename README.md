# Course Code for [API design in Node.js with Express, v3](https://frontendmasters.com/courses/api-design-nodejs-v3/)
> Scott Moss & Frontend Masters

- [Resources](#resources)
- [Course](#course)
- [Exercises](#excercises)
  - [Hello world Express](#hello-world-express)
  - [Routing](#routing)
  - [Create Schemas](#create-schemas)
  - [Controllers](#controllers)
  - [Authentication](#authentication)
  - [Testing](#testing)

## Resources
* [Slides](https://slides.com/scotups/api-design-in-node-with-express-v3/)
* [Nodejs](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)

## Course
This course has two parts, slides and excercises. The slides describe the excerices in detail. Each excercise has a starting branch and solution branch. Example `lesson-1` and `lesson-1-solution`.
## Exercises
### Hello world Express
* branch - `lesson-1`

In this lesson you'll be creating a simple Express based API in node, just to get your feet wet.
- [ ] install dependencies with yarn (prefered for version locking) or npm
- [ ] create a route that sends back some json
- [ ] create a route that accepts json and logs it
- [ ] start the server

### Routing
* branch - `lesson-2`
* test command - `yarn test-routes` or `npm run test-routes`

This exercise will have you creating routes and sub routers for our soon the be DB resources using Express routing and routers
- [ ] create a router for the Item resource
- [ ] create full crud routes and create placeholder controllers
- [ ] mount router on the root server
- [ ] ensure all tests pass by running test command

### Create Schemas
* branch - `lesson-3`
* test command - `yarn test-models` or `npm run test-models`

In this exercise, you'll be taking what you learned about Mongoose and MongoDb to create a schema and model for the Item resource.

- [ ] create a schema for the item resource
- [ ] add the correct fields (look at test)
- [ ] add the correct validations (look at test)
- [ ] *extra* add compund index to ensure all tasks in a list have unique names
- [ ] ensure all tests pass by running test command

### Controllers
* branch - `lesson-4`
* test command - `yarn test-controllers` or `npm run test-controllers`

So far we have routes and models. Now we need to hook our routes up to our models so we can perfom CRUD on the models based on the routes + verbs. That's exactly what controllers do.

- [ ] create CRUD resolvers in `utils/crud.js`
- [ ] create controllers for the Item resources using the base crud resolvers
- [ ] ensure all tests pass by running test command

### Authentication
* branch - `lesson-5`
* test command - `yarn test-auth` or `npm run test-auth`

In this exercise you'll be locking down our API using JWT's.

- [ ] create a signup controller
- [ ] create a signin controller
- [ ] create a protect middlware to lock down API routes
- [ ] ensure all tests pass by running test command

### Testing
THe other resources don't have any test, go ahead and write some!
