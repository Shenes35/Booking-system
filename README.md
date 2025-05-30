# Flight Booking System

## Project Overview
The Flight Booking System is a comprehensive application designed to manage flights, passengers, and booking statuses efficiently. It demonstrates core concepts of object-oriented programming (OOP) including struct vs class, data abstraction, encapsulation, inheritance, operator overloading, virtual functions, pointers, arrays, and file handling. The system uses Oracle Database for persistent storage and a React frontend for an interactive user interface.

## Technologies Used

- **Backend:** C++ (OOP concepts, Oracle database integration via OCCI)
- **Database:** Oracle Database Express Edition (XE)
- **Frontend:** React.js
- **Version Control:** GitHub

## Features

- Flight, passenger, and booking management
- Multi-level inheritance with class hierarchies
- Operator and function overloading
- Virtual functions and dynamic binding
- Pointer and array manipulation
- File input/output for data persistence
- Oracle Database integration for reliable data storage
- Interactive React frontend for user-friendly booking experience

## Project Structure

```

FlightBookingSystem/
├── backend/           # C++ source code for business logic and Oracle integration
├── frontend/          # React application source code
├── db/                # Oracle SQL scripts for schema and sample data
├── docs/              # Documentation, UML diagrams, API specifications
├── tests/             # Test cases for backend and frontend components
├── README.md          # Project overview and instructions
├── .gitignore         # Files to be ignored by Git

```

## Setup Instructions

### Prerequisites

- Install Oracle Database Express Edition (XE)
- Install Oracle Instant Client and OCCI libraries for C++ Oracle connectivity
- Install Node.js and npm (for React frontend)
- C++ compiler (g++, Visual Studio, or equivalent)
- Git (for version control)

### Database Setup

1. Create the Oracle schema and tables by running the SQL scripts in the `/db` folder.
2. Populate the database with sample data using provided scripts or manual inserts.

### Backend Setup

1. Navigate to `/backend`
2. Compile the C++ source code using your preferred compiler, ensuring Oracle OCCI libraries are linked.
3. Configure database connection settings (username, password, connection string) in the backend source code.
4. Run the backend application.

### Frontend Setup

1. Navigate to `/frontend`
2. Run `npm install` to install dependencies.
3. Run `npm start` to launch the React development server.
4. The frontend will connect to the backend API to perform flight and booking operations.

## Usage

- Use the React frontend to search for flights, manage bookings, and view passenger details.
- The backend handles business logic, database interaction, and data validation.
- All data is persisted in the Oracle database ensuring reliability.

## Notes

- Ensure Oracle Database and backend server are running before starting the frontend.
- Modify configuration files as necessary for environment-specific settings.
- The project includes comprehensive demonstrations of advanced OOP concepts through practical implementations.

## Contact

For any questions or support, please open an issue on this repository.

Thank you for exploring the Flight Booking System project!

