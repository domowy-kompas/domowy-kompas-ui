import { useEffect, useState } from 'react';

export interface UseExampleStateResult<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

export function useExampleState<T>(initialData: T | null = null): UseExampleStateResult<T> {
  const [data, setData] = useState<T | null>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  return {
    data,
    isLoading,
    error,
  };
}