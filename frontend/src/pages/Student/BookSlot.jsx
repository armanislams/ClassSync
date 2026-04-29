import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useSlots from '../../hooks/useSlots';
import { FaCalendarAlt, FaClock, FaCheck } from 'react-icons/fa';
import { toast } from 'react-toastify';

const BookSlot = () => {
  const { user } = useAuth();
  const { availableSlots, bookSlot } = useSlots();
  const [confirming, setConfirming] = useState(null);
  const handleBook = async (slot) => {
    const result = await bookSlot(slot.id, user?.displayName || 'Student', user?.email);
    if(result.success) {
      toast.success('Slot booked successfully! Check My Bookings for details.');
      setConfirming(null);
    } else {
      toast.error(result.error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-base-content">Book a Slot</h2>
        <p className="text-base-content/60 mt-1">
          Choose from {availableSlots.length} available time slot{availableSlots.length !== 1 ? 's' : ''}.
        </p>
      </div>

      {availableSlots.length === 0 ? (
        <div className="card bg-base-100 shadow-sm border border-base-300">
          <div className="card-body items-center text-center py-16">
            <FaCalendarAlt size={40} className="text-base-content/20 mb-4" />
            <h3 className="text-lg font-semibold text-base-content/60">No available slots</h3>
            <p className="text-base-content/40 text-sm">Check back later — a teacher hasn't added any slots yet.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableSlots.map((slot) => (
            <div
              key={slot.id}
              className="card bg-base-100 shadow-sm border border-base-300 hover:shadow-md hover:border-primary/40 transition-all"
            >
              <div className="card-body gap-3">
                <div className="flex items-center justify-between">
                  <span className="badge badge-success badge-sm">Available</span>
                  <span className="badge badge-ghost badge-sm">15 min</span>
                </div>

                <div>
                  <p className="font-semibold text-base-content">
                    {new Date(slot.startDateTime).toLocaleDateString('en-US', {
                      weekday: 'long', month: 'long', day: 'numeric',
                    })}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-base-content/70 text-sm">
                    <FaClock size={12} />
                    <span>
                      {new Date(slot.startDateTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      {' '}—{' '}
                      {new Date(slot.endDateTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-xs text-base-content/50 mt-1">Teacher: {slot.teacherName}</p>
                </div>

                {confirming === slot.id ? (
                  <div className="flex gap-2 mt-1">
                    <button
                      onClick={() => handleBook(slot)}
                      className="btn btn-primary btn-sm flex-1"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => setConfirming(null)}
                      className="btn btn-ghost btn-sm flex-1"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirming(slot.id)}
                    className="btn btn-primary btn-sm mt-1 w-full"
                  >
                    Book This Slot
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookSlot;
