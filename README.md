# Modern Form Builder

A powerful, modern form builder built with React 18 and the latest web technologies. Create forms with drag-and-drop functionality and export them as JSON schemas or React components.

## ✨ Features

- **Drag & Drop Interface**: Intuitive field placement with @dnd-kit
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components
- **Field Types**: Text, Email, Number, Select, Checkbox, Textarea, Radio buttons
- **Validation Rules**: Configure field validation with min/max lengths
- **Real-time Preview**: See your form as you build it
- **Export Options**: 
  - JSON Schema for backend integration
  - React Component for frontend use
- **TypeScript**: Full type safety throughout the application

## 🚀 Tech Stack

- **React 18** - Latest React with concurrent features
- **TypeScript** - Type safety and better DX
- **Vite** - Fast build tool and dev server
- **Zustand** - Lightweight state management
- **@dnd-kit** - Modern drag and drop library
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Lucide React** - Beautiful icons
- **React Hook Form** - Performant forms with easy validation
- **Zod** - TypeScript-first schema validation

## 🛠️ Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## 📖 Usage

### Building Forms
1. **Add Fields**: Drag field types from the left palette to the form canvas
2. **Configure Fields**: Click the settings icon on any field to edit its properties
3. **Reorder Fields**: Drag fields within the canvas to reorder them
4. **Delete Fields**: Click the trash icon to remove unwanted fields

### Field Configuration
- **Label**: Set the display name for the field
- **Placeholder**: Add helpful placeholder text
- **Required**: Mark fields as mandatory
- **Options**: Add choices for select and radio fields
- **Validation**: Set min/max length for text and number fields

### Exporting
- **JSON Schema**: Export form structure for backend processing
- **React Component**: Generate a ready-to-use React component

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── FieldPalette.tsx    # Draggable field types
│   ├── FormCanvas.tsx      # Main form building area
│   ├── SortableField.tsx   # Individual form fields
│   ├── FieldEditor.tsx     # Field property editor
│   └── ExportPanel.tsx     # Export functionality
├── store/              # Zustand store
├── types/              # TypeScript type definitions
├── lib/                # Utility functions
└── App.tsx             # Main application component
```

## 🎨 Customization

The form builder uses a modern design system that can be easily customized:

- **Colors**: Modify the CSS custom properties in `globals.css`
- **Components**: All UI components are in `src/components/ui/`
- **Themes**: Built-in support for light/dark themes

## 📦 Build

```bash
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [@dnd-kit](https://dndkit.com/) for the excellent drag and drop functionality
- [Lucide](https://lucide.dev/) for the icon set