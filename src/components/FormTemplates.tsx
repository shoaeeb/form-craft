import { useFormStore } from '@/store/formStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FormSchema } from '@/types';
import { generateId } from '@/lib/utils';
import { FileText, User, MessageSquare, ShoppingCart } from 'lucide-react';

const templates: Array<{ name: string; icon: React.ReactNode; schema: Omit<FormSchema, 'id'> }> = [
  {
    name: 'Contact Form',
    icon: <MessageSquare className="w-4 h-4" />,
    schema: {
      title: 'Contact Us',
      description: 'Get in touch with us',
      fields: [
        { id: generateId(), type: 'text', label: 'Full Name', required: true },
        { id: generateId(), type: 'email', label: 'Email Address', required: true },
        { id: generateId(), type: 'tel', label: 'Phone Number', required: false },
        { id: generateId(), type: 'select', label: 'Subject', required: true, options: ['General Inquiry', 'Support', 'Sales', 'Other'] },
        { id: generateId(), type: 'textarea', label: 'Message', required: true, placeholder: 'Tell us how we can help...' }
      ]
    }
  },
  {
    name: 'Registration Form',
    icon: <User className="w-4 h-4" />,
    schema: {
      title: 'User Registration',
      description: 'Create your account',
      fields: [
        { id: generateId(), type: 'text', label: 'First Name', required: true },
        { id: generateId(), type: 'text', label: 'Last Name', required: true },
        { id: generateId(), type: 'email', label: 'Email', required: true },
        { id: generateId(), type: 'password', label: 'Password', required: true },
        { id: generateId(), type: 'date', label: 'Date of Birth', required: false },
        { id: generateId(), type: 'select', label: 'Gender', required: false, options: ['Male', 'Female', 'Other', 'Prefer not to say'] },
        { id: generateId(), type: 'checkbox', label: 'I agree to the terms and conditions', required: true }
      ]
    }
  },
  {
    name: 'Survey Form',
    icon: <FileText className="w-4 h-4" />,
    schema: {
      title: 'Customer Feedback Survey',
      description: 'Help us improve our service',
      fields: [
        { id: generateId(), type: 'radio', label: 'How satisfied are you?', required: true, options: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'] },
        { id: generateId(), type: 'select', label: 'How did you hear about us?', required: false, options: ['Google', 'Social Media', 'Friend', 'Advertisement', 'Other'] },
        { id: generateId(), type: 'checkbox', label: 'Would you recommend us to others?', required: false },
        { id: generateId(), type: 'textarea', label: 'Additional Comments', required: false, placeholder: 'Share your thoughts...' }
      ]
    }
  },
  {
    name: 'Order Form',
    icon: <ShoppingCart className="w-4 h-4" />,
    schema: {
      title: 'Product Order',
      description: 'Place your order',
      fields: [
        { id: generateId(), type: 'text', label: 'Customer Name', required: true },
        { id: generateId(), type: 'email', label: 'Email', required: true },
        { id: generateId(), type: 'select', label: 'Product', required: true, options: ['Basic Plan', 'Pro Plan', 'Enterprise Plan'] },
        { id: generateId(), type: 'number', label: 'Quantity', required: true },
        { id: generateId(), type: 'textarea', label: 'Shipping Address', required: true },
        { id: generateId(), type: 'tel', label: 'Phone Number', required: true }
      ]
    }
  }
];

export function FormTemplates() {
  const { loadTemplate } = useFormStore();

  return (
    <Card className="w-64">
      <CardHeader>
        <CardTitle className="text-lg">Templates</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {templates.map((template) => (
          <Button
            key={template.name}
            variant="outline"
            className="w-full justify-start h-auto p-3"
            onClick={() => loadTemplate(template.schema)}
          >
            <div className="flex items-center space-x-2">
              {template.icon}
              <div className="text-left">
                <div className="font-medium text-sm">{template.name}</div>
                <div className="text-xs text-muted-foreground">
                  {template.schema.fields.length} fields
                </div>
              </div>
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}