# GraphQL API for Guest Management

This project provides a GraphQL API to manage guests, including operations such as creating, deleting, and querying guest details. It also includes authentication for users, with login functionality using JWT (JSON Web Tokens).

## Features

- **Create Guest**: Add a new guest with details like name, phone number, and invitation status.
- **Delete Guest**: Remove a guest from the system by their ID.
- **Get All Guests**: Retrieve a list of all guests in the system.
- **Get Guest by ID**: Retrieve details of a specific guest using their ID.
- **Login**: Authenticate users and generate JWT tokens for secure access to the API.

## Installation

### Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (>= 14.x)
- npm (or yarn) for package management
- MongoDB (locally or via a cloud service like MongoDB Atlas)

### Steps to Run the Project

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/guest-management-api.git
   cd guest-management-api
