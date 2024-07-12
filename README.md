# EasyMedicine

[Live Link](https://easy-medicine.vercel.app/)

```plaintext
admin-email: hosanulislam87@gmail.com
admin-password: 123456
```

This repository contains the code for a Next.js application with a backend powered by Prisma and PostgreSQL. The application includes user management, product management with pagination, and category-based product filtering.

## Note on File Uploads

File upload functionality will not work on Vercel but can be used in localhost.

## Environment Variables

Create a `.env` file in the root of the project with the following content:

```plaintext
DATABASE_URL="postgresql://postgres:jAVZUMJGZSfZXnqNItSiyBwtDzTjfIHt@roundhouse.proxy.rlwy.net:36736/railway"
NEXTAUTH_SECRET="Secret"
NEXT_PUBLIC_API_URL="https://easy-medicine.vercel.app"
```

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm (or yarn)
- PostgreSQL

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/GearHead87/easymedicine.git
    cd easymedicine
    ```

2. Install the dependencies:

    ```sh
    npm install
    # or
    yarn install
    ```

3. Set up the environment variables:
   Create a `.env` file in the root of the project with the following content:

    ```plaintext
    DATABASE_URL="postgresql://postgres:jAVZUMJGZSfZXnqNItSiyBwtDzTjfIHt@roundhouse.proxy.rlwy.net:36736/railway"
    NEXTAUTH_SECRET="Secret"
    NEXT_PUBLIC_API_URL="https://easy-medicine.vercel.app"
    ```

4. Run the database migrations:

    ```sh
    npx prisma migrate dev
    ```

5. Start the development server:

    ```sh
    npm run dev
    # or
    yarn dev
    ```

    The application should now be running at [http://localhost:3000](http://localhost:3000).

## Project Structure

- **api/**: Contains the API route handlers.
- **lib/**: Contains utility functions and Prisma setup.
- **components/**: Contains React components.
- **pages/**: Contains Next.js pages.
- **src/**: Contains application source code, including Redux services.

## Features

- User Management
- Product Management with Pagination
- Category-based Product Filtering

## API Routes

### Users

- `GET /api/users`: Fetch all users with optional pagination and filtering.
    - **Query Parameters**:
        - `page` (optional): The page number (default: 1).
        - `limit` (optional): The number of users per page (default: 10).
        - `search` (optional): A search term to filter users by name or email.

- `DELETE /api/users/[id]`: Delete a user by ID and their profile picture.
    - **Path Parameters**:
        - `id`: The ID of the user to delete.

### Products

- `GET /api/products`: Fetch all products with optional pagination and category filtering.
    - **Query Parameters**:
        - `page` (optional): The page number (default: 1).
        - `limit` (optional): The number of products per page (default: 10).
        - `categoryId` (optional): Filter products by category ID.

- `PATCH /api/products/[id]`: Update a product by ID.
    - **Path Parameters**:
        - `id`: The ID of the product to update.
    - **Body**:
        - `name`: The new name of the product.
        - `description`: The new description of the product.
        - `price`: The new price of the product.
        - `stock`: The new stock level of the product.
        - `categoryId`: The new category ID of the product.
        - `mgOptions`: The new variant options for the product.
        - `image`: The new image file for the product.

## License

This project is licensed under the MIT License.