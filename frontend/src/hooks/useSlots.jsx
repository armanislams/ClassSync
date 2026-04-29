import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxios from './useAxios';
import useAuth from './useAuth';
import useRole from './useRole';

const useSlots = () => {
  const axiosInstance = useAxios();
  const { user } = useAuth();
  const { role } = useRole();
  const queryClient = useQueryClient();
  const isTeacher = role === 'teacher';

  // 1. Fetch Teacher's Slots
  const { data: teacherSlotsData, isLoading: loadingTeacherSlots } = useQuery({
    queryKey: ['slots', 'teacher', user?.email],
    enabled: !!user?.email && isTeacher,
    queryFn: async () => {
      const res = await axiosInstance.get(`/slots/teacher/${user.email}`);
      return res.data.slots.map(slot => ({ ...slot, id: slot._id }));
    },
    initialData: [],
  });

  // 2. Fetch Available Slots (For both, mainly students to book)
  const { data: availableSlotsData, isLoading: loadingAvailable } = useQuery({
    queryKey: ['slots', 'available'],
    queryFn: async () => {
      const res = await axiosInstance.get('/slots/available');
      return res.data.slots.map(slot => ({ ...slot, id: slot._id }));
    },
    initialData: [],
  });

  // 3. Fetch Student's Bookings
  const { data: studentBookingsData, isLoading: loadingStudentBookings } = useQuery({
    queryKey: ['slots', 'student', user?.email],
    enabled: !!user?.email && !isTeacher,
    queryFn: async () => {
      const res = await axiosInstance.get(`/slots/student/${user.email}`);
      return res.data.slots.map(slot => ({ ...slot, id: slot._id }));
    },
    initialData: [],
  });

  // For compatibility with previous synchronous array code
  const slots = isTeacher ? teacherSlotsData : [];
  const availableSlots = isTeacher 
      ? teacherSlotsData.filter(s => s.status === 'available') 
      : availableSlotsData;
  const bookedSlots = isTeacher 
      ? teacherSlotsData.filter(s => s.status === 'booked')
      : studentBookingsData;

  // Mutations
  const addSlotMutation = useMutation({
    mutationFn: async ({ date, time, teacherName }) => {
      const res = await axiosInstance.post('/slots', {
        teacherEmail: user.email,
        teacherName,
        date,
        time,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['slots', 'teacher', user?.email]);
    },
  });

  const bookSlotMutation = useMutation({
    mutationFn: async ({ slotId, studentName, studentEmail }) => {
      const res = await axiosInstance.put(`/slots/${slotId}/book`, {
        studentName,
        studentEmail,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['slots', 'available']);
      queryClient.invalidateQueries(['slots', 'student', user?.email]);
    },
  });

  const deleteSlotMutation = useMutation({
    mutationFn: async (slotId) => {
      const res = await axiosInstance.delete(`/slots/${slotId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['slots', 'teacher', user?.email]);
    },
  });

  // Helper functions matching previous signature
  const addSlot = async (date, time, teacherName) => {
    try {
      await addSlotMutation.mutateAsync({ date, time, teacherName });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Error adding slot' };
    }
  };

  const bookSlot = async (slotId, studentName, studentEmail) => {
    try {
      await bookSlotMutation.mutateAsync({ slotId, studentName, studentEmail });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Error booking slot' };
    }
  };

  const deleteSlot = async (slotId) => {
    try {
      await deleteSlotMutation.mutateAsync(slotId);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Error deleting slot' };
    }
  };

  return {
    slots, // teacher's slots
    availableSlots,
    bookedSlots,
    addSlot,
    bookSlot,
    deleteSlot,
    loading: loadingTeacherSlots || loadingAvailable || loadingStudentBookings,
  };
};

export default useSlots;
