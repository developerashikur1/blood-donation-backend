# Freedom Footwear (Shoes Management Dashboard)

This is the documentation for the Service component of the Freedom Footwear System. The The Freedom footwear currently provides an user role. It is built using TypeScript, Express.js, Zod validation, MongoDB and Mongoose.

## Functional Requirements

### user

- user can login and log out.

### Shoes Management

- User can add a pair of shoes.
- User can delete exiting shoes from the inventory.
- User can update shoe details.
- User can read and view the list of shoes in the inventory. 
- User can filter narrow down shoe selections based on various criteria.
- User can have bulk delete product options.
- User can duplicate product.

### Sales Management:

- User able to sell product on clicking sell button.
- User have to fillup some inputs to sell shoes.

### Sales History:

- User will able to see the product history.
- User can see product history based on daily, weekly, monthly, yearly, categorized.


## API Endpoints

### User

- `POST /users/create-user`
- `GET /users`
- `POST /users/create-admin`

### Auth

- `POST /auth/login`
- `POST /auth/logout`

### Products Management

- `GET /products`
- `GET /faculties?searchTerm=john`
- `GET /faculties?page=1&limit=10&sortBy=gender&sortOrder=asc`
- `POST /products/create-product`
- `PATCH /products/:id`
- `DELETE /products/:id`
# blood-donation-frontend
