import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import PriorityForm from './PriorityForm';

// Mock constants
jest.mock('../../utils/constants', () => ({
  IMPACT_LEVELS: [
    { value: 'high', label: 'High - Service unusable' },
    { value: 'medium', label: 'Medium - Service degraded' },
    { value: 'low', label: 'Low - Minimal impact' }
  ],
  URGENCY_LEVELS: [
    { value: 'high', label: 'High - Work cannot continue' },
    { value: 'medium', label: 'Medium - Needs attention soon' },
    { value: 'low', label: 'Low - Can wait' }
  ]
}));

// Mock helpers
jest.mock('../../utils/helpers', () => ({
  calculatePriority: (impact, urgency) => {
    if (impact === 'high' && urgency === 'high') return '1Critical';
    if ((impact === 'high' && urgency === 'medium') || 
        (impact === 'medium' && urgency === 'high')) return '2High';
    return '3Medium';
  }
}));

// Mock styles
jest.mock('../../styles', () => ({
  useStyles: () => ({
    input: 'mock-input-class'
  })
}));

describe('PriorityForm', () => {
  // Helper function to interact with Material-UI Select
  const selectOption = async (labelText: RegExp, optionText: string) => {
    // Find and click the select element to open dropdown
    const select = screen.getByLabelText(labelText);
    fireEvent.mouseDown(select);

    // Find and click the option
    const option = await screen.findByText(optionText);
    fireEvent.click(option);
  };

  // Render helper that sets up the form context
  const renderForm = (errors = {}) => {
    const defaultValues = { impact: '', urgency: '' };
    const methods = useForm({ defaultValues });

    return render(
      <FormProvider {...methods}>
        <PriorityForm 
          control={methods.control}
          errors={errors}
        />
      </FormProvider>
    );
  };

  test('renders empty form fields initially', () => {
    renderForm();

    expect(screen.getByLabelText(/impact/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/urgency/i)).toBeInTheDocument();
    expect(screen.queryByText(/calculated incident priority/i)).not.toBeInTheDocument();
  });

  test('shows error messages', () => {
    const errors = {
      impact: { message: 'Impact is required' },
      urgency: { message: 'Urgency is required' }
    };

    renderForm(errors);

    expect(screen.getByText('Impact is required')).toBeInTheDocument();
    expect(screen.getByText('Urgency is required')).toBeInTheDocument();
  });

  test('calculates priority based on impact and urgency', async () => {
    renderForm();

    // Set high impact and urgency
    await selectOption(/impact/i, 'High - Service unusable');
    await selectOption(/urgency/i, 'High - Work cannot continue');

    // Check for critical priority
    await waitFor(() => {
      const priorityElement = screen.getByText((content) => {
        const text = content.toLowerCase();
        return text.includes('calculated incident priority') && 
               text.includes('1critical - p1');
      });
      expect(priorityElement).toBeInTheDocument();
    });

    // Set medium impact
    await selectOption(/impact/i, 'Medium - Service degraded');

    // Check for high priority
    await waitFor(() => {
      const priorityElement = screen.getByText((content) => {
        const text = content.toLowerCase();
        return text.includes('calculated incident priority') && 
               text.includes('2high - p2');
      });
      expect(priorityElement).toBeInTheDocument();
    });
  });

  test('handles form control updates', async () => {
    renderForm();

    // Select values
    await selectOption(/impact/i, 'Medium - Service degraded');
    await selectOption(/urgency/i, 'Medium - Needs attention soon');

    // Verify form state
    const impactSelect = screen.getByLabelText(/impact/i);
    const urgencySelect = screen.getByLabelText(/urgency/i);

    expect(impactSelect).toHaveTextContent('Medium - Service degraded');
    expect(urgencySelect).toHaveTextContent('Medium - Needs attention soon');

    // Verify priority calculation
    await waitFor(() => {
      const priorityElement = screen.getByText((content) => {
        const text = content.toLowerCase();
        return text.includes('calculated incident priority') && 
               text.includes('3medium - p3');
      });
      expect(priorityElement).toBeInTheDocument();
    });
  });
});

