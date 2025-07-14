import { useDraggable } from '@dnd-kit/core';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormField } from '@/types';
import { Type, Mail, Hash, ChevronDown, CheckSquare, FileText, Circle } from 'lucide-react';

const fieldTypes: Array<{ type: FormField['type']; label: string; icon: React.ReactNode }> = [
  { type: 'text', label: 'Text Input', icon: <Type className="w-4 h-4" /> },
  { type: 'email', label: 'Email', icon: <Mail className="w-4 h-4" /> },
  { type: 'password', label: 'Password', icon: <Type className="w-4 h-4" /> },
  { type: 'number', label: 'Number', icon: <Hash className="w-4 h-4" /> },
  { type: 'tel', label: 'Phone', icon: <Hash className="w-4 h-4" /> },
  { type: 'url', label: 'URL', icon: <Type className="w-4 h-4" /> },
  { type: 'date', label: 'Date', icon: <Type className="w-4 h-4" /> },
  { type: 'time', label: 'Time', icon: <Type className="w-4 h-4" /> },
  { type: 'datetime-local', label: 'Date & Time', icon: <Type className="w-4 h-4" /> },
  { type: 'file', label: 'File Upload', icon: <FileText className="w-4 h-4" /> },
  { type: 'select', label: 'Dropdown', icon: <ChevronDown className="w-4 h-4" /> },
  { type: 'checkbox', label: 'Checkbox', icon: <CheckSquare className="w-4 h-4" /> },
  { type: 'textarea', label: 'Text Area', icon: <FileText className="w-4 h-4" /> },
  { type: 'radio', label: 'Radio Button', icon: <Circle className="w-4 h-4" /> },
];

function DraggableField({ type, label, icon }: { type: FormField['type']; label: string; icon: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `palette-${type}`,
    data: { type: 'field', fieldType: type }
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`p-3 border rounded-lg cursor-grab hover:bg-accent transition-colors ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className="flex items-center space-x-2">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
    </div>
  );
}

export function FieldPalette() {
  return (
    <Card className="w-64">
      <CardHeader>
        <CardTitle className="text-lg">Field Types</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {fieldTypes.map(({ type, label, icon }) => (
          <DraggableField key={type} type={type} label={label} icon={icon} />
        ))}
      </CardContent>
    </Card>
  );
}