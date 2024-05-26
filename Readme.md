## Requirements

1. make sure you have postgres sql database installed in your system
2. make sure you have nodejs installed in your system

### Server Setup

- clone the git repo
- run `npm install` command in the server directory to install required dependencies.

- after installing dependencies run the command
  `npx prisma init` to intialize prisma

- open the .env file and ovveride it with these variables

```
DATABASE_URL="postgresql://[username]:[password]@localhost:5432/pm3255_history?schema=public"
PORT=4000
```

-> change [username] to your postgresSQL username by default it is postgres
-> change [password] to you postgresSQL password

- navigate to prisma/schema.prisma and paste text bellow into it

```
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Amphie {
  id          Int      @id @default(autoincrement())
  temperature String
  co2_gaz     String
  humidity    String
  createdAt   DateTime @default(now())
}

model GlobalPM {
  id                  Int      @id @default(autoincrement())
  current             String
  tension             String
  puissance_active    String
  puissance_reactive  String
  puissance_apparente String
  energy              String
  createdAt           DateTime @default(now())
}

model GEDepartment {
  id                  Int      @id @default(autoincrement())
  current             String
  tension             String
  puissance_active    String
  puissance_reactive  String
  puissance_apparente String
  energy              String
  createdAt           DateTime @default(now())
}

model GBIDepartment {
  id                  Int      @id @default(autoincrement())
  current             String
  tension             String
  puissance_active    String
  puissance_reactive  String
  puissance_apparente String
  energy              String
  createdAt           DateTime @default(now())
}

model PFERoom {
  id                  Int      @id @default(autoincrement())
  current             String
  tension             String
  puissance_active    String
  puissance_reactive  String
  puissance_apparente String
  energy              String
  createdAt           DateTime @default(now())
}

model Notifcations {
  id                  Int      @id @default(autoincrement())
  notification        String
  source              String
  source_under_source String
  createdAt           DateTime @default(now())
}

model User {
  id       Int    @id @default(autoincrement())
  username String
  password String
}


```

- finaly run this command to upload the schema to postgres db
  `npx prisma migrate dev --name init`

to see your tables run the command `npx prisma studio`

### Frontend Setup

- navigate to the client_rewrite directory and run the command `npm install`

- after dependencies installed run the command `npm run dev`
