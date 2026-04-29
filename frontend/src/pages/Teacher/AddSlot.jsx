import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
// import useSlots from '../../hooks/useSlots';
import { FaCalendarPlus, FaInfoCircle } from 'react-icons/fa';
import { useState } from 'react';

const AddSlot = () => {
  const { user } = useAuth();
  const { addSlot } = useSlots();
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', msg }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const result = addSlot(data.date, data.time, user?.displayName || user?.email || 'Teacher');
    if (result.success) {
      setFeedback({ type: 'success', msg: 'Slot added successfully! It is now 15 minutes long.' });
      reset();
    } else {
      setFeedback({ type: 'error', msg: result.error });
    }
    setTimeout(() => setFeedback(null), 4000);
  };

  // Min date = today in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-2xl font-bold text-base-content">Add New Slot</h2>
        <p className="text-base-content/60 mt-1">Create a 15-minute time slot for students to book.</p>
      </div>

      {feedback && (
        <div className={`alert ${feedback.type === 'success' ? 'alert-success' : 'alert-error'} shadow-sm`}>
          <span>{feedback.msg}</span>
        </div>
      )}

      <div className="card bg-base-100 shadow-sm border border-base-300">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Date</span>
              </label>
              <input
                type="date"
                min={today}
                className={`input input-bordered w-full ${errors.date ? 'input-error' : ''}`}
                {...register('date', { required: 'Date is required' })}
              />
              {errors.date && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.date.message}</span>
                </label>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Start Time</span>
              </label>
              <input
                type="time"
                className={`input input-bordered w-full ${errors.time ? 'input-error' : ''}`}
                {...register('time', { required: 'Start time is required' })}
              />
              {errors.time && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.time.message}</span>
                </label>
              )}
            </div>

            <div className="flex items-start gap-2 p-3 bg-info/10 rounded-lg border border-info/30">
              <FaInfoCircle className="text-info mt-0.5 shrink-0" size={15} />
              <p className="text-sm text-base-content/70">
                Each slot is automatically set to <strong>15 minutes</strong>. The system will check for overlaps with existing slots before saving.
              </p>
            </div>

            <button type="submit" className="btn btn-primary gap-2 w-full sm:w-auto">
              <FaCalendarPlus size={16} /> Add Slot
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSlot;
