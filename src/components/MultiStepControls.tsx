import { useFormStore } from '@/store/formStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

export function MultiStepControls() {
  const { 
    schema, 
    currentStep, 
    toggleMultiStep, 
    addStep, 
    removeStep, 
    updateStep, 
    setCurrentStep 
  } = useFormStore();

  if (!schema.isMultiStep) {
    return (
      <Card className="w-64">
        <CardHeader>
          <CardTitle className="text-lg">Multi-Step Form</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Switch
              checked={false}
              onCheckedChange={toggleMultiStep}
            />
            <Label>Enable Multi-Step</Label>
          </div>
        </CardContent>
      </Card>
    );
  }

  const steps = schema.steps || [];
  const currentStepData = steps[currentStep];

  return (
    <Card className="w-64">
      <CardHeader>
        <CardTitle className="text-lg">Multi-Step Form</CardTitle>
        <div className="flex items-center space-x-2">
          <Switch
            checked={true}
            onCheckedChange={toggleMultiStep}
          />
          <Label>Multi-Step Enabled</Label>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Steps ({steps.length})</span>
          <Button
            variant="outline"
            size="sm"
            onClick={addStep}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-2">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`p-2 border rounded cursor-pointer ${
                index === currentStep ? 'bg-primary/10 border-primary' : ''
              }`}
              onClick={() => setCurrentStep(index)}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{step.title}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeStep(step.id);
                  }}
                  className="h-6 w-6 p-0"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
              <div className="text-xs text-muted-foreground">
                {step.fields.length} fields
              </div>
            </div>
          ))}
        </div>

        {currentStepData && (
          <div className="space-y-2 pt-2 border-t">
            <Label className="text-sm font-medium">Edit Current Step</Label>
            <div>
              <Label htmlFor="step-title" className="text-xs">Title</Label>
              <Input
                id="step-title"
                value={currentStepData.title}
                onChange={(e) => updateStep(currentStepData.id, { title: e.target.value })}
                className="text-sm"
              />
            </div>
            <div>
              <Label htmlFor="step-description" className="text-xs">Description</Label>
              <Input
                id="step-description"
                value={currentStepData.description || ''}
                onChange={(e) => updateStep(currentStepData.id, { description: e.target.value })}
                placeholder="Step description"
                className="text-sm"
              />
            </div>
          </div>
        )}

        <div className="flex justify-between pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm text-muted-foreground">
            {currentStep + 1} / {steps.length}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            disabled={currentStep === steps.length - 1}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}