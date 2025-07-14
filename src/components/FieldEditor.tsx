import { useFormStore } from '@/store/formStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

import { Plus, X } from 'lucide-react';
import { useState } from 'react';

export function FieldEditor() {
  const { schema, selectedField, updateField, selectField } = useFormStore();
  const [newOption, setNewOption] = useState('');

  const field = schema.fields.find(f => f.id === selectedField);

  if (!field) {
    return (
      <Card className="w-80">
        <CardHeader>
          <CardTitle className="text-lg">Field Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            Select a field to edit its properties
          </p>
        </CardContent>
      </Card>
    );
  }

  const addOption = () => {
    if (newOption.trim()) {
      const currentOptions = field.options || [];
      updateField(field.id, {
        options: [...currentOptions, newOption.trim()]
      });
      setNewOption('');
    }
  };

  const removeOption = (index: number) => {
    const currentOptions = field.options || [];
    updateField(field.id, {
      options: currentOptions.filter((_, i) => i !== index)
    });
  };

  const needsOptions = field.type === 'select' || field.type === 'radio';

  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle className="text-lg">Field Properties</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => selectField(null)}
          className="w-fit"
        >
          Close
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="field-label">Label</Label>
          <Input
            id="field-label"
            value={field.label}
            onChange={(e) => updateField(field.id, { label: e.target.value })}
          />
        </div>

        {field.type !== 'checkbox' && (
          <div>
            <Label htmlFor="field-placeholder">Placeholder</Label>
            <Input
              id="field-placeholder"
              value={field.placeholder || ''}
              onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
            />
          </div>
        )}

        <div className="flex items-center space-x-2">
          <Switch
            id="field-required"
            checked={field.required || false}
            onCheckedChange={(checked) => updateField(field.id, { required: checked })}
          />
          <Label htmlFor="field-required">Required</Label>
        </div>

        {needsOptions && (
          <div>
            <Label>Options</Label>
            <div className="space-y-2 mt-2">
              {field.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...(field.options || [])];
                      newOptions[index] = e.target.value;
                      updateField(field.id, { options: newOptions });
                    }}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeOption(index)}
                    className="h-8 w-8"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Add option"
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addOption()}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={addOption}
                  className="h-8 w-8"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {(field.type === 'text' || field.type === 'number' || field.type === 'password' || field.type === 'textarea') && (
          <div className="space-y-3">
            <Label>Validation Rules</Label>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="min-length" className="text-xs">Min Length</Label>
                <Input
                  id="min-length"
                  type="number"
                  placeholder="Min"
                  value={field.validation?.min || ''}
                  onChange={(e) => updateField(field.id, {
                    validation: {
                      ...field.validation,
                      min: e.target.value ? parseInt(e.target.value) : undefined
                    }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="max-length" className="text-xs">Max Length</Label>
                <Input
                  id="max-length"
                  type="number"
                  placeholder="Max"
                  value={field.validation?.max || ''}
                  onChange={(e) => updateField(field.id, {
                    validation: {
                      ...field.validation,
                      max: e.target.value ? parseInt(e.target.value) : undefined
                    }
                  })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="pattern" className="text-xs">Regex Pattern</Label>
              <Input
                id="pattern"
                placeholder="e.g., ^[A-Za-z]+$"
                value={field.validation?.pattern || ''}
                onChange={(e) => updateField(field.id, {
                  validation: {
                    ...field.validation,
                    pattern: e.target.value || undefined
                  }
                })}
              />
            </div>

            <div>
              <Label htmlFor="custom-message" className="text-xs">Custom Error Message</Label>
              <Input
                id="custom-message"
                placeholder="Custom validation message"
                value={field.validation?.message || ''}
                onChange={(e) => updateField(field.id, {
                  validation: {
                    ...field.validation,
                    message: e.target.value || undefined
                  }
                })}
              />
            </div>
          </div>
        )}

        {field.type === 'email' && (
          <div>
            <Label htmlFor="email-message" className="text-xs">Custom Email Error Message</Label>
            <Input
              id="email-message"
              placeholder="Please enter a valid email"
              value={field.validation?.message || ''}
              onChange={(e) => updateField(field.id, {
                validation: {
                  ...field.validation,
                  message: e.target.value || undefined
                }
              })}
            />
          </div>
        )}

        <div className="space-y-3">
          <Label>Conditional Logic</Label>
          <div className="space-y-2">
            <div>
              <Label htmlFor="depends-on" className="text-xs">Show when field</Label>
              <select
                id="depends-on"
                className="w-full px-3 py-2 border rounded-md text-sm"
                value={field.conditional?.dependsOn || ''}
                onChange={(e) => updateField(field.id, {
                  conditional: e.target.value ? {
                    dependsOn: e.target.value,
                    condition: 'equals',
                    value: ''
                  } : undefined
                })}
              >
                <option value="">No dependency</option>
                {schema.fields
                  .filter(f => f.id !== field.id)
                  .map(f => (
                    <option key={f.id} value={f.id}>{f.label}</option>
                  ))}
              </select>
            </div>
            
            {field.conditional?.dependsOn && (
              <>
                <div>
                  <Label htmlFor="condition" className="text-xs">Condition</Label>
                  <select
                    id="condition"
                    className="w-full px-3 py-2 border rounded-md text-sm"
                    value={field.conditional.condition}
                    onChange={(e) => updateField(field.id, {
                      conditional: {
                        dependsOn: field.conditional!.dependsOn,
                        condition: e.target.value as any,
                        value: field.conditional!.value || ''
                      }
                    })}
                  >
                    <option value="equals">Equals</option>
                    <option value="not_equals">Not equals</option>
                    <option value="contains">Contains</option>
                    <option value="not_empty">Is not empty</option>
                  </select>
                </div>
                
                {field.conditional.condition !== 'not_empty' && (
                  <div>
                    <Label htmlFor="condition-value" className="text-xs">Value</Label>
                    <Input
                      id="condition-value"
                      placeholder="Condition value"
                      value={field.conditional.value || ''}
                      onChange={(e) => updateField(field.id, {
                        conditional: {
                          dependsOn: field.conditional!.dependsOn,
                          condition: field.conditional!.condition,
                          value: e.target.value
                        }
                      })}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}