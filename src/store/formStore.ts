import { create } from "zustand";
import { FormField, FormSchema, FormStep } from "@/types";
import { generateId } from "@/lib/utils";

interface FormStore {
  schema: FormSchema;
  selectedField: string | null;
  currentStep: number;
  addField: (field: Omit<FormField, "id">) => void;
  updateField: (id: string, updates: Partial<FormField>) => void;
  removeField: (id: string) => void;
  reorderFields: (activeId: string, overId: string) => void;
  selectField: (id: string | null) => void;
  updateSchema: (updates: Partial<Omit<FormSchema, "fields">>) => void;
  loadTemplate: (template: Omit<FormSchema, "id">) => void;
  toggleMultiStep: () => void;
  addStep: () => void;
  removeStep: (stepId: string) => void;
  updateStep: (stepId: string, updates: Partial<FormStep>) => void;
  moveFieldToStep: (fieldId: string, stepId: string) => void;
  setCurrentStep: (step: number) => void;
  exportSchema: () => FormSchema;
  exportReactComponent: () => string;
}

export const useFormStore = create<FormStore>((set, get) => ({
  schema: {
    id: generateId(),
    title: "Untitled Form",
    description: "",
    fields: [],
    isMultiStep: false,
    steps: [],
  },
  selectedField: null,
  currentStep: 0,

  addField: (field) =>
    set((state) => {
      const newField = { ...field, id: generateId() };

      if (
        state.schema.isMultiStep &&
        state.schema.steps &&
        state.schema.steps.length > 0
      ) {
        // Add to current step
        return {
          schema: {
            ...state.schema,
            steps: state.schema.steps.map((step, index) =>
              index === state.currentStep
                ? { ...step, fields: [...step.fields, newField] }
                : step
            ),
          },
        };
      } else {
        // Add to main fields
        return {
          schema: {
            ...state.schema,
            fields: [...state.schema.fields, newField],
          },
        };
      }
    }),

  updateField: (id, updates) =>
    set((state) => ({
      schema: {
        ...state.schema,
        fields: state.schema.fields.map((field) =>
          field.id === id ? { ...field, ...updates } : field
        ),
      },
    })),

  removeField: (id) =>
    set((state) => ({
      schema: {
        ...state.schema,
        fields: state.schema.fields.filter((field) => field.id !== id),
      },
      selectedField: state.selectedField === id ? null : state.selectedField,
    })),

  reorderFields: (activeId, overId) =>
    set((state) => {
      const fields = [...state.schema.fields];
      const activeIndex = fields.findIndex((f) => f.id === activeId);
      const overIndex = fields.findIndex((f) => f.id === overId);

      if (activeIndex !== -1 && overIndex !== -1) {
        const [removed] = fields.splice(activeIndex, 1);
        fields.splice(overIndex, 0, removed);
      }

      return {
        schema: { ...state.schema, fields },
      };
    }),

  selectField: (id) => set({ selectedField: id }),

  updateSchema: (updates) =>
    set((state) => ({
      schema: { ...state.schema, ...updates },
    })),

  loadTemplate: (template) =>
    set({
      schema: { ...template, id: generateId() },
      selectedField: null,
    }),

  toggleMultiStep: () =>
    set((state) => ({
      schema: {
        ...state.schema,
        isMultiStep: !state.schema.isMultiStep,
        steps: !state.schema.isMultiStep
          ? [
              {
                id: generateId(),
                title: "Step 1",
                description: "",
                fields: [...state.schema.fields],
              },
            ]
          : [],
        fields: state.schema.isMultiStep
          ? state.schema.steps?.reduce(
              (allFields, step) => [...allFields, ...step.fields],
              [] as FormField[]
            ) || []
          : state.schema.fields,
      },
      currentStep: 0,
    })),

  addStep: () =>
    set((state) => ({
      schema: {
        ...state.schema,
        steps: [
          ...(state.schema.steps || []),
          {
            id: generateId(),
            title: `Step ${(state.schema.steps?.length || 0) + 1}`,
            description: "",
            fields: [],
          },
        ],
      },
    })),

  removeStep: (stepId) =>
    set((state) => ({
      schema: {
        ...state.schema,
        steps: state.schema.steps?.filter((step) => step.id !== stepId) || [],
      },
    })),

  updateStep: (stepId, updates) =>
    set((state) => ({
      schema: {
        ...state.schema,
        steps:
          state.schema.steps?.map((step) =>
            step.id === stepId ? { ...step, ...updates } : step
          ) || [],
      },
    })),

  moveFieldToStep: (fieldId, stepId) =>
    set((state) => {
      const field = state.schema.fields.find((f) => f.id === fieldId);
      if (!field || !state.schema.steps) return state;

      return {
        schema: {
          ...state.schema,
          fields: state.schema.fields.filter((f) => f.id !== fieldId),
          steps: state.schema.steps.map((step) =>
            step.id === stepId
              ? { ...step, fields: [...step.fields, field] }
              : { ...step, fields: step.fields.filter((f) => f.id !== fieldId) }
          ),
        },
      };
    }),

  setCurrentStep: (step) => set({ currentStep: step }),

  exportSchema: () => get().schema,

  exportReactComponent: () => {
    const { schema } = get();

    // Generate Zod schema
    const zodSchema = `const formSchema = z.object({\n${schema.fields
      .map((field) => {
        let zodType = "";
        switch (field.type) {
          case "text":
          case "textarea":
            zodType = "z.string()";
            if (field.validation?.min)
              zodType += `.min(${field.validation.min}${
                field.validation.message
                  ? `, { message: "${field.validation.message}" }`
                  : ""
              })`;
            if (field.validation?.max)
              zodType += `.max(${field.validation.max})`;
            if (field.validation?.pattern)
              zodType += `.regex(/${field.validation.pattern}/)`;
            break;
          case "email":
            zodType = "z.string().email()";
            break;
          case "password":
            zodType = field.validation?.min
              ? `z.string().min(${field.validation.min}${
                  field.validation.message
                    ? `, { message: "${field.validation.message}" }`
                    : ""
                })`
              : "z.string().min(6)";
            if (field.validation?.max)
              zodType = zodType.replace(")", `.max(${field.validation.max})`);
            if (field.validation?.pattern)
              zodType = zodType.replace(
                ")",
                `.regex(/${field.validation.pattern}/)`
              );
            break;
          case "url":
            zodType = "z.string().url()";
            break;
          case "tel":
            zodType = "z.string()";
            break;
          case "date":
          case "time":
          case "datetime-local":
            zodType = "z.string()";
            break;
          case "file":
            zodType = "z.any()";
            break;
          case "number":
            zodType =
              field.validation?.min || field.validation?.max
                ? `z.number()${
                    field.validation.min ? `.min(${field.validation.min})` : ""
                  }${
                    field.validation.max ? `.max(${field.validation.max})` : ""
                  }`
                : "z.number()";
            break;
          case "select":
          case "radio":
            zodType = field.options
              ? `z.enum([${field.options.map((opt) => `"${opt}"`).join(", ")}])`
              : "z.string()";
            break;
          case "checkbox":
            zodType = "z.boolean()";
            break;
          default:
            zodType = "z.string()";
        }
        if (!field.required) zodType += ".optional()";
        return `  '${field.id}': ${zodType}`;
      })
      .join(",\n")}\n});`;

    return `/*
 * Generated React Component with TypeScript and Zod validation
 * 
 * Required dependencies:
 * npm install react-hook-form @hookform/resolvers zod
 * 
 * This is a TypeScript React component (.tsx file)
 */

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Zod validation schema
${zodSchema}

type FormData = z.infer<typeof formSchema>;

export default function ${schema.title.replace(/\s+/g, "")}Form() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">${schema.title}</h2>
        ${
          schema.description
            ? `<p className="text-gray-600">${schema.description}</p>`
            : ""
        }
      </div>
      
      ${schema.fields
        .map((field) => {
          switch (field.type) {
            case "text":
            case "email":
            case "password":
            case "number":
            case "tel":
            case "url":
            case "date":
            case "time":
            case "datetime-local":
            case "file":
              return `<div>
        <label className="block text-sm font-medium mb-1">${field.label}</label>
        <input
          type="${field.type}"
          placeholder="${field.placeholder || ""}"
          {...register('${field.id}', { required: ${field.required} })}
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors['${
          field.id
        }'] && <span className="text-red-500 text-sm">This field is required</span>}
      </div>`;
            case "textarea":
              return `<div>
        <label className="block text-sm font-medium mb-1">${field.label}</label>
        <textarea
          placeholder="${field.placeholder || ""}"
          {...register('${field.id}', { required: ${field.required} })}
          className="w-full px-3 py-2 border rounded-md"
          rows={4}
        />
        {errors['${
          field.id
        }'] && <span className="text-red-500 text-sm">This field is required</span>}
      </div>`;
            case "select":
              return `<div>
        <label className="block text-sm font-medium mb-1">${field.label}</label>
        <select
          {...register('${field.id}', { required: ${field.required} })}
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="">Select an option</option>
          ${field.options
            ?.map((opt) => `<option value="${opt}">${opt}</option>`)
            .join("\n          ")}
        </select>
        {errors['${
          field.id
        }'] && <span className="text-red-500 text-sm">This field is required</span>}
      </div>`;
            case "checkbox":
              return `<div className="flex items-center space-x-2">
        <input
          type="checkbox"
          {...register('${field.id}', { required: ${field.required} })}
          className="rounded"
        />
        <label className="text-sm font-medium">${field.label}</label>
      </div>`;
            default:
              return "";
          }
        })
        .join("\n      ")}
      
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
}`;
  },
}));
