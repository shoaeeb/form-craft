import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FormField } from '@/types';
import { useFormStore } from '@/store/formStore';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GripVertical, Trash2, Settings } from 'lucide-react';

interface SortableFieldProps {
  field: FormField;
}

export function SortableField({ field }: SortableFieldProps) {
  const { selectField, selectedField, removeField } = useFormStore();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isSelected = selectedField === field.id;

  const renderFieldPreview = () => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
      case 'tel':
      case 'url':
      case 'date':
      case 'time':
      case 'datetime-local':
      case 'file':
        return (
          <Input
            type={field.type}
            placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
            disabled
          />
        );
      case 'textarea':
        return (
          <textarea
            className="w-full px-3 py-2 border rounded-md resize-none"
            placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
            rows={3}
            disabled
          />
        );
      case 'select':
        return (
          <select className="w-full px-3 py-2 border rounded-md" disabled>
            <option>Select an option</option>
            {field.options?.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        );
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <input type="checkbox" disabled className="rounded" />
            <span className="text-sm">{field.label}</span>
          </div>
        );
      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input type="radio" name={field.id} disabled />
                <span className="text-sm">{option}</span>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`${isDragging ? 'opacity-50' : ''} ${
        isSelected ? 'ring-2 ring-primary' : ''
      } transition-all`}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center space-x-2">
            <button
              {...attributes}
              {...listeners}
              className="cursor-grab hover:bg-accent p-1 rounded"
            >
              <GripVertical className="w-4 h-4 text-muted-foreground" />
            </button>
            <div>
              <Label className="text-sm font-medium">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
                {field.conditional && (
                  <span className="text-xs text-blue-500 ml-2">
                    (Conditional)
                  </span>
                )}
              </Label>
            </div>
          </div>
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => selectField(field.id)}
              className="h-8 w-8"
            >
              <Settings className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeField(field.id)}
              className="h-8 w-8 text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="mt-2">
          {field.type !== 'checkbox' && (
            <Label className="text-sm font-medium mb-1 block">{field.label}</Label>
          )}
          {renderFieldPreview()}
        </div>
      </CardContent>
    </Card>
  );
}