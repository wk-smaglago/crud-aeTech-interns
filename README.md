# Products API Documentation

This documentation provides details on how to interact with the Products API endpoints.

## Base URL

```
/api/products
```

## Endpoints

### Get All Products

Retrieve a list of all available products.

- **URL**: `/api/products`
- **Method**: `GET`
- **Success Response**:
  - **Code**: 200 OK
  - **Content Example**:
    ```json
    [
      {
        "id": "1",
        "name": "Product 1",
        "description": "Description for product 1",
        "price": 19.99,
        "stock": 100
      },
      {
        "id": "2",
        "name": "Product 2",
        "description": "Description for product 2",
        "price": 29.99,
        "stock": 50
      }
    ]
    ```

### Create a New Product

Add a new product to the database.

- **URL**: `/api/products`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "name": "New Product",
    "description": "Description for new product",
    "price": 39.99,
    "stock": 75
  }
  ```
- **Required Fields**: `name`, `price`
- **Optional Fields**: `description`, `stock`
- **Success Response**:
  - **Code**: 201 Created
  - **Content Example**:
    ```json
    {
      "id": "1621532743123",
      "name": "New Product",
      "description": "Description for new product",
      "price": 39.99,
      "stock": 75
    }
    ```
- **Error Responses**:
  - **Code**: 400 Bad Request
    ```json
    {
      "error": "Name and price are required fields"
    }
    ```
  - **Code**: 500 Internal Server Error
    ```json
    {
      "error": "Failed to create product"
    }
    ```

### Get a Single Product

Retrieve details for a specific product by ID.

- **URL**: `/api/products/:id`
- **Method**: `GET`
- **URL Parameters**: `id=[string]` (required)
- **Success Response**:
  - **Code**: 200 OK
  - **Content Example**:
    ```json
    {
      "id": "1",
      "name": "Product 1",
      "description": "Description for product 1",
      "price": 19.99,
      "stock": 100
    }
    ```
- **Error Response**:
  - **Code**: 404 Not Found
    ```json
    {
      "error": "Product not found"
    }
    ```

### Update a Product (Full Update)

Replace all product details with the provided data.

- **URL**: `/api/products/:id`
- **Method**: `PUT`
- **URL Parameters**: `id=[string]` (required)
- **Request Body**:
  ```json
  {
    "name": "Updated Product",
    "description": "Updated description",
    "price": 49.99,
    "stock": 200
  }
  ```
- **Success Response**:
  - **Code**: 200 OK
  - **Content Example**:
    ```json
    {
      "id": "1",
      "name": "Updated Product",
      "description": "Updated description",
      "price": 49.99,
      "stock": 200
    }
    ```
- **Error Responses**:
  - **Code**: 404 Not Found
    ```json
    {
      "error": "Product not found"
    }
    ```
  - **Code**: 500 Internal Server Error
    ```json
    {
      "error": "Failed to update product"
    }
    ```

### Update a Product (Partial Update)

Update only specific fields of a product.

- **URL**: `/api/products/:id`
- **Method**: `PATCH`
- **URL Parameters**: `id=[string]` (required)
- **Request Body Example** (update only price and stock):
  ```json
  {
    "price": 59.99,
    "stock": 150
  }
  ```
- **Success Response**:
  - **Code**: 200 OK
  - **Content Example**:
    ```json
    {
      "id": "1",
      "name": "Product 1",
      "description": "Description for product 1",
      "price": 59.99,
      "stock": 150
    }
    ```
- **Error Responses**:
  - **Code**: 404 Not Found
    ```json
    {
      "error": "Product not found"
    }
    ```
  - **Code**: 500 Internal Server Error
    ```json
    {
      "error": "Failed to update product"
    }
    ```

### Delete a Product

Remove a product from the database.

- **URL**: `/api/products/:id`
- **Method**: `DELETE`
- **URL Parameters**: `id=[string]` (required)
- **Success Response**:
  - **Code**: 200 OK
  - **Content Example**:
    ```json
    {
      "message": "Product deleted successfully",
      "deletedProduct": {
        "id": "1",
        "name": "Product 1",
        "description": "Description for product 1",
        "price": 19.99,
        "stock": 100
      }
    }
    ```
- **Error Response**:
  - **Code**: 404 Not Found
    ```json
    {
      "error": "Product not found"
    }
    ```

## Product Schema

| Field       | Type   | Description                       | Required |
|-------------|--------|-----------------------------------|----------|
| id          | string | Unique identifier for the product | Yes      |
| name        | string | Name of the product              | Yes      |
| description | string | Description of the product       | No       |
| price       | number | Price of the product             | Yes      |
| stock       | number | Available quantity of the product | No       |

## Notes

- This API uses an in-memory data store. Data will be reset when the server restarts.
- All requests with a body should use the `application/json` content type.
- ID values are automatically generated for new products.