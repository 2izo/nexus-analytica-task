# User Management API

This API provides functionalities for managing user data. It includes endpoints for loading, filtering, aggregating, sorting, and searching user information.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [Visual Studio](https://visualstudio.microsoft.com/) or any preferred IDE for .NET development

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/2izo/nexus-analytica.git
    cd nexus-analytica
    ```

2. Install dependencies:

    ```bash
    dotnet restore
    ```

3. Run the application:

    ```bash
    dotnet run
    ```

4. The API should be running at `https://localhost:7092/user`.

## API Endpoints

### GET /user

Retrieve a list of users with optional filtering, sorting, and searching.

**Query Parameters:**
- `name`: Filter users by name
- `age`: Filter users by age.
- `active`: Filter users by active status (`true` or `false`).
- `sortBy`: Sort users by a specific criteria (e.g., `lastlogin`, `active`, `name`, `age`).
- `searchName`: Search users by name (case-insensitive, exact match not required).

**Example Request:**

```bash
curl -X GET "https://localhost:7092/user?age=30&active=true&sortBy=lastlogin&searchName=John".
```


# User Management Frontend

This React application consumes the User Management API to display and filter user information. It provides a user-friendly interface to interact with the backend API.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/2izo/nexus-analytica.git
    cd nexus-analytica/frontend/react
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the application:

    ```bash
    npm start
    ```

4. The application should be running at `http://localhost:3000`.

## Usage
1. Open your browser and go to `http://localhost:3000`.
2. The application will load the list of users from the User Management API.
3. Use the provided input fields to filter users based on age, active status, sorting criteria, and search by name.
4. Click the "Filter Users" button to apply the specified criteria and update the user list.


## Docker Compose Commands

If you want to run on docker

- Build and start containers:
  ```bash
  docker-compose up --build