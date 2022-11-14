# TodoList

## User Register

### Request

`POST /auth/register`

    curl -i -H 'Accept: application/json' -H 'Authorization: JWT <ACCESS_TOKEN>' -d 'name=Foo&email=email@gmail.com&password=password' http://localhost:3000/auth/register

### Response

    HTTP/1.1 201 Created
    Status: 201 Created
    Content-Type: application/json

    {
      "user": {
          "id": 2,
          "email": "deaamandha@yahoo.com",
          "name": "Dea Amandha"
      },
      "message": "Registration Success.",
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjY4NDA4NTYxLCJleHAiOjE2Njg0OTQ5NjF9.zPJoCxfybHY6c5kxc39LO7sNY5R_hLAQoqs8JSqQVro"
    }

## User Login

### Request

`POST /auth/login`

    curl -i -H 'Accept: application/json' -H 'Authorization: JWT <ACCESS_TOKEN>' -d 'email=email@gmail.com&password=password' http://localhost:3000/auth/login

### Response

    HTTP/1.1 200 Ok
    Status: 200 Ok
    Content-Type: application/json

    {
      "user": {
          "id": 2,
          "email": "deaamandha@yahoo.com",
          "name": "Dea Amandha"
      },
      "message": "Registration Success.",
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjY4NDA4NTYxLCJleHAiOjE2Njg0OTQ5NjF9.zPJoCxfybHY6c5kxc39LO7sNY5R_hLAQoqs8JSqQVro"
    }


## Get list of Todos

### Request

`GET /todos/`

    curl -i -H 'Accept: application/json' -H 'Authorization: JWT <ACCESS_TOKEN>' http://localhost:3000/todos/

### Response
    
    HTTP/1.1 200 Ok
    Status: 200 Ok
    Content-Type: application/json

    {
      "data": [
        {
          "id": 5,
          "title": "New Todo",
          "user_id": 1,
          "updated_at": "2022-11-14T07:07:35.693Z",
          "created_at": "2022-11-14T07:07:35.693Z"
        }
      ],
      "message": "Success Showing Data."
    }

## Create a new Todo

### Request

`POST /todos/`

    curl -i -H 'Accept: application/json' -H 'Authorization: JWT <ACCESS_TOKEN>' -d 'title=Foo' http://localhost:3000/todos

### Response
    
    HTTP/1.1 201 Created
    Status: 201 Created
    Content-Type: application/json

    {
      "data": {
          "id": 5,
          "title": "New Todo",
          "user_id": 1,
          "updated_at": "2022-11-14T07:07:35.693Z",
          "created_at": "2022-11-14T07:07:35.693Z"
      },
      "message": "Success Creating Data."
    }

## Get a specific Todo

### Request

`GET /todos/id`

    curl -i -H 'Accept: application/json' -H 'Authorization: JWT <ACCESS_TOKEN>' http://localhost:3000/todos/1

### Response

    HTTP/1.1 200 Ok
    Status: 200 Ok
    Content-Type: application/json

    {
      "data": {
          "id": 5,
          "title": "New Todo",
          "user_id": 1,
          "updated_at": "2022-11-14T07:07:35.693Z",
          "created_at": "2022-11-14T07:07:35.693Z"
      },
      "message": "Success Showing Data."
    }

## Update a specific Todo

### Request

`PATCH /thing/:id`

    curl -i -H 'Accept: application/json' -H 'Authorization: JWT <ACCESS_TOKEN>' -X PATCH -d 'title=Foo' http://localhost:3000/todos/1

### Response

    HTTP/1.1 200 Ok
    Status: 200 Ok
    Content-Type: application/json

    {
      "message": "Success Updating Data."
    }

## Delete a specific Todo

### Request

`DELETE /todos/id`

    curl -i -H 'Accept: application/json' -H 'Authorization: JWT <ACCESS_TOKEN>' -X DELETE http://localhost:3000/todos/1/

### Response

    HTTP/1.1 204 No Content
    Status: 204 No Content

## Delete All Todo

### Request

`DELETE /todos`

    curl -i -H 'Accept: application/json' -H 'Authorization: JWT <ACCESS_TOKEN>' -X DELETE http://localhost:3000/todos

### Response

    HTTP/1.1 204 No Content
    Status: 204 No Content