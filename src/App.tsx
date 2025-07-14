import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useState } from "react";
import { useFormStore } from "@/store/formStore";
import { FieldPalette } from "@/components/FieldPalette";
import { FormCanvas } from "@/components/FormCanvas";
import { FieldEditor } from "@/components/FieldEditor";
import { ExportPanel } from "@/components/ExportPanel";
import { FormTemplates } from "@/components/FormTemplates";
import { FormPreview } from "@/components/FormPreview";
import { MultiStepControls } from "@/components/MultiStepControls";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FormField } from "@/types";
import { generateId } from "@/lib/utils";

function App() {
  const { addField, reorderFields } = useFormStore();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draggedField, setDraggedField] = useState<FormField | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);

    if (event.active.data.current?.type === "field") {
      const fieldType = event.active.data.current.fieldType;
      setDraggedField({
        id: generateId(),
        type: fieldType,
        label: `New ${fieldType} field`,
        required: false,
        ...(fieldType === "select" || fieldType === "radio"
          ? { options: ["Option 1", "Option 2"] }
          : {}),
      });
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    // Handle dragging from palette to canvas
    if (active.data.current?.type === "field" && over.id === "form-canvas") {
      // This is handled in dragEnd
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      setDraggedField(null);
      return;
    }

    // Handle dropping from palette to canvas
    if (active.data.current?.type === "field" && over.id === "form-canvas") {
      if (draggedField) {
        addField(draggedField);
      }
    }

    // Handle reordering within canvas
    if (active.id !== over.id && !active.data.current?.type) {
      reorderFields(active.id as string, over.id as string);
    }

    setActiveId(null);
    setDraggedField(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Form Builder</h1>
              <p className="text-muted-foreground">
                Drag and drop fields to create your form, then export as JSON schema
                or React component
              </p>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="container mx-auto p-4">
          <div className="flex gap-4">
            <div className="space-y-4">
              <FormTemplates />
              <MultiStepControls />
              <FieldPalette />
            </div>
            <FormCanvas />
            <div className="space-y-4">
              <FormPreview />
              <FieldEditor />
              <ExportPanel />
            </div>
          </div>
        </div>

        <DragOverlay>
          {activeId && draggedField ? (
            <div className="bg-card border rounded-lg p-4 shadow-lg">
              <div className="font-medium">{draggedField.label}</div>
              <div className="text-sm text-muted-foreground capitalize">
                {draggedField.type} field
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

export default App;
