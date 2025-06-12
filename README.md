# GenMode - Gen-Z Translator 🚀

GenMode is a modern web application that transforms regular text into authentic Gen-Z style language using AI-powered translation. Choose from multiple personas or use direct translation to communicate effectively in Gen-Z style.

## 🌟 Features

- **Direct Translation**: Quick and accurate Gen-Z translations while preserving meaning
- **Multiple Personas**: Choose from various Gen-Z personas:
  - 📱 TikToker
  - 💅 Fashion Model
  - 😂 Meme Lord
  - 🎮 Gamer
  - 📚 BookTok Queen
  - 🌊 VSCO Girl
- **AI-Powered**: Advanced language model integration for authentic translations
- **User Authentication**: Secure login and registration system
- **Responsive Design**: Beautiful UI that works on all devices
- **History & Dashboard**: Track and manage your translations
- **Copy & Share**: Easy sharing of translations

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern UI library
- **TypeScript**: Type-safe development
- **Vite**: Next-generation frontend tooling
- **TailwindCSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality React components
- **React Router**: Client-side routing
- **React Query**: Server state management
- **Lucide React**: Beautiful icons

### Backend & Services
- **Supabase**: Backend as a Service
  - Authentication
  - Database
  - Real-time subscriptions
- **OpenRouter AI**: AI translation service

### Development Tools
- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **SWC**: Fast compilation
- **Radix UI**: Accessible component primitives

## 📦 Project Structure

```
src/
├── components/         # Reusable UI components
├── contexts/          # React context providers
├── hooks/             # Custom React hooks
├── integrations/      # External service integrations
├── lib/              # Utility functions
├── pages/            # Application pages/routes
├── services/         # Business logic and API calls
└── types/            # TypeScript type definitions
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/genmode.git
   cd genmode
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_OPENROUTER_API_KEY=your_api_key
   VITE_SITE_URL=your_site_url
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🔒 Environment Variables

- `VITE_OPENROUTER_API_KEY`: API key for OpenRouter AI service
- `VITE_SITE_URL`: Your site's URL
- `VITE_SUPABASE_URL`: Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Supabase anonymous key

## 💻 Development

### Commands
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

### Code Style
- Follow TypeScript best practices
- Use functional components with hooks
- Implement responsive design patterns
- Follow accessibility guidelines

## 🎨 UI Components

The application uses shadcn/ui components, customized with TailwindCSS:
- Buttons
- Cards
- Dropdowns
- Modals
- Forms
- Toasts
- And more...

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

## 🔐 Authentication

- Email/Password authentication
- Protected routes
- User profiles
- Session management

## 🌐 API Integration

- OpenRouter AI for translations
- Supabase for backend services
- Real-time updates
- Error handling

## 📈 Performance

- Code splitting
- Lazy loading
- Optimized builds
- Caching strategies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- shadcn/ui for the beautiful components
- Radix UI for accessible primitives
- OpenRouter AI for translation capabilities
- Supabase for backend services 