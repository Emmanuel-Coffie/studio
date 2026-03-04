# Aura Folio

A professional personal portfolio built with Next.js, Tailwind CSS, and Lucide Icons.

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
*   **Create a .env file**: Create a file named `.env` in the root directory and add your Resend API key:
    ```env
    # Get from https://resend.com/
    RESEND_API_KEY=your_resend_api_key_here
    ```

### 3. Add Your CV
*   Place your CV in the `public` folder and name it `cv.pdf`. The download button in the Hero section is already configured to link to this file.

### 4. Run Locally
```bash
npm run dev
```
Visit `http://localhost:3000` to see your site in action!

### 5. Push to GitHub
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

## ✉️ A Note on Emails (Resend)
By default, Resend's free tier (`onboarding@resend.dev`) only allows you to send emails **to your own account email**. 
*   Your notification email (to `coffie09emmanuel@gmail.com`) will work immediately.
*   **To send automated confirmation emails to visitors**, you must verify your domain in the [Resend Dashboard](https://resend.com/domains). Once verified, change the `from` address in `src/app/actions.ts` from `onboarding@resend.dev` to an email using your domain (e.g., `hello@yourdomain.com`).

## 🛠 Features
*   **Responsive Design**: Pixel-perfect on mobile, tablet, and desktop.
*   **Professional Timeline**: Showcases your journey from University to National Service.
*   **Automated Contact Form**: Integrated with Resend for lead notifications and auto-replies.
*   **Glassmorphism UI**: Modern aesthetic with beautiful backdrop blurs and subtle animations.

## 📄 License
MIT © Emmanuel Mawutor Coffie
