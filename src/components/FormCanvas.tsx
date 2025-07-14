import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useFormStore } from '@/store/formStore';
import { SortableField } from './SortableField';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function FormCanvas() {
  const { schema, updateSchema } = useFormStore();
  const { setNodeRef } = useDroppable({ id: 'form-canvas' });

  return (
    <div className="flex-1 p-4">
      <Card>
        <CardHeader>
          <div className="space-y-2">
            <Label htmlFor="form-title">Form Title</Label>
            <Input
              id="form-title"
              value={schema.title}
              onChange={(e) => updateSchema({ title: e.target.value })}
              className="text-xl font-semibold"
            />
            <Label htmlFor="form-description">Description (optional)</Label>
            <Input
              id="form-description"
              value={schema.description || ''}
              onChange={(e) => updateSchema({ description: e.target.value })}
              placeholder="Add a description for your form"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div
            ref={setNodeRef}
            className="space-y-4 p-4 border-2 border-dashed border-muted-foreground/25 rounded-lg"
            style={{ minHeight: schema.fields.length === 0 ? '400px' : `${Math.max(400, (schema.fields.length * 150) + 300)}px` }}
          >
            {schema.fields.length === 0 ? (
              <div className="text-center text-muted-foreground py-12">
                <p>Drag fields from the palette to build your form</p>
              </div>
            ) : (
              <SortableContext items={schema.fields.map(f => f.id)} strategy={verticalListSortingStrategy}>
                {schema.fields.map((field) => (
                  <SortableField key={field.id} field={field} />
                ))}
              </SortableContext>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}