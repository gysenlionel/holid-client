# Holi'D
> Travel booking site. View your bookings, edit your profile.  
> Live demo [_here_](https://app.holid-server.xyz/). 

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
- Typescript
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
- Crud for edit your profile
- Search and select your booking (using redux to persist in session storage)
- Authentification with HTTP only cookie and refresh token
- Paid with Stripe and see success page
- Push images on cloudinary
- CI/CD using github action, jest (integration test), deployment on vercel (for the backend)
- Rollbar for error monitoring (for the backend)
- Swagger for api documentation

## Screenshots
figma: 

![figma](https://github.com/gysenlionel/holid-client/assets/90910874/9d947b09-34f1-43a2-9abc-0da795145add)

![figma2](https://github.com/gysenlionel/holid-client/assets/90910874/445356df-b477-48d1-80ec-f1668581436d)

website:

![website](https://github.com/gysenlionel/holid-client/assets/90910874/74de429d-32fa-4c83-80ea-aa8a46dd70ab)

![website2](https://github.com/gysenlionel/holid-client/assets/90910874/72a7ec1e-25f9-41ee-bf0b-1fbcb2cff8af)

mobile:

![mobile](https://github.com/gysenlionel/holid-client/assets/90910874/1066b71a-3ed0-48c9-9d0b-dde07f45dc41)

![mobile2](https://github.com/gysenlionel/holid-client/assets/90910874/7e55f023-b070-485b-a5b8-5cbe880d46e0)

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

