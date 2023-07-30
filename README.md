# Project Name
> Travel booking site. View your bookings, edit your profile.  
> Live demo [_here_](https://staging.client.holid-server.xyz/). 

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Screenshots](#screenshots)
* [Setup](#setup)
* [Project Status](#project-status)
* [Room for Improvement](#room-for-improvement)

## General Information
I based the design and features on Booking. I first made a mockup on figma. 
Then I implemented them in Next.js. 
Authentication is custom on the frontend and backend.
## Technologies Used
Frontend:
- Next.JS 13
- TailwindCss
- Redux Toolkit
- Stripe

Backend: (other repo)
- Express.Js
- Mongoose
- MongoDb
- Cloudinary
- Jest
- Swagger
- Multer
- Stripe
- Rollbar
## Features
List the ready features here:
- Crud for edit your profile
- Search and select your booking (using redux to persist in session storage)
- Authentification with HTTP only cookie and refresh token
- Paid with Stripe and see success page
- Push images on cloudinary
- CI/CD using github action, jest (integration test), deployment on vercel (for the backend)
- Rollbar for error monitoring (for the backend)
- Swagger for api documentation

## Screenshots

## Setup
To install the dependencies:

```
npm install
```
Add the .env and run the backend.
To run app:

```
npm run dev
```

## Project Status
Project is: _in progress_ 

## Room for Improvement

To do:
- Image optimisation
- lighthouse optimisation
- Using a skeleton
- Creating a loader
- Creating a 404 page
- Add newsletter, favourites, Forgot password
- Unit and integration testing for the frontend (CI)
- Creation of the CMS for the back office

