# White Label Login

## What:
I have 1 BE but some user have multiple app depending on what they register so having a proper login that can deliver the proper app to the user without leaking the information of other client/apps is essential.

## How:
- EC2 build with nodemon
- Node / Express
- Server side Render of React for initial Login (fast & flexible).
- JWT for Token auth.
- Serve the proper app after login.
Extra: Options to use passport to find their login. ?

## Essential:
- Error log handling:
- Linting / Testing
- Build pipeline: Travis/Jenkin
