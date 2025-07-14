import { useForm } from 'react-hook-form';
import { useFormStore } from '@/store/formStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Eye } from 'lucide-react';

export function FormPreview() {
  const { schema } = useFormStore();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const watchedValues = watch();

  const onSubmit = (data: any) => {
    console.log('Form Preview Submission:', data);
    alert('Form submitted! Check console for data.');
  };

  const shouldShowField = (field: any) => {
    if (!field.conditional) return true;
    
    const dependentValue = watchedValues?.[field.conditional.dependsOn];
    const conditionValue = field.conditional.value;
    
    switch (field.conditional.condition) {
      case 'equals':
        return dependentValue === conditionValue;
      case 'not_equals':
        return dependentValue !== conditionValue;
      case 'contains':
        return dependentValue?.toString().includes(conditionValue);
      case 'not_empty':
        return dependentValue && dependentValue.toString().trim() !== '';
      default:
        return true;
    }
  };

  const renderField = (field: any) => {
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
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id={field.id}
              type={field.type}
              placeholder={field.placeholder}
              {...register(field.id, {
                required: field.required,
                minLength: field.validation?.min ? {
                  value: field.validation.min,
                  message: field.validation.message || `Minimum ${field.validation.min} characters required`
                } : undefined,
                maxLength: field.validation?.max ? {
                  value: field.validation.max,
                  message: field.validation.message || `Maximum ${field.validation.max} characters allowed`
                } : undefined,
                pattern: field.validation?.pattern ? {
                  value: new RegExp(field.validation.pattern),
                  message: field.validation.message || 'Invalid format'
                } : undefined
              })}
            />
            {errors[field.id] && (
              <span className="text-red-500 text-sm">
                {(errors[field.id] as any)?.message || 'This field is required'}
              </span>
            )}
          </div>
        );

      case 'textarea':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Textarea
              id={field.id}
              placeholder={field.placeholder}
              {...register(field.id, {
                required: field.required,
                minLength: field.validation?.min ? {
                  value: field.validation.min,
                  message: field.validation.message || `Minimum ${field.validation.min} characters required`
                } : undefined,
                maxLength: field.validation?.max ? {
                  value: field.validation.max,
                  message: field.validation.message || `Maximum ${field.validation.max} characters allowed`
                } : undefined
              })}
            />
            {errors[field.id] && (
              <span className="text-red-500 text-sm">
                {(errors[field.id] as any)?.message || 'This field is required'}
              </span>
            )}
          </div>
        );

      case 'select':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <select
              id={field.id}
              {...register(field.id, { required: field.required })}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Select an option</option>
              {field.options?.map((option: string, index: number) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
            {errors[field.id] && (
              <span className="text-red-500 text-sm">This field is required</span>
            )}
          </div>
        );

      case 'radio':
        return (
          <div key={field.id} className="space-y-2">
            <Label>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <div className="space-y-2">
              {field.options?.map((option: string, index: number) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={`${field.id}-${index}`}
                    value={option}
                    {...register(field.id, { required: field.required })}
                  />
                  <Label htmlFor={`${field.id}-${index}`} className="font-normal">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
            {errors[field.id] && (
              <span className="text-red-500 text-sm">This field is required</span>
            )}
          </div>
        );

      case 'checkbox':
        return (
          <div key={field.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={field.id}
              {...register(field.id, { required: field.required })}
              className="rounded"
            />
            <Label htmlFor={field.id} className="font-normal">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            {errors[field.id] && (
              <span className="text-red-500 text-sm block">This field is required</span>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Eye className="w-4 h-4" />
          Live Preview
        </CardTitle>
      </CardHeader>
      <CardContent>
        {schema.fields.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            Add fields to see live preview
          </p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <h2 className="text-xl font-bold">{schema.title}</h2>
              {schema.description && (
                <p className="text-muted-foreground text-sm mt-1">
                  {schema.description}
                </p>
              )}
            </div>
            
            {schema.fields.filter(shouldShowField).map(renderField)}
            
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}