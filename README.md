# 🚀 Modern Portfolio Website

A stunning, responsive portfolio website built with **Next.js 16**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**. Featuring dark/light theme switching, multilingual support, and smooth animations.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## ✨ Features

- 🎨 **Modern Design** - Clean, professional, and fully responsive
- 🌓 **Theme Switching** - Dark and light mode with system preference detection
- 🌍 **Multilingual Support** - English and Romanian language options
- 🎬 **Smooth Animations** - Framer Motion powered interactions
- 📱 **Mobile First** - Optimized for all devices and screen sizes
- ⚡ **Performance** - Fast loading with Next.js optimizations
- 🔒 **Security** - Google reCAPTCHA integration for contact forms
- 📧 **Contact Integration** - EmailJS for seamless communication
- 🎯 **SEO Optimized** - Built with Next.js App Router for optimal SEO

## 🛠️ Tech Stack

### Core Technologies
- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

### UI Components
- **Component Library**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: [Geist](https://vercel.com/font) by Vercel
- **Theme Management**: [next-themes](https://github.com/pacocoursey/next-themes)

### Development Tools
- **Linting**: [ESLint 9](https://eslint.org/)
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Build Tool**: [PostCSS](https://postcss.org/)

## 📸 Screenshots

*Screenshots will be added here once the project is deployed*

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm/yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/nextjs-portfolio.git
   cd nextjs-portfolio
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see your portfolio!

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── NavBar.tsx         # Navigation component
│   ├── sections/          # Page sections
│   │   ├── Hero.tsx       # Hero section
│   │   ├── AboutMe.tsx    # About section
│   │   ├── Skills.tsx     # Skills showcase
│   │   ├── Experience.tsx # Work experience
│   │   ├── Projects.tsx   # Project portfolio
│   │   ├── Contact.tsx    # Contact form
│   │   └── Footer.tsx     # Footer component
│   └── ui/                # Reusable UI components
├── providers/             # Context providers
│   ├── client-providers.tsx
│   ├── language-provider.tsx
│   └── theme-provider.tsx
├── lib/                   # Utility functions
│   └── utils.ts
├── locales/               # Translation files
│   ├── en.json           # English translations
│   └── ro.json           # Romanian translations
└── types/                 # TypeScript type definitions
```

## 🌍 Language Support

This portfolio supports multiple languages:

- **English** (default)
- **Romanian** 

Language switching is handled automatically based on user preferences and can be toggled manually.

## 🎨 Customization

### Adding New Sections
1. Create a new component in `src/components/sections/`
2. Import and add it to `src/app/page.tsx`
3. Update the navigation in `NavBar.tsx` if needed

### Modifying Themes
- Edit theme configurations in `src/providers/theme-provider.tsx`
- Customize colors in `tailwind.config.js`

### Updating Content
- Modify text content in `src/locales/` for different languages
- Update project data, skills, and experience in respective section components

## 📧 Contact Form Setup

The contact form uses EmailJS and Google reCAPTCHA:

1. **EmailJS Setup**
   - Create an account at [EmailJS](https://www.emailjs.com/)
   - Set up your email service and template
   - Add your public key to environment variables

2. **Google reCAPTCHA**
   - Register your site at [Google reCAPTCHA](https://www.google.com/recaptcha/)
   - Add your site key to the contact form configuration

## 🚀 Deployment

### Deploy on Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/nextjs-portfolio)

### Deploy on Other Platforms

1. **Build the project**
   ```bash
   pnpm build
   ```

2. **Start the production server**
   ```bash
   pnpm start
   ```

3. **Deploy to your preferred platform**
   - [Netlify](https://www.netlify.com/)
   - [GitHub Pages](https://pages.github.com/)
   - [Digital Ocean](https://www.digitalocean.com/)

## 🔧 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for beautiful animations
- [Vercel](https://vercel.com/) for hosting and the Geist font family

## 📞 Support

If you found this project helpful, please give it a ⭐ on GitHub!

For questions or support, please open an issue on the GitHub repository.

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
