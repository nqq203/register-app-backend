# REGISTER APP BACKEND

## Run app in local
### 1. Clone github repository:
```bash
git clone https://github.com/nqq203/register-app-backend
```

### 2.Create an .env file with these contain in root folder
```bash
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
PGADMIN_DEFAULT_EMAIL=
PGADMIN_DEFAULT_PASSWORD=
TYPEORM_SYNC=true
```

### 3. Install dependencies
```bash
npm install
```

### 4. Initialize databse and dummy data
```bash
cd ./db
psql -U postgres -f init_db.sql
--- Enter your postgres pgAdmin password
node ./data_insertion.js
--- Insert data with encrypt password
```

### 5. Run project locally 
```bash
npm run start
```

## Run app local using docker container
- Open docker desktop for windows or start docker in linux
- Change the DB_HOST in .env into "db". Example: DB_HOST=db
```bash
docker-compose up -d --build
```

## Public hosting:


## Self-Evaluation: 
| Category              | Criteria             | Points |
|-----------------------|----------------------|--------|
| **Backend Implementation** |                      |        |
|                       | API Endpoints        | 2      |
|                       | Error Handling       | 2      |
| **Frontend Implementation** |                     |        |
|                       | Routing              | 1      |
|                       | API Integration      | 2      |
|                       | User Experience      | 2      |
| **Deployment**          | Public Host Deployment | 1      |

### Total Points: 10

**Notes**:
- *API Endpoints*: Implementation of RESTful API.
- *Error Handling*: Proper error responses and status codes.
- *Routing*: Navigation between different views.
- *API Integration*: Interaction with the backend services.
- *User Experience*: Usability and aesthetic of the interface.
- *Public Host Deployment*: Deployment on a publicly accessible platform.
