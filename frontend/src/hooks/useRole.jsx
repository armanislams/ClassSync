import { useQuery } from '@tanstack/react-query';

import { toast } from 'react-toastify';
import useAuth from './useAuth';
import useAxios from './useAxios';

const useRole = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosInstance = useAxios();

  const { isLoading: roleLoading, data: role = "user" } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !authLoading && !!user?.email,
    queryFn: async () => {
      try {
        const res = await axiosInstance.get(`/users/${user.email}/role`);
        return res.data.role;
      } catch (error) {
        // If there's no response, it likely means the server is down / network error
        if (!error?.response) {
          toast.error("Internal Server Error");
        }
        throw error;
      }
    },
  });

  return {
    roleLoading: authLoading || roleLoading,
    role,
  };
};


export default useRole;