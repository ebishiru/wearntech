# API Documentation

## Endpoints Overview

| URL                    | Method | Description                                                    |
| ---------------------- | ------ | -------------------------------------------------------------- |
| `"/items"`             | `GET`  | Returns an array with all the items and their properties       |
| `"/item/:itemId"`             | `GET`  | Returns an object  with the item and its properties       |
| `"/companies"`             | `GET`  | Returns an array with all the companies and their properties       |
| `"/company/:companyId"`             | `GET`  | Returns an object  with the company and its properties       |
| `"/cart/:cartId"`             | `GET`  | Returns an object containing an array of items      |
| `""/order/:orderId/receipt""`             | `GET`  | Returns an object containing an array of items that was purchased|
| `"/cart/:cartId/:itemId"`             | `POST`  | Returns an order object containing the `cartId` and an items array      |
| `"/cart/:cartId"`             | `DELETE`  | Removes all the items from the cart|
| `"/cart/:cartId/:itemId"`             | `DELETE`  | Removes one item from the cart|
| `"/cart/:cartId"`             | `POST`  | Removes one item from the cart|
| `"/cart/:cartId"`             | `PATCH`  | Changes the `numInStock` for the item|
| `"/signUp"`             | `POST`  | Sign-up users to the website |
| `"/logIn"`             | `POST`  | Sign-in users to the website|
---

## Responses Overview

Each of these endpoints will return an object. What it contains depends on if it succeeded or failed.

If there is an issue, the response object will contain a status and a message.

```js
{
  "status": >=400,
  "message": "...",
}
```

If the server was successful, there will always be a status in the object, but any other key values pairings will depend on the endpoint.

---

## Endpoint Details

### "/items" (GET)

On success
```js
{
  "status": 200,
  "data": [...],
}
```

The `data` array with all the items and their proprieties.

Unsuccessful status codes: 404, 500.

---

### "/item/:itemId" (GET)

On success
```js
{
  "status": 200,
  "data": {...},
}
```

The `data` object will have keys: `_id`, `name`, `price`, `body_location`, `category`, `imageSrc`, `numInStock`, and `companyId`.

Unsuccessful status codes: 404, 500.

---

### "/companies" (GET)

On success
```js
{
  "status": 200,
  "data": [...],
}
```

The `data` array will have all the compagnies

Unsuccessful status codes: 404, 500.

---

### "/company/:companyId" (GET)

On success
```js
{
  "status": 200,
  "data": {...},
}
```

The `data` object will have key: `_id`, `name`, `url` and `country`

Unsuccessful status codes: 404, 500.

---

### "/cart/:cartId" (GET)

On success
```js
{
  "status": 200,
  "data": {...},
}
```

The `data` object will have key: `_id`, `cartid` and `items`

Unsuccessful status codes: 400, 404, 500.

---

### "/order/:orderId/receipt" (Get)

on success
```js
{
  "status": 200,
  "data": {...},
}
```

The data object will have keys: _id, cartId, and items.

Unsuccessful status codes: 400, 404, 500.

---

### "/cart/:cartId/:itemId" (POST)

On success
```js
{
  "status": 201,
  "data": {...},
}
```

The `data` object will have key: `_id`, `cartid` and `items`

Unsuccessful status codes: 400, 404, 408 500.

---

### "/cart/:cartId" (DELETE)

On success
```js
{
  "status": 200,
  "data": {...},
}
```

Unsuccessful status codes: 404, 409, 500.

---

### "/cart/:cartId/:itemId" (DELETE)

On success
```js
{
  "status": 200,
  "data": {...},
}
```

Unsuccessful status codes: 400, 404, 409, 500.

---

### "/cart/:cartId" (POST)

On success
```js
{
  "status": 200,
  "data": {...},
}
```

Unsuccessful status codes: 500, 502.

---

### "/cart/:cartId" (PATCH)

On success
```js
{
  "status": 202,
  "message": "Inventory successfully updated.",
}
```

Unsuccessful status codes: 400, 404, 502.

---

### "/signUp" (POST)

On success
```js
{
  "status": 201,
  "message": "User created successfully.",
}
```

Unsuccessful status codes: 400, 409, 500, 502.

---

### "/logIn" (POST)

On success
```js
{
  "status": 201,
  "message": "Login successful.",
}
```

Unsuccessful status codes: 400, 502.

---