# Group Calendar Application

This is a user-friendly, interactive Group Calendar appliction built with React, TypeScript, Node.js, Express, and PostgreSQL. It allows users to view a monthly calendar, add events, and delete events while storing data in a PostgreSQL database.

## Table of Contents
  [Features](#features)  
  [Screenshots](#screenshots)  
  [Installation and Setup](#installation-and-setup)  
  [License](#license)  
  [Contact](#contact)  

## Features

• 📅 Dynamic Calendar: Displays a monthly calendar with the ability to navigate between months and years.

• 🗓️ Add Events: Users can click a date to add new events.

• ❌ Delete Events: Events can be deleted directly from the calendar.

• 🌐 RESTful API: Built using Node.js and Express.js for managing calendar events.

•🔍 PostgreSQL Integration: Events are stored and retrieved from a PostgreSQL database.

•🖌️ Interactive UI: Clean and responsive design for a seamless user experience.

-------------------------------------------------------------------------------------------------------------------------------

Technologies Used

• Frontend: React, TypeScript, CSS

• Backend: Node.js, Express.js

• Database: PostgreSQL

• API Communication: RESTful endpoints

-------------------------------------------------------------------------------------------------------------------------------

## Screenshots

Replace with updated image:
![image](https://github.com/user-attachments/assets/785304c6-037a-44c8-ba83-3df93dc8bab5)


-------------------------------------------------------------------------------------------------------------------------------

## Installation and Setup

Prerequisites:

• Node.js

• PostgreSQL installed and running

• VS Code

Step 1: Clone the Repository:

  git clone [https://](https://github.com/KeelerZoroth/Group-Calendar)

Step 2: Install Dependencies:

  npm install

Step 3: Set Up the Database

1. psql -U postgres

  \i schema.sql

2. Configure a .env file:

  DB_NAME='group_calendar_db'
  
  DB_USER='postgres'
  
  DB_PASSWORD=''
  
  JWT_SECRET_KEY=''

3. Run the Backend:

   npm run server

4. Run the Frontend

   npm run start

## License

🎀 This project is licensed under the MIT License. See the LICENSE file for details.

## Contact

GitHub: KeelerZoroth






