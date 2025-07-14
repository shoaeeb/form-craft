# FormCraft - Professional Form Builder

A powerful, modern form builder built with React 18 and TypeScript. Create professional forms with drag-and-drop functionality and export them as JSON schemas or React components.

🌐 **Live Demo**: [https://form-craft.onrender.com](https://form-craft.onrender.com)

## ✨ Features

### 🎯 **Core Functionality**
- **Drag & Drop Interface** - Intuitive field placement with @dnd-kit
- **Live Preview** - See your form in action as you build it
- **Export Options** - JSON Schema or React TypeScript components
- **Form Templates** - Pre-built forms (Contact, Registration, Survey, Order)

### 🔧 **Advanced Features**
- **Multi-Step Forms** - Break long forms into manageable steps
- **Conditional Fields** - Show/hide fields based on other field values
- **Advanced Validation** - Custom regex patterns, min/max lengths, custom error messages
- **Dark/Light Theme** - Toggle between themes with system preference detection

### 📝 **Field Types**
- Text, Email, Password, Number, Tel, URL
- Textarea, Select, Radio buttons, Checkboxes
- Date, Time, DateTime, File upload

### 🎨 **Modern UI**
- Built with Tailwind CSS and shadcn/ui components
- Responsive design for all devices
- Professional, clean interface

## 🚀 Tech Stack

- **React 18** - Latest React with concurrent features
- **TypeScript** - Full type safety throughout
- **Vite** - Fast build tool and dev server
- **Zustand** - Lightweight state management
- **@dnd-kit** - Modern drag and drop library
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **React Hook Form** - Performant forms with validation
- **Zod** - TypeScript-first schema validation

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/form-craft.git
cd form-craft
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:5173`

## 📖 Usage Guide

### **Building Forms**
1. **Add Fields** - Drag field types from the left palette to the form canvas
2. **Configure Fields** - Click any field to edit its properties in the right panel
3. **Reorder Fields** - Drag fields within the canvas to reorder them
4. **Delete Fields** - Click the trash icon to remove unwanted fields

### **Form Templates**
- Choose from pre-built templates: Contact, Registration, Survey, Order
- Click any template to instantly load it
- Customize the loaded template as needed

### **Multi-Step Forms**
1. **Enable Multi-Step** - Toggle the switch in the Multi-Step panel
2. **Add Steps** - Click the "+" button to create additional steps
3. **Navigate Steps** - Click step boxes or use arrow buttons
4. **Build Each Step** - Add fields to the current active step

### **Conditional Fields**
1. **Select a Field** - Click on any field to edit it
2. **Set Dependency** - Choose which field this field depends on
3. **Set Condition** - Choose equals, not equals, contains, or not empty
4. **Set Value** - Enter the condition value

### **Advanced Validation**
- **Min/Max Length** - Set character limits for text fields
- **Regex Patterns** - Custom validation patterns (e.g., `^[A-Za-z]+$`)
- **Custom Error Messages** - Personalized validation messages

### **Exporting**
- **JSON Schema** - For backend integration and API processing
- **React Component** - Ready-to-use TypeScript React component with validation

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components (shadcn/ui)
│   ├── FieldPalette.tsx    # Draggable field types
│   ├── FormCanvas.tsx      # Main form building area
│   ├── SortableField.tsx   # Individual form fields
│   ├── FieldEditor.tsx     # Field property editor
│   ├── FormPreview.tsx     # Live form preview
│   ├── FormTemplates.tsx   # Pre-built form templates
│   ├── MultiStepControls.tsx # Multi-step form controls
│   ├── ExportPanel.tsx     # Export functionality
│   └── ThemeToggle.tsx     # Dark/light theme toggle
├── store/              # Zustand store
│   └── formStore.ts    # Main form state management
├── types/              # TypeScript type definitions
│   └── index.ts        # Form and field type definitions
├── lib/                # Utility functions
│   └── utils.ts        # Helper functions
├── utils/              # Additional utilities
│   └── keepAlive.ts    # Keep-alive functionality
└── App.tsx             # Main application component
```

## 🎨 Customization

### **Themes**
- Toggle between light and dark themes
- System preference detection
- Persistent theme selection

### **Styling**
- Modify Tailwind CSS classes
- Customize component styles in `src/components/ui/`
- Update global styles in `src/globals.css`

## 📦 Build & Deploy

### **Build for Production**
```bash
npm run build
```

### **Deploy to Render**
1. Connect your GitHub repository to Render
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy as a Static Site

## 🔍 SEO Features

- Comprehensive meta tags for search engines
- Open Graph tags for social media sharing
- Twitter Card support
- Structured data (JSON-LD)
- Sitemap and robots.txt
- Google Analytics integration

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - Beautiful component library
- [@dnd-kit](https://dndkit.com/) - Excellent drag and drop functionality
- [Lucide](https://lucide.dev/) - Icon set
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [React Hook Form](https://react-hook-form.com/) - Form handling
- [Zod](https://zod.dev/) - Schema validation

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Visit the live demo at [form-craft.onrender.com](https://form-craft.onrender.com)

---

**Built with ❤️ using React, TypeScript, and modern web technologies.**