import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../services/api';

// Generic GET hook
export const useFetch = <T>(key: string[], url: string, options = {}) => {
  return useQuery<T>({
    queryKey: key,
    queryFn: async () => {
      const response = await apiClient.get<T>(url);
      return response.data;
    },
    ...options,
  });
};

// Generic POST hook
export const usePost = <T, U>(key: string[], url: string, options = {}) => {
  const queryClient = useQueryClient();
  
  return useMutation<T, Error, U>({
    mutationFn: async (data: U) => {
      const response = await apiClient.post<T>(url, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key });
    },
    ...options,
  });
};

// Generic PUT hook
export const useUpdate = <T, U>(key: string[], url: string, options = {}) => {
  const queryClient = useQueryClient();
  
  return useMutation<T, Error, U>({
    mutationFn: async (data: U) => {
      const response = await apiClient.put<T>(url, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key });
    },
    ...options,
  });
};

// Generic DELETE hook
export const useDelete = <T>(key: string[], url: string, options = {}) => {
  const queryClient = useQueryClient();
  
  return useMutation<T, Error, string>({
    mutationFn: async (id: string) => {
      const response = await apiClient.delete<T>(`${url}/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key });
    },
    ...options,
  });
};