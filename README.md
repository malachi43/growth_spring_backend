### GROWTH_SPRING

- Providing support for Micro,Small and Medium Enterprises (MSMEs) by providing tools for financial tracking, business education and networking opportunities to help you scale your business.

### Getting started

- clone the repo by running the command on your machine:

```sh
git clone https://github.com/malachi43/growth_spring_backend.git
```

- cd into the `growth_spring` directory or folder.
- run the below command afterwards to install the project dependencies.

```sh
npm install
```

- create a .env file in the `growth_spring` directory or folder and add the following env variables:

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

- ##### on hitting this endpoint, a verification email will be sent to the provided user email with a link to generate an OTP (One Time Password).

```javascript
using postman or any REST Client, hit the endpoint:
- Method: POST
- url: http://localhost:3000/auth/signup

- request structure:
{
    fullname: string,
    businessName: string,
    email: string,
    password: string
}

response structure:
 {
     "data": {
        "fullname": string,
        "email": string,
        "businessName": string
    },
    "message": string,
    "success": boolean
}
```

#### create-login-token endpoint

- ##### this endpoint generates a token to provide authorized access to protected route.

```javascript
using postman or any REST Client, hit the endpoint
- Method: POST
- url: http://localhost:3000/auth/create-login-token

- request structure:
{
    email: string,
    password: string,
    otp: number
}

response structure:
{
    "token": string,
    "data": {
        "fullname": string,
        "email": string,
        "businessName": string
    },
    "success": boolean,
    "message":string
}
```

#### forgot-password endpoint

- ##### this endpoint is used to provide an OTP(One Time Password) to reset your password.

```javascript
using postman or any REST Client, hit the endpoint
- Method: POST
- url: http://localhost:3000/auth//forgot-password

- request structure:
{
    email: string
}

response structure:
{
     "data": string,
    "message": string,
    "success": boolean
}
```

#### reset-password endpoint

- ##### this endpoint is used to reset your password to a new one.

```javascript
using postman or any REST Client, hit the endpoint
- Method: POST
- url: http://localhost:3000/auth//reset-password

- request structure:
{
    email: string,
    password: string,
    otp: number
}

response structure:
{
    "data": string,
    "message": string,
    "success": boolean
}
```
