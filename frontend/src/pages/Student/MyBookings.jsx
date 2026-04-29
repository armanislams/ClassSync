import useAuth from '../../hooks/useAuth';
import useSlots from '../../hooks/useSlots';
import { FaUserGraduate, FaClock } from 'react-icons/fa';
import { Link } from 'react-router';

const MyBookings = () => {
  const { user } = useAuth();
  const { bookedSlots } = useSlots();

  const myBookings = bookedSlots.filter((s) => s.bookedBy?.email === user?.email);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-base-content">My Bookings</h2>
        <p className="text-base-content/60 mt-1">You have {myBookings.length} booking{myBookings.length !== 1 ? 's' : ''}.</p>
      </div>

      {myBookings.length === 0 ? (
        <div className="card bg-base-100 shadow-sm border border-base-300">
          <div className="card-body items-center text-center py-16">
            <FaUserGraduate size={40} className="text-base-content/20 mb-4" />
            <h3 className="text-lg font-semibold text-base-content/60">No bookings yet</h3>
            <p className="text-base-content/40 text-sm">Browse available slots and book one today.</p>
            <Link to="/dashboard/book-slot" className="btn btn-primary btn-sm mt-4">Browse Slots</Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {myBookings.map((slot) => (
            <div key={slot.id} className="card bg-base-100 shadow-sm border border-warning/40 hover:shadow-md transition-all">
              <div className="card-body gap-3">
                <div className="flex items-center justify-between">
                  <span className="badge badge-warning badge-sm">Booked</span>
                  <span className="badge badge-ghost badge-sm">15 min</span>
                </div>

                <div>
                  <p className="font-semibold text-base-content">
                    {new Date(slot.startDateTime).toLocaleDateString('en-US', {
                      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
