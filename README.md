# Techember Fest '25 Ticket Generator

A modern, responsive web application for generating and managing event tickets. Built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features
- 🎫 Multiple ticket types (Regular, VIP, VVIP)
- 📱 Fully responsive design
- 🖼️ Cloudinary-integrated profile photo upload
- 💾 Persistent form data via localStorage
- ⌨️ Full keyboard navigation support
- 👓 Screen reader accessibility
- 🎨 Modern UI with gradient effects
- 📥 Downloadable tickets as PNG




## 🛠️ Tech Stack
- [Next.js](https://nextjs.org/) – React framework
- [TypeScript](https://www.typescriptlang.org/) – Type safety
- [Tailwind CSS](https://tailwindcss.com/) – Styling
- [Zod](https://github.com/colinhacks/zod) – Form validation
- [React Hook Form](https://react-hook-form.com/) – Form handling
- [html-to-image](https://github.com/bubkoo/html-to-image) – Ticket image generation
- [Cloudinary](https://cloudinary.com/) – Image upload and hosting

## 💻 Getting Started
### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Tukkiee/ticket-generator.git
   cd conference_ticket_generator
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Create a `.env` file and add your Cloudinary credentials:
   ```env
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   ```
4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📌 Key Features Overview
- **Ticket Types:** Regular (basic), VIP (premium benefits), VVIP (exclusive access)
- **Form Validation:** Required fields, email format, image upload checks, and real-time feedback
- **Accessibility:** ARIA roles, keyboard navigation, screen reader support, and focus management
- **State Management:** Persistent form data and upload state handling

## 🤝 Contributing
- Fork the repository
- Create a feature branch (`git checkout -b feature/AmazingFeature`)
- Commit your changes (`git commit -m 'Add AmazingFeature'`)
- Push the branch (`git push origin feature/AmazingFeature`)
- Open a Pull Request

## 📜 License
This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

## 🙌 Acknowledgments
- Inspired by modern ticketing platforms
- Icons from [Iconify](https://iconify.design/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)

