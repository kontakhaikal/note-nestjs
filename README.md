# **Simple Note API**

## **User**

- **Sign In**

  Method: **`POST`**

  Endpint: `"/users/signin"`

  Request Body:

  ```json
  {
    "username": "string",
    "firstName": "string",
    "lastName": "string",
    "password": "string"
  }
  ```

  Response Body:

  ```json
  {
    "code": 201,
    "status": "CREATED",
    "data": {
      "id": "string"
    }
  }
  ```

- **Login**

  Method: **`POST`**

  Endpint: `"/users/login"`

  Request Body:

  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```

  Response Body:

  ```json
  {
    "code": 200,
    "status": "OK",
    "data": {
      "credentialToken": "string"
    }
  }
  ```

## **Note**

- **Write note**

  Method: **`POST`**

  Endpint: `"/notes"`

  Headers:

  ```json
  {
    "Content-Type": "application/json",
    "Authorization": "Bearer ${credentialToken}"
  }
  ```

  Request Body:

  ```json
  {
    "title": "string",
    "body": "string"
  }
  ```

  Response Body:

  ```json
  {
    "code": 201,
    "status": "CREATED",
    "data": {
      "id": "string",
      "title": "string",
      "body": "string",
      "author": "string",
      "updatedAt": "timestamp",
      "createdAt": "timestamp"
    }
  }
  ```

- **Get notes by author**

  Method: **`GET`**

  Endpint: `"/notes"`

  Headers:

  ```json
  {
    "Content-Type": "application/json",
    "Authorization": "Bearer ${credentialToken}"
  }
  ```

  Response Body:

  ```json
  {
    "code": 200,
    "status": "OK",
    "data": [
      {
        "id": "string",
        "title": "string",
        "body": "string",
        "author": "string",
        "updatedAt": "timestamp",
        "createdAt": "timestamp"
      }
      {
        "id": "string",
        "title": "string",
        "body": "string",
        "author": "string",
        "updatedAt": "timestamp",
        "createdAt": "timestamp"
      }
    ]
  }
  ```

- **Delete note**

  Method: **`DELETE`**

  Endpint: `"/notes/{id}"`

  Headers:

  ```json
  {
    "Content-Type": "application/json",
    "Authorization": "Bearer ${credentialToken}"
  }
  ```

  Response Body:

  ```json
  {
    "code": 200,
    "status": "CREATED"
  }
  ```

- **Update note**

  Method: **`PUT`**

  Endpint: `"/notes/{id}"`

  Headers:

  ```json
  {
    "Content-Type": "application/json",
    "Authorization": "Bearer ${credentialToken}"
  }
  ```

  Request Body:

  ```json
  {
    "title": "string",
    "body": "string"
  }
  ```

  Response Body:

  ```json
  {
    "code": 200,
    "status": "OK",
    "data": {
      "id": "string",
      "title": "string",
      "body": "string",
      "author": "string",
      "updatedAt": "timestamp",
      "createdAt": "timestamp"
    }
  }
  ```
