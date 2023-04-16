
# Stan - Code Challenge

React/Typescript single-page application following guidelines and requirements.




## Run Locally

Clone the project

```bash
  gh repo clone danilopiovani/stan-challenge-app2
```

Go to the project directory

```bash
  cd stan-challenge-app2
```

Install dependencies

```bash
  npm install
```

Start the server to simulate an API

```bash
  npm run start-api
```

Start the server 

```bash
  npm run start
```


## Running Tests

To run tests, run the following command

```bash
  npm run test
```


## FAQ

#### How did you decide on the technical and architectural choices used as part of your solution?

As required I used React, TypeScript, Babel, and Webpack. 

For simulating an API, I chose to use json-server, a simple, lightweight tool for quickly setting up a mock REST API. This allowed me to test the application's functionality without having to build a full-fledged API backend.

To ensure code quality and prevent bugs, I used Jest as the testing framework for my application. It provides features such as test suites, assertions, and mocking, and has an easy-to-use syntax. I wrote unit tests for my components and integration tests for the application's functionality.

To organize the project's files, I used a folder structure with separate directories for components and pages to improve maintainability and scalability. The "public" directory contained static assets such as images, while the "src" directory contained the application's source code.

#### Are there any improvements you could make to your submission?

Yes, there are some improvements that I could make to my submission. Firstly, I would like to create a proper backend application with more endpoints. This would allow for more functionality and data to be available to the front-end application. Additionally, I would like to include Cypress in my testing framework to perform end-to-end testing of the application's functionality. This would help to ensure that the application works as intended from the user's perspective.

Another improvement that I would like to make is to have a better error boundary in place. This would allow for more graceful handling of errors and prevent the application from crashing when unexpected errors occur.

In regards to the code itself, I would like to make improvements to make it more responsive. This would involve using media queries and other techniques to ensure that the application works well on a variety of devices and screen sizes.

