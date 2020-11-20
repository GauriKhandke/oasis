# Oasis

## Table of Contents
  - [Oasis](#oasis)
  - [Table of Contents](#table-of-contents)
  - [Goal](#goal)
  - [Motivation](#motivation)
  - [Installation](#how-to-start-the-app-locally)
  - [React Components](#React-Components-Used)
  - [Demo](#demo)
  - [Contributors](#contributors)

# Goal

To provide an Online journal experience that allows both young and young at heart to write their thoughts, feelings and emotions into a safe, secure and fun journal app. 


# Motivation

It is more important than ever to cultivate self care and self awareness. Studies show that bringing your thoughts, ideas, emotions, feelings and putting into words can help self reflection and get rid of negativity, thus bringing gratitude and peace of mind.

## How to Start the App Locally

1. Fork the [repo](https://github.com/GauriKhandke/oasis).

2. Clone the repo to your local machine.

3. On your local repo, run `npm install` for npm packages. This should install node modules within the server and the client folder. After both installations complete, run the following command in your terminal:

4. Create a  file titled `.env` in the root folder. Inside it, you will include your authentication key.


```
npm start
```
Your app should now be running on <http://localhost:3000>. The Express server should intercept any AJAX requests from the client.

## React Components Used :

### [React](https://reactjs.org/):
* React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.

### [Express](https://www.npmjs.com/package/expres)
* Express is a minimal and flexible Node.js web application framework that provides a robust set of features to develop web and mobile applications. It facilitates the rapid development of Node based Web applications.

### [Moment](https://www.npmjs.com/package/react-moment) : 
* React component for the moment date library.

### [MongoDB](https://www.mongodb.com/):
* MongoDB is a general purpose, document-based, distributed database built for modern application developers and for the cloud era.

### [Validator](https://www.npmjs.com/package/react-validation):
* Component to provide simple form validation for React components. It uses the Controlled Components approach for validation.
* It is not easy to validate forms with React. The reason is a one-way data flow style. In this case we can't affect forms from the inputs in an easy way. React-validation provides several components which are 'connected' to the form via the input's method attached by the Form component.

### [BCRYPT](https://www.npmjs.com/package/bcrypt):
* A library to help you hash passwords.

### [JSON Web Token](https://www.npmjs.com/package/jsonwebtoken):
* JSON Web Token (JWT) is a compact, URL-safe means of representing claims to be transferred between two parties.  The claims in a JWT are encoded as a JSON object that is used as the payload of a JSON. Web Signature (JWS) structure or as the plaintext of a JSON Web Encryption (JWE) structure, enabling the claims to be digitally signed or integrity protected with a Message Authentication Code (MAC) and/or encrypted.

# Demo : 

![Oasis](images/oasis.gif)


# Screenshots : 

|Medium Devices/ Laptop|Small Devices/ Tablet|Extra Small Devices/Phone
|--|--|--
|![Laptop](images/laptop-img.png)|![Tablet](images/tab.png)|![Mobile](images/mobile.png)

## Deployment (Heroku)

To deploy, simply add and commit your changes, and push to Heroku. As is, the NPM scripts should take care of the rest.

# Contributors: 
* [Gauri Khandke](https://github.com/GauriKhandke)
* [Pratyusha Raghupatruni](https://github.com/PratyushaRaghupatruni)
* [Daniel Balderas Hafertepen](https://github.com/danybb2020)
* [Brandon Johnson](https://github.com/sheikb08)
* [Robeil Aregawi](https://github.com/Robeil)
