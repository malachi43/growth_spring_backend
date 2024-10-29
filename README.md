### GROWTH_SPRING 
- Providing support for Micro,Small and Medium Enterprises (MSMEs) by providing tools for financial tracking, business education and networking opportunities to help you scale your business.

### Getting started
- clone the repo by running the command on your machine:

```sh
git clone https://github.com/malachi43/growth_spring_backend.git 
```
- cd into the ```growth_spring``` directory or folder.
- run the below command afterwards to install the project dependencies.

```sh
npm install
```
- create a .env file in the ```growth_spring``` directory or folder and add the following env variables:

```javascript
# for development
MONGO_URL_DEV="mongodb://localhost:27017/<database-name>"

#for production
MONGO_URL=<connection-string>
```

### Testing the endpoints
- run the command to start the server.

```javascript
node index.js
```
#### signup endpoint

```javascript
using postman or any REST Client, hit the endpoint:
- Method: POST 
- url: http://localhost:3000/auth/signup 
- payload structure: 
{
    fullname: string,
    businessName: string,
    email: string,
    password: string
}
```
#### signin endpoint

```javascript
using postman or any REST Client, hit the endpoint 
- Method: POST 
- url: http://localhost:3000/auth/signin 
- payload structure:
{
    email: string,
    password: string
}
```
