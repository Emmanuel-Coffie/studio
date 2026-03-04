# Aura Folio

A professional, AI-powered personal portfolio built with Next.js, Tailwind CSS, and Genkit.

## 🚀 Launch Checklist

Follow these steps to get your portfolio live:

### 1. Download and Extract
*   Download the source code as a ZIP file from Firebase Studio.
*   Extract the contents to a new folder on your computer.

### 2. Set Up Your Environment
*   **Install Node.js**: Download from [nodejs.org](https://nodejs.org/).
*   **Install Dependencies**: Open your terminal in the project folder and run:
    ```bash
    npm install
    ```
*   **Create a .env file**: Create a file named `.env` in the root directory and add your API keys:
    ```env
    # Get from https://aistudio.google.com/
    GOOGLE_GENAI_API_KEY=your_google_ai_api_key_here

    # Get from https://resend.com/
    RESEND_API_KEY=your_resend_api_key_here
    ```

### 3. Run Locally
```bash
npm run dev
```
Visit `http://localhost:3000` to see your site in action!

### 4. Push to GitHub
1.  **Create a Repo**: Go to GitHub and create a new repository.
2.  **Initialize Git**: 
    ```bash
    git init
    git add .
    git commit -m "Initial commit: Aura Folio"
    ```
3.  **Connect and Push**:
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
    git branch -M main
    git push -u origin main
    ```

## 🛠 Features

*   **Responsive Design**: Pixel-perfect on mobile, tablet, and desktop.
*   **AI Portfolio Consultant**: Uses Google Gemini to analyze and improve your portfolio presentation.
*   **Automated Contact Form**: Integrated with Resend for lead notifications and auto-replies.
*   **Glassmorphism UI**: Modern aesthetic with beautiful backdrop blurs and subtle animations.

## ✉️ A Note on Emails (Resend)
By default, Resend's free tier (`onboarding@resend.dev`) only allows you to send emails **to your own account email**. 
*   Your notification email (to `coffie09emmanuel@gmail.com`) will work immediately.
*   To send confirmation emails to visitors, you must verify your domain in the [Resend Dashboard](https://resend.com/domains).

## 📄 License
MIT © Emmanuel Mawutor Coffie