# Project Overview: Finance Dashboard System (FDS)
This project is a full-stack backend build for a Finance Dashboard System. I built it to help different types of users manage money and see their spending habits in a clean way. The system uses the MERN stack (well, the Node, Express, and MongoDB parts) and focuses heavily on how data is structured and secured.

# What the System Does
I designed this with three specific user roles in mind because in real apps, not everyone should see everything.

-> Viewers: These are standard users. They can login, see their own dashboard, and check their past transactions.

-> Analysts: They have a bit more power. They can look at all the transactions in the system to find trends, but they can't delete or change anything.

-> Admins: The "boss" role. Admins can create new users, update profiles, and manage every single transaction record.

# Technical Highlights
-> Secure Auth: I used JWT (JSON Web Tokens) for keeping users logged in and Bcrypt to hash passwords, so even if the database is leaked, the passwords are safe.

-> Advanced Analytics: Instead of doing math in the JavaScript code, I used MongoDB Aggregation Pipelines with $facet and $lookup. This makes the dashboard super fast because the database calculates totals (Income, Expense, Balance) and categories all at once.

-> Role-Based Access (RBAC): I wrote custom middleware to check if a user is an Admin or Analyst before letting them touch sensitive routes.

 -> Clean API: All the responses follow a standard JSON format, and I implemented Pagination (Skip and Limit) so the frontend doesn't get overwhelmed if there's thousands of records.

# The Setup (How to run it)
Clone the repo and run npm install.

Setup your .env file with variables PORT (for port_number), DB_CONN_STRING (for mongodb_uri) and JWT_SECRET_KEY.

Run npm start and the server will connect to the database.

Use Postman or a frontend to start making requests!
