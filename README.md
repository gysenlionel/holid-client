# Holi'D

> Travel booking site.Book your holidays, view your bookings, edit your profile.  
> Live demo [_here_](https://app.holid-server.xyz/).

## Table of Contents

- [General Info](#general-information)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Screenshots](#screenshots)
- [Setup](#setup)
- [Project Status](#project-status)
- [Room for Improvement](#room-for-improvement)

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
- Jest
- React testing library
- MSW

Backend: (other repo)

- Express.Js
- Typescript
- Mongoose
- MongoDb
- Cloudinary
- Jest
- Swagger
- Multer
- Stripe
- Rollbar
- ESLint
- Prettier

## Features

- Crud for edit your profile
- Search and select your booking (using redux to persist in session storage)
- Authentification with HTTP only cookie and refresh token
- Paid with Stripe and see success page
- Push images on cloudinary
- Unit and integration testing for the frontend (with mocks)
- CI/CD using github action, jest (integration test), deployment on vercel (for the backend)
- Rollbar for error monitoring (for the backend)
- Swagger for api documentation

## Screenshots

figma:

![figma](https://github.com/gysenlionel/holid-client/assets/90910874/9015a8d1-121d-4179-a3a2-7268ea2a9c43)

![figma2](https://github.com/gysenlionel/holid-client/assets/90910874/104f6d30-d447-498e-a2b2-253519f27378)

website:

![website](https://github.com/gysenlionel/holid-client/assets/90910874/9165b763-56a2-4d49-bcc0-8b31caddcb92)

![website2](https://github.com/gysenlionel/holid-client/assets/90910874/47283a09-9ed0-4056-bf8c-b1f74751e30c)

mobile:

![mobile](https://github.com/gysenlionel/holid-client/assets/90910874/de723a2d-db98-4167-9df1-e5a5e26ddaf5)

![mobile2](https://github.com/gysenlionel/holid-client/assets/90910874/59f12efb-5163-45a1-8dfa-98d88364800c)

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
- Creation of the CMS for the back office
