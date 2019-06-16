# White Label Login

## Why Another login page?
I need to have 1 login page for multiple app. So User A can see App_A without leaking data about App_B. Depending on the permission of the user he can login & see his own app. This could be needed if we have multiple client under a single platform.

## App flow:
The React Login page is build & compile via Webpack & put inside the dist file.
The Server is run "as is" via nodemon & when the URL is hit it send the compiled login page. 

## How to start
Use node LTS(v10.16.0 as of now)
$ npm install
$ npm test


## Technology:
- EC2 running nodemon to handle Node (LTS).
- Node / Express for Auth check.
- Server side Render of React for initial Login (fast & flexible).
- JWT for Token auth.
- Serve the proper app after login.
Extra: Options to use passport to find their login. ?

## Essential:
- Error log handling:
- Linting: (esLint:AirBnB )
- Unit Testing: Mocha / Chai / Supertest
- ete Testing: Selenium on JS.
- Build pipeline: Travis or Jenkin

## Consequence:
This kind of single login is bad if the user want to have access to multiple different application, but it is not my case so far.
