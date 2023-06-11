# **Simple Note API**

## **User**

- **Register**

  Method: **`POST`**

  Endpoint: `"/register"`

  Headers:

  ```json
  {
    "Content-Type": "application/json",
    "Accept-Language": "en | id"
  }
  ```

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

  Endpoint: `"/login"`

  Headers:

  ```json
  {
    "Content-Type": "application/json",
    "Accept-Language": "en | id"
  }
  ```

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

  Endpoint: `"/notes"`

  Headers:

  ```json
  {
    "Content-Type": "application/json",
    "Authorization": "Bearer ${credentialToken}",
    "Accept-Language": "id | en"
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

  Endpoint: `"/notes"`

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
      },
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

  Endpoint: `"/notes/{id}"`

  Headers:

  ```json
  {
    "Content-Type": "application/json",
    "Authorization": "Bearer ${credentialToken}",
    "Accept-Language": "id | en"
  }
  ```

  Response Body:

  ```json
  {
    "code": 200,
    "status": "OK"
  }
  ```

- **Update note**

  Method: **`PUT`**

  Endpoint: `"/notes/{id}"`

  Headers:

  ```json
  {
    "Content-Type": "application/json",
    "Authorization": "Bearer ${credentialToken}",
    "Accept-Language": "id | en"
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
