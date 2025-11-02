# 🍳 ChefAI - AI-Powered Cooking Assistant

A modern, full-stack web application that serves as your personal AI cooking assistant. Built with Next.js 15, TypeScript, and Tailwind CSS.

![ChefAI Banner](https://via.placeholder.com/800x200/FF6B6B/FFFFFF?text=ChefAI+-+Your+AI+Cooking+Assistant)

## ✨ Features

### 🏠 **Dashboard**
- Personalized cooking dashboard
- Quick access to favorite recipes
- Cooking statistics and insights
- Recent activity overview

### 💬 **AI Chat Assistant**
- Interactive AI cooking assistant
- Recipe suggestions based on available ingredients
- Cooking tips and techniques
- Real-time cooking guidance
- Quick prompt suggestions for common cooking questions

### 📖 **Recipe Management**
- Browse and search recipes
- Detailed recipe pages with ingredients and instructions
- Nutrition information and dietary tags
- Recipe difficulty levels and cooking times
- User ratings and reviews

### 👤 **User Profile**
- Personal profile management
- Dietary preferences and restrictions
- Cooking skill level settings
- Favorite recipes collection

### ⚙️ **Settings**
- Application preferences
- Notification settings
- Theme customization
- Account management

### 🔐 **Authentication System**
- Secure user registration and login
- JWT-based authentication with HTTP-only cookies
- Protected routes with middleware
- Session management and validation

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Heroicons** - Beautiful SVG icons
- **React Hooks** - Modern state management

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB** - NoSQL database (with fallback storage)
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Middleware** - Route protection and authentication

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **TypeScript Config** - Strict type checking

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MongoDB (optional - has fallback storage)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/chefai.git
   cd chefai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and add your configuration:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NEXTAUTH_SECRET=your_nextauth_secret
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Usage

### Getting Started
1. **Register** a new account or **login** with existing credentials
2. **Explore** the dashboard to get familiar with the interface
3. **Chat** with the AI assistant for cooking advice and recipe suggestions
4. **Browse** recipes in the recipe section
5. **Customize** your profile and preferences in settings

### Test Accounts
For testing purposes, you can use these credentials:
- **Email:** `test@example.com`
- **Password:** `password`

### AI Chat Features
- Ask for recipe suggestions: *"What can I make with chicken and rice?"*
- Get cooking tips: *"How do I properly season a steak?"*
- Nutritional advice: *"What are some healthy breakfast options?"*
- Technique guidance: *"How do I make perfect pasta?"*

## 🏗️ Project Structure

```
src/
├── app/
│   ├── api/                 # API routes
│   │   ├── auth/           # Authentication endpoints
│   │   └── recipes/        # Recipe endpoints
│   ├── components/         # Reusable components
│   ├── contexts/          # React contexts
│   ├── chat/              # Chat page
│   ├── dashboard/         # Dashboard page
│   ├── login/             # Login page
│   ├── profile/           # Profile page
│   ├── recipes/           # Recipe pages
│   ├── register/          # Registration page
│   └── settings/          # Settings page
├── lib/                   # Utility libraries
├── models/                # Database models
└── middleware.ts          # Route protection
```

## 🔒 Security Features

- **JWT Authentication** with HTTP-only cookies
- **Password Hashing** using bcryptjs
- **Route Protection** via middleware
- **Input Validation** on all forms
- **CSRF Protection** built into Next.js
- **Secure Headers** and best practices

## 🎨 UI/UX Features

- **Responsive Design** - Works on all devices
- **Modern Interface** - Clean and intuitive design
- **Gradient Themes** - Beautiful color schemes
- **Loading States** - Smooth user experience
- **Error Handling** - User-friendly error messages
- **Accessibility** - WCAG compliant components

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
- **Netlify** - Static site deployment
- **Railway** - Full-stack deployment
- **Heroku** - Container deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Heroicons** - For the beautiful icons
- **OpenAI** - For AI inspiration and guidance

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Contact the development team
- Check the documentation

---

**Made with ❤️ by [Your Name]**

*ChefAI - Making cooking accessible and enjoyable for everyone!*
