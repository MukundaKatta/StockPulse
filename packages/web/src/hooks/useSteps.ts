'use client';

import { useCallback, useState } from 'react';

interface UseStepsReturn {
  currentStep: number;
  totalSteps: number;
  isFirst: boolean;
  isLast: boolean;
  goToStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
  progress: number;
}

export function useSteps(totalSteps: number, initialStep = 0): UseStepsReturn {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const goToStep = useCallback((step: number) => {
    setCurrentStep(Math.max(0, Math.min(step, totalSteps - 1)));
  }, [totalSteps]);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
  }, [totalSteps]);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const reset = useCallback(() => {
    setCurrentStep(initialStep);
  }, [initialStep]);

  return {
    currentStep,
    totalSteps,
    isFirst: currentStep === 0,
    isLast: currentStep === totalSteps - 1,
    goToStep,
    nextStep,
    prevStep,
    reset,
    progress: totalSteps > 1 ? (currentStep / (totalSteps - 1)) * 100 : 100,
  };
}
