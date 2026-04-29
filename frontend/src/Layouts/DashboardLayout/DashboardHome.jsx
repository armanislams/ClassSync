import useAuth from '../../hooks/useAuth';
// import useSlots from '../../hooks/useSlots';
import { FaCalendarAlt, FaCheckCircle, FaClock, FaUserGraduate } from 'react-icons/fa';
import { Link } from 'react-router';

const DashboardHome = () => {
  const { user } = useAuth();
  const { slots, availableSlots, bookedSlots } = useSlots();
  const role = localStorage.getItem('classsync_role') || 'student';
  const isTeacher = role === 'teacher';

  const StatCard = ({ icon, label, value, color }) => (
    <div className="card bg-base-100 shadow-sm border border-base-300 hover:shadow-md transition-shadow">
      <div className="card-body flex-row items-center gap-4 py-5">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
          {icon}
        </div>
        <div>
          <p className="text-3xl font-bold text-base-content">{value}</p>
          <p className="text-sm text-base-content/60">{label}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-base-content">Dashboard Overview</h2>
        <p className="text-base-content/60 mt-1">
          {isTeacher ? `Manage your class schedule, ${user?.displayName || 'Teacher'}` : `Find and book available slots, ${user?.displayName || 'Student'}`}
        </p>
      </div>

      {/* Stats Grid */}
      {isTeacher ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            icon={<FaCalendarAlt className="text-primary-content" size={20} />}
            label="Total Slots Created"
            value={slots.length}
            color="bg-primary"
          />
          <StatCard
            icon={<FaClock className="text-success-content" size={20} />}
            label="Available Slots"
            value={availableSlots.length}
            color="bg-success"
          />
          <StatCard
            icon={<FaCheckCircle className="text-secondary-content" size={20} />}
            label="Booked Slots"
            value={bookedSlots.length}
            color="bg-secondary"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StatCard
            icon={<FaClock className="text-primary-content" size={20} />}
            label="Available Slots"
            value={availableSlots.length}
            color="bg-primary"
          />
          <StatCard
            icon={<FaUserGraduate className="text-secondary-content" size={20} />}
            label="My Bookings"
            value={bookedSlots.filter((s) => s.bookedBy?.email === user?.email).length}
            color="bg-secondary"
          />
        </div>
      )}

      {/* Quick Actions */}
      <div className="card bg-base-100 shadow-sm border border-base-300">
        <div className="card-body">
          <h3 className="card-title text-base">Quick Actions</h3>
          <div className="flex flex-wrap gap-3 mt-2">
            {isTeacher ? (
              <>
                <Link to="/dashboard/add-slot" className="btn btn-primary btn-sm gap-2">
                  <FaCalendarAlt size={14} /> Add New Slot
                </Link>
                <Link to="/dashboard/my-slots" className="btn btn-outline btn-sm gap-2">
                  <FaClock size={14} /> View All Slots
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard/book-slot" className="btn btn-primary btn-sm gap-2">
                  <FaCalendarAlt size={14} /> Book a Slot
                </Link>
                <Link to="/dashboard/my-bookings" className="btn btn-outline btn-sm gap-2">
                  <FaUserGraduate size={14} /> My Bookings
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Recent Slots preview */}
      {isTeacher && slots.length > 0 && (
        <div className="card bg-base-100 shadow-sm border border-base-300">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <h3 className="card-title text-base">Recent Slots</h3>
              <Link to="/dashboard/my-slots" className="text-sm text-primary hover:underline">View all</Link>
            </div>
            <div className="overflow-x-auto mt-2">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Duration</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {slots.slice(0, 5).map((slot) => (
                    <tr key={slot.id}>
                      <td>{new Date(slot.startDateTime).toLocaleDateString()}</td>
                      <td>{slot.time}</td>
                      <td>15 min</td>
                      <td>
                        <span className={`badge badge-sm ${slot.status === 'available' ? 'badge-success' : 'badge-warning'}`}>
                          {slot.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {!isTeacher && availableSlots.length > 0 && (
        <div className="card bg-base-100 shadow-sm border border-base-300">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <h3 className="card-title text-base">Available Slots</h3>
              <Link to="/dashboard/book-slot" className="text-sm text-primary hover:underline">Book now</Link>
            </div>
            <div className="overflow-x-auto mt-2">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Teacher</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {availableSlots.slice(0, 5).map((slot) => (
                    <tr key={slot.id}>
                      <td>{new Date(slot.startDateTime).toLocaleDateString()}</td>
                      <td>{slot.time}</td>
                      <td>{slot.teacherName}</td>
                      <td>
                        <Link to="/dashboard/book-slot" className="btn btn-xs btn-primary">Book</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
