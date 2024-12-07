# AI Chatbot using Gemini API

A responsive AI chatbot application built with **React** and styled using **TailwindCSS**, powered by the **Gemini API** for natural language understanding and response generation.
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
3. Implement to the App.js
  Import the Gemini AI Model
   ```bash
   import { GoogleGenerativeAI } from "@google/generative-ai";
   ```
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
