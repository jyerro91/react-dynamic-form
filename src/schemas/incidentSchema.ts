import { z } from 'zod';

// Define priority levels
const priorityEnum = z.enum(['low', 'medium', 'high']);
export type Priority = z.infer<typeof priorityEnum>;

// Define incident types
export const incidentTypeEnum = z.enum(['general', 'technical']);
export type IncidentType = z.infer<typeof incidentTypeEnum>;

// Base schema with common fields
export const baseIncidentSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title cannot exceed 50 characters'),
  description: z.string()
    .min(5, 'Description must be at least 5 characters'),
  date: z.string()
    .refine(val => !isNaN(Date.parse(val)), {
      message: 'Please enter a valid date',
    }),
});

// General incident schema
export const generalIncidentSchema = baseIncidentSchema.extend({
  priority: priorityEnum,
});

// Technical incident schema
export const technicalIncidentSchema = baseIncidentSchema.extend({
  component: z.string()
    .min(2, 'Component name must be at least 2 characters'),
  errorCode: z.string().optional(),
});

// Type definitions
export type BaseIncident = z.infer<typeof baseIncidentSchema>;
export type GeneralIncident = z.infer<typeof generalIncidentSchema>;
export type TechnicalIncident = z.infer<typeof technicalIncidentSchema>;
export type Incident = GeneralIncident | TechnicalIncident;

// Map incident types to schemas
export const incidentSchemaMap = {
  general: generalIncidentSchema,
  technical: technicalIncidentSchema,
} as const;

// Get schema for a specific incident type
export const getSchemaForType = (type: IncidentType) => {
  return incidentSchemaMap[type];
};

// Get default values for a specific incident type
export const getDefaultValuesForType = (type: IncidentType): Partial<Incident> => {
  // Common default values
  const baseDefaults = {
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  };

  // Add type-specific defaults
  switch (type) {
    case 'general':
      return {
        ...baseDefaults,
        priority: 'medium' as Priority,
      };
    case 'technical':
      return {
        ...baseDefaults,
        component: '',
        errorCode: '',
      };
    default:
      return baseDefaults;
  }
};

// Simple field definitions for form rendering
export interface Field {
  name: string;
  label: string;
  type: 'text' | 'select' | 'date' | 'textarea' | 'radio';
  options?: string[];
  required?: boolean;
}

// Get fields for incident type
export const getFieldsForType = (type: IncidentType): Field[] => {
  // Common fields
  const baseFields: Field[] = [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea', required: true },
    { name: 'date', label: 'Date', type: 'date', required: true },
  ];

  // Type-specific fields
  switch (type) {
    case 'general':
      return [
        ...baseFields,
        { 
          name: 'priority', 
          label: 'Priority', 
          type: 'select', 
          options: Object.values(priorityEnum.enum),
          required: true 
        }
      ];
    case 'technical':
      return [
        ...baseFields,
        { name: 'component', label: 'Component', type: 'text', required: true },
        { name: 'errorCode', label: 'Error Code', type: 'text' }
      ];
    default:
      return baseFields;
  }
};

