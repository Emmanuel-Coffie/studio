# Aura Folio

A modern, responsive personal portfolio built with Next.js, Tailwind CSS, and AI-powered features.

## Features

- **Responsive Design**: Optimized for all screen sizes.
- **AI Portfolio Review**: Get instant feedback on your portfolio presentation using Google Gemini.
- **Contact Form**: Integrated with Resend for automated email notifications and confirmations.
- **Dark Mode**: Supports light and dark themes using `next-themes`.

## Local Development Setup

To get this project running on your own computer:

1.  **Download and Unzip**: Use the download button in Firebase Studio to get the project source code.
2.  **Install Node.js**: Ensure you have Node.js installed on your machine.
3.  **Install Dependencies**:
    ```bash
    npm install
    ```
4.  **Important: Add Your Image**:
    - Create a folder named `public` at the root of the project.
    - Place your image file `Gemini_Generated_Image_tvqr2xtvqr2xtvqr.png` inside the `public` folder.
5.  **Set up environment variables**:
    Create a `.env` file in the root directory and add your keys:
    ```env
    # For AI features (Get from https://aistudio.google.com/)
    GOOGLE_GENAI_API_KEY=your_google_ai_api_key_here

    # For Contact Form (Get from https://resend.com/)
    RESEND_API_KEY=your_resend_api_key_here
    ```
6.  **Run the development server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## Production Build

To create an optimized production version of your app:

1.  **Build the project**:
    ```bash
    npm run build
    ```
2.  **Start the production server**:
    ```bash
    npm start
    ```

## How to Push to GitHub

1.  **Initialize Git**:
    ```bash
    git init
    ```
2.  **Add all files**:
    ```bash
    git add .
    ```
3.  **Commit your changes**:
    ```bash
    git commit -m "Initial commit: Aura Folio setup"
    ```
4.  **Create a new repository on GitHub** (without a README or .gitignore).
5.  **Link and push**:
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
    git branch -M main
    git push -u origin main
    ```
