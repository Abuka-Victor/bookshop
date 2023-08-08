# E-Commerce Bookshop Store

Welcome to the E-Commerce Bookshop Store, an online platform built using Node.js, Express, and EJS that allows users to browse and purchase a wide range of books - that's the goal

## Features

-   Browse and search for books by title, author, genre, and more. (Not yet implemented)
-   View detailed book information, including descriptions and prices.
-   Add books to the shopping cart.
-   Proceed to checkout and complete the purchase. (Not yet implemented)
-   User authentication and account management. (Not yet implemented)

## Installation

1. Clone this repository:

    ```
    git clone https://github.com/Abuka-Victor/bookshop.git
    ```

2. Install the required dependencies:

    ```
    cd bookshop
    npm install
    ```

3. Create a `.env` file in the root directory with the following environment variables:

    ```
    PORT=3000
    DATABASE_URL=mongodb://localhost/bookshop
    SECRET_KEY=your-secret-key
    ```

4. Start the application:

    ```
    npm start
    ```

5. Open your browser and navigate to `http://localhost:3000` to access the app.

## Technologies Used

-   Node.js
-   Express
-   EJS (Embedded JavaScript)
-   MongoDB (for data storage) (Not yet implemented)
-   Passport.js (for authentication) (Not yet implemented)

## Project Structure

-   `app.js`: The main entry point of the application.
-   `config/`: Configuration files for Passport and MongoDB. (Not yet implemented)
-   `controllers/`: Controllers handling various routes and business logic.
-   `models/`: Mongoose models for database schema.
-   `public/`: Static assets such as stylesheets and client-side JavaScript.
-   `views/`: EJS templates for rendering HTML.
-   `routes/`: Express route definitions.
-   `middlewares/`: Custom middleware functions. (Not yet implemented)

## Contributing

Contributions are welcome! If you find a bug or have a suggestion, please create an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For inquiries, feel free to contact me

---

Thank you for checking out my project! I hope you enjoy exploring and using the application.
