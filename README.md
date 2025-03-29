# Packaging Solution System

The **Packaging Solution System** is a Node.js-based application designed to recommend optimal packaging solutions for items. It provides suggestions for suitable boxes, packing materials, and estimated costs based on the dimensions, fragility, and quantity of the items.

## Features

- **Box Recommendation**: Suggests the best-fit boxes for given items.
- **Packing Materials**: Calculates the required packing materials (e.g., bubble wrap, packing peanuts).
- **Cost Estimation**: Provides an estimated cost for the packaging solution.
- **Swagger API Documentation**: Interactive API documentation available at `/api-docs`.

## Prerequisites

- **Node.js**: v16 or higher
- **MongoDB**: A running MongoDB instance
- **npm**: Installed with Node.js

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/amit8810/packaging_solution_system.git
   cd packaging_solution_system
   ```

2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up environment variables:
-   Copy the `sample.env file` to `.env.development`

    ```bash
    cp sample.env .env.development
    ```
-   Update the `.env.development` file with your MongoDB URI and database name.

4. Seed the database with sample data:
    ```bash
    npm run seed
    ```

## Usage
### Development Server
Start the development server:
```bash
npm run dev
```
The server will run at `http://localhost:3000`.

### API Documentation
Access the Swagger API documentation at:
```bash
http://localhost:3000/api-docs
```

### Build for Production
To build the project for production:
```bash
npm run build
```
Start the production server:
```bash
npm run start
```

### API Endpoints
`/api/packaging` (POST)
- **Description**: Get packaging suggestions for items.
- **Request Body**:
```javascript
{
  "items": [
    {
      "name": "Item 1",
      "length": 10,
      "width": 8,
      "height": 6,
      "quantity": 2,
      "fragility": "fragile"
    }
  ],
  "maxSuggestions": 3
}
```
- **Response**:
```javascript
{
  "message": "Box recommendation with estimate cost",
  "suggestions": [
    {
      "box": { "sku": "BX10001", "name": "Standard Box Small", ... },
      "itemsArrangement": [ ... ],
      "packing_materials": [ ... ],
      "material_cost": 5.0,
      "estimate_cost": 7.5,
      "fit_rating": "Standard Fit"
    }
  ]
}
```

## Scripts
- **`npm run dev`**: Start the development server.
- **`npm run build`**: Compile TypeScript to JavaScript.
- **`npm start`**: Start the production server.
- **`npm run lint`**: Run ESLint to check for code issues.
- **`npm run format`**: Format code using Prettier.
- **`npm run seed`**: Seed the database with sample data.

## Technologies Used
- **`Node.js`**: Backend runtime
- **`Express`**: Web framework
- **`TypeScript`**: Type-safe development
- **`MongoDB`**: Database
- **`Mongoose`**: MongoDB ORM
- **`Joi`**: Input validation
- **`Swagger`**: API documentation

### Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

### License
This project is licensed under the ISC License.








