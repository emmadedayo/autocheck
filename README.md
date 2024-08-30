# AutoCheck Backend Assessment

## Overview
This project involves developing a backend API that supports Autochek's vehicle valuation and financing services. The main objectives are to handle vehicle data ingestion, integrate a valuation model to estimate vehicle values, and process loan applications with basic eligibility checks.
## Setup Instructions

### Prerequisites
Ensure you have the following installed on your local machine:

- Node.js (v18.x or later)
- npm (v7.x or later)
- TypeScript (v5.1.3 or later)

### Environment Configuration

1. **Clone the Repository:**

   ```bash
   $ git clone git@github.com:emmadedayo/autocheck.git
   $ cd autocheck
   ```

2. **Install Dependencies:**

   ```bash
   $ npm install
   ```

3. **Create a `.env` File:**

   Create a `.env` file in the root directory and include the following environment variables:

   ```
    PORT=4500
    RAPID_API=fbb074e003msh383a7f817ec2ac9p156b9cjsnb9abce11ab08
    JWT_SECRET=fbb074e003msh383a7f817ec2ac9p156b9cjsnb9abce11ab08
    JWT_EXPIRATION=100
    ENV=development
   ```
4. ** Run Migration:**

   ```bash
   $ npm run migration:run
   ```   

### Running the Application

1. **Start the Application:**

   ```bash
   # For development
   $ npm run start:dev 
   ```

2. **Access the API:**

   The API will be available at [http://localhost:4500](http://localhost:4500) after running the command above.


## API Endpoints
 You can download or run the apidogs collection from the link below to test the API endpoints
 https://apidog.com/apidoc/project-649685