# Form Builder

## Tech stack overview
App is using docker, so anyone should be able to run and try it within minutes. Simply clone the repository and run `docker-compose up`. Docker will create 3 services.
1. Client - Frontend app build with ReactJS.
2. API - Backend build with NodeJS and Express.
3. MongoDB instance to persist data.

There is no Nginx service or Dockerfiles for production, just to keep it simple.

## Frontend
Frontend is using `React-create-app` to quickly bootstrap app without the need to configure webpack or anything other that is outside of the scope of this test.

I'm also using the `ant.design` as a component library so it looks good but I did not leverage it's form components. That would be too easy :)

I didn't know if I can use `typescript` but again just to keep it simple I decided not to.

State is managed by `mobx` which is just a personal preference. I have no issues with using Redux :)

All the components are written as `functional/stateless components` with the state injected from mobx.

All the CSS is written with `styled components`.

## Backend
Backend is simple `ExpressJS` app running on `NodeJS`. As a data persistent layer it's using `mongoDB` and `mongoose` because it's fast and simple to work with. For a simplicity there is no authentication or authorisation involved. Production ready app would use JWT tokens.

Connection URL to the database is hardcoded, in prod ready app it would be stored in the environment.

## Quick Start Guide
* Clone the repository from GitHub
* Run `docker-compose up`
* Open `http://localhost:3000` in your browser

## What's missing
Tests. I hope I won't loose any points because of this, but 3 hours was not enough time to accomplish everything I wanted. Normally I would use  `Jest` for unit tests and snapshot testing and `Enzyme` for rendering of the components. Testing will be easy as I kept most of the components stateless.

The App is not responsive. I'm mostly using the `CSS Grid` so it would be pretty easy to add media queries and support multiple screen sizes. Or I could use the Grid component of ant.design

## Video
If you can't clone the project but would like to see the form builder here is short video

[![Youtube Video](https://img.youtube.com/vi/9_Vbqt-OiRg/0.jpg)](https://www.youtube.com/watch?v=9_Vbqt-OiRg)

## Usability
As you can see on the video, you can't submit any form data unless you save the form first. This is not very UX friendly solution and probably could be removed by automatic saving on change, but I wanted to showcase conditional rendering.