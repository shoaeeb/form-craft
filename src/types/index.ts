export interface FormField {
  id: string;
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'date' | 'time' | 'datetime-local' | 'file' | 'select' | 'checkbox' | 'textarea' | 'radio';
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
    customRules?: Array<{
      rule: 'minLength' | 'maxLength' | 'regex' | 'custom';
      value: string | number;
      message: string;
    }>;
  };
  conditional?: {
    dependsOn: string;
    condition: 'equals' | 'not_equals' | 'contains' | 'not_empty';
    value: string;
  };
}

export interface FormStep {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
}

export interface FormSchema {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  isMultiStep?: boolean;
  steps?: FormStep[];
}

export interface DragItem {
  id: string;
  type: string;
  fieldType: FormField['type'];
}