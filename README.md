# Aura Folio

A modern, responsive personal portfolio built with Next.js, Tailwind CSS, and AI-powered features.

## Features

- **Responsive Design**: Optimized for all screen sizes.
- **AI Portfolio Review**: Get instant feedback on your portfolio presentation.
- **Contact Form**: Integrated with Resend for automated email notifications and confirmations.
- **Dark Mode**: Supports light and dark themes using `next-themes`.

## Getting Started

1.  **Clone the repository**:
    ```bash
    git clone <your-repo-url>
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Set up environment variables**:
    Create a `.env` file in the root directory and add your Resend API key:
    ```env
    RESEND_API_KEY=your_resend_api_key_here
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

## How to Push to GitHub

If you haven't initialized a git repository yet, follow these steps in your terminal:

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
