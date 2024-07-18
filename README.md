
# To-Do-Hub
## Getting started

### 1. Clone this Repository

Clone this repository using:

```
git clone https://github.com/ishitananda3/To-do-hub-using-nextjs.git
```

### 2. Download and install dependencies

Install all npm dependencies::

```
npm i
```

### 3. Prisma Installation

Install prisma::

```
🔗 https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
```

### 4. Prisma Setup

Initial Prisma Setup Guide:
- Generate Prisma Client with the following command:
```
npx prisma generate
```
- Next, set up your Prisma ORM project by creating your Prisma schema file with the following command:
```
npx prisma init
```
- Run Prisma Studio, a visual editor for database data:
```
npx prisma studio
```
- Whenever you make changes in Prisma schema run the following command:
```
npx prisma db push
```
###
**DATABASE_URL:**
- Enter your database URL which is generally in the form of
```
"postgres://YourUserName:YourPassword@YourHostname:5432/YourDatabaseName"
```

**NEXTAUTH_URL:** generaly in the form of http://localhost:portnumber/ 


###  Run the App

Run this App using::
```
cd app
npm run dev
```

The app is now running, navigate to http://localhost:3000/auth/login in your browser to explore its UI.


