// import useSlots from '../../hooks/useSlots';
import { FaCalendarAlt, FaTrash, FaClock } from 'react-icons/fa';
import { Link } from 'react-router';

const MySlots = () => {
  const { slots, deleteSlot } = useSlots();

  const handleDelete = (id) => {
    if (window.confirm('Delete this slot? This cannot be undone.')) {
      deleteSlot(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-base-content">My Slots</h2>
          <p className="text-base-content/60 mt-1">All your created slots ({slots.length} total)</p>
        </div>
        <Link to="/dashboard/add-slot" className="btn btn-primary btn-sm gap-2">
          <FaCalendarAlt size={14} /> Add New Slot
        </Link>
      </div>

      {slots.length === 0 ? (
        <div className="card bg-base-100 shadow-sm border border-base-300">
          <div className="card-body items-center text-center py-16">
            <FaClock size={40} className="text-base-content/20 mb-4" />
            <h3 className="text-lg font-semibold text-base-content/60">No slots yet</h3>
            <p className="text-base-content/40 text-sm">Start by adding your first time slot.</p>
            <Link to="/dashboard/add-slot" className="btn btn-primary btn-sm mt-4">Add Slot</Link>
          </div>
        </div>
      ) : (
        <div className="card bg-base-100 shadow-sm border border-base-300">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="bg-base-200">
                  <th>#</th>
                  <th>Date</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Duration</th>
                  <th>Status</th>
                  <th>Booked By</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {slots.map((slot, index) => (
                  <tr key={slot.id} className="hover">
                    <td className="text-base-content/50 text-sm">{index + 1}</td>
                    <td className="font-medium">
                      {new Date(slot.startDateTime).toLocaleDateString('en-US', {
                        weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
                      })}
                    </td>
                    <td>{slot.time}</td>
                    <td>
                      {new Date(slot.endDateTime).toLocaleTimeString('en-US', {
                        hour: '2-digit', minute: '2-digit',
                      })}
                    </td>
                    <td><span className="badge badge-ghost badge-sm">15 min</span></td>
                    <td>
                      <span className={`badge badge-sm font-medium ${slot.status === 'available' ? 'badge-success' : 'badge-warning'}`}>
                        {slot.status === 'available' ? 'Available' : 'Booked'}
                      </span>
                    </td>
                    <td className="text-sm text-base-content/70">
                      {slot.bookedBy ? (
                        <div>
                          <p className="font-medium">{slot.bookedBy.name}</p>
                          <p className="text-xs text-base-content/50">{slot.bookedBy.email}</p>
                        </div>
                      ) : (
                        <span className="text-base-content/30">—</span>
                      )}
                    </td>
                    <td>
                      {slot.status === 'available' && (
                        <button
                          onClick={() => handleDelete(slot.id)}
                          className="btn btn-ghost btn-xs text-error hover:bg-error/10"
                        >
                          <FaTrash size={13} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MySlots;
