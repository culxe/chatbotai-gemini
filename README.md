# AI Chatbot using Gemini API

This project is an AI-powered chatbot built using the Gemini API for intelligent conversation capabilities. The application is designed to provide an intuitive and interactive user experience with React, TailwindCSS, and Gemini API

(brief chatbot GIF)
---

## Getting Started

### Prerequisites

- **Node.js**: v20.16.0
- **npm** : 10.8.1
- **google/generative-ai** : 0.21.0
- **react** : 18.3.1
- **tailwindcss** : 3.4.15
- **tailwind-scrollbar** : 3.1.0

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/ai-chatbot-gemini.git
   cd ai-chatbot-gemini
2. Install dependencies

   Install [Node.js](https://nodejs.org)
   
   Install NPM
   ```bash
   npm install
   ```
   Install Gemini AI
   ```bash
   npm install @google/generative-ai
   ```
   Install TailwindCSS
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init
   npm install tailwind-scrollbar
   
4. [Configuration Gemini API ](#API-Key-Configuration)
5. Start the development server:
   ```bash
   npm start
6. Open the app in your browser at localhost

### API Key Configuration
1. To use the Gemini API, you need to set up your API key.
2. Obtain an API key from the Gemini API website.

   From the Google AI Studio, click "Create API Key" to obtain the API key.
   ![image](https://github.com/user-attachments/assets/f025ae4d-fe8c-48a6-8c53-d989e8ef2afb)

   Also, we can monitoring usage of the API from Google Cloud website.
   ![image](https://github.com/user-attachments/assets/db5540e9-89f2-4433-a4f7-9e76c0facb4c)


4. Implement to the App.js

   Import the Gemini AI Model
   ```bash
   import { GoogleGenerativeAI } from "@google/generative-ai";
   ```
   Call the Gemini AI model and paste the code
   ```bash
   const { GoogleGenerativeAI } = require("@google/generative-ai");
   const genAI = new GoogleGenerativeAI(process.env.API_KEY);
   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

### Main Project Structures
├── build # Production build files 

├── node_modules # Installed dependencies

├── public # Static files and HTML template

├── src # Application source code

│   ├── App.js # Main application component

│   ├── index.css # Global styles (TailwindCSS)

│   ├── index.js # Entry point for the app

│   └── package.json # Project metadata and dependencies

├── README.md # Documentation for the project

└── tailwind.config.js # TailwindCSS configuration file
