# Techember Fest '25 Ticket Generator

A modern, responsive web application for generating and managing event tickets. Built with Next.js, TypeScript, and Tailwind CSS.


## Features

- 🎫 Multiple ticket types (Regular, VIP, VVIP)
- 📱 Fully responsive design
- 🖼️ Profile photo upload with Cloudinary integration
- 💾 Persistent form data using localStorage
- ⌨️ Full keyboard navigation support
- 👓 Screen reader friendly
- 🎨 Modern UI with gradient effects
- 📥 Downloadable tickets as PNG

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Zod](https://github.com/colinhacks/zod) - Form validation
- [React Hook Form](https://react-hook-form.com/) - Form handling
- [html-to-image](https://github.com/bubkoo/html-to-image) - Ticket image generation
- [Cloudinary](https://cloudinary.com/) - Image upload and hosting

## Getting Started

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

3. Create a `.env` file in the root directory and add your Cloudinary credentials:
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



## Key Features Explained

### Ticket Types
- **Regular Access**: Free tier with basic access
- **VIP Access**: Premium tier with additional benefits
- **VVIP Access**: Top-tier exclusive access

### Form Validation
- Required field validation
- Email format validation
- Image upload validation
- Real-time error feedback

### Accessibility Features
- ARIA labels and roles
- Keyboard navigation
- Screen reader support
- Focus management

### State Management
- Form data persistence
- Ticket inventory tracking
- Upload state handling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Design inspiration from modern ticket booking platforms
- Icons from [Iconify](https://iconify.design/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)#   t i c k e t - g e n e r a t o r  
 