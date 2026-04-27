import { useState } from 'react';

export interface UseExampleStateResult<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

export function useExampleState<T>(initialData: T | null = null): UseExampleStateResult<T> {
  const [data] = useState<T | null>(initialData);
  const [isLoading] = useState(false);
  const [error] = useState<string | null>(null);

  return {
    data,
    isLoading,
    error,
  };
}