import React from 'react';
import { Link } from 'react-router';
import Logo from '../../components/common/logo';
import { ToastContainer } from 'react-toastify';

const Navbar = () => (
  <div className="navbar bg-base-100 shadow-sm fixed top-0 z-50">
    <div className="navbar-start">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </div>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li><a href="#features">Features</a></li>
          <li><a href="#how-it-works">How it Works</a></li>
          <li><a href="#teachers">For Teachers</a></li>
          <li><a href="#students">For Students</a></li>
        </ul>
      </div>
      {/* <a className="btn btn-ghost text-xl text-primary font-bold">ClassSync</a> */}
      <Logo/>
    </div>
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1 font-medium">
        <li><a href="#features">Features</a></li>
        <li><a href="#how-it-works">How it Works</a></li>
        <li><a href="#teachers">For Teachers</a></li>
        <li><a href="#students">For Students</a></li>
      </ul>
    </div>
    <div className="navbar-end gap-2">
      <Link to="/login" className="btn btn-ghost">Login</Link>
      <Link to="/register" className="btn btn-primary">Sign Up</Link>
    </div>
  </div>
);

const Hero = () => (
  <div className="hero min-h-screen bg-gradient-to-br from-base-200 to-base-100 pt-16">
    <div className="hero-content text-center">
      <div className="max-w-2xl">
        <div className="badge badge-primary badge-outline mb-4 p-3 font-semibold">Mini Class Scheduling System</div>
        <h1 className="text-6xl font-extrabold text-base-content tracking-tight mb-6">
          Effortless Class <span className="text-primary">Scheduling</span> for Everyone
        </h1>
        <p className="py-6 text-xl text-base-content/80">
          A seamless dashboard system for teachers to manage 15-minute time slots, and for students to book their classes without the hassle of overlapping schedules.
        </p>
        <div className="flex gap-4 justify-center mt-4">
          <Link to="/register" className="btn btn-primary btn-lg shadow-lg hover:-translate-y-1 transition-transform">Get Started Today</Link>
          <a href="#features" className="btn btn-outline btn-lg hover:-translate-y-1 transition-transform">Learn More</a>
        </div>
      </div>
    </div>
  </div>
);

const Features = () => (
  <section id="features" className="py-24 bg-base-100">
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Everything You Need to Manage Classes</h2>
        <p className="text-lg text-base-content/70 max-w-2xl mx-auto">Built with clear logic and a clean interface, our system ensures no double bookings and complete transparency between teachers and students.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            title: "Teacher Dashboard",
            desc: "Create and manage 15-minute time slots with ease. Track total created slots and view all upcoming classes in one clean interface.",
            icon: "👨‍🏫"
          },
          {
            title: "Smart Booking Logic",
            desc: "Built-in validation ensures time slots never overlap, and past time slots cannot be added. Keeping your schedule completely conflict-free.",
            icon: "⚙️"
          },
          {
            title: "Student View",
            desc: "Students can easily view all available slots and book them in real-time. Once booked, slots are instantly removed from availability.",
            icon: "🎓"
          }
        ].map((feature, i) => (
          <div key={i} className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-base-300">
            <div className="card-body items-center text-center">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="card-title text-xl mb-2">{feature.title}</h3>
              <p className="text-base-content/70">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const HowItWorks = () => (
  <section id="how-it-works" className="py-24 bg-base-200">
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">How It Works</h2>
        <p className="text-lg text-base-content/70">A simple, 3-step process to get your classes scheduled.</p>
      </div>
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
        {[
          { step: "1", title: "Create Slots", desc: "Teachers define available 15-min blocks." },
          { step: "2", title: "Students Book", desc: "Students select from the available slots." },
          { step: "3", title: "Class Scheduled", desc: "Both parties see the confirmed booking." }
        ].map((item, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center text-center max-w-xs">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-content flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-base-content/70">{item.desc}</p>
            </div>
            {index < 2 && (
              <div className="hidden md:block text-base-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="footer footer-center p-10 bg-base-300 text-base-content rounded">
    <nav className="grid grid-flow-col gap-4">
      <a className="link link-hover">About us</a>
      <a className="link link-hover">Contact</a>
      <a className="link link-hover">Jobs</a>
      <a className="link link-hover">Press kit</a>
    </nav>
    <aside>
      <p>Copyright © {new Date().getFullYear()} - All right reserved by ClassSync Inc.</p>
    </aside>
  </footer>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-base-100 font-sans selection:bg-primary selection:text-primary-content scroll-smooth">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Footer />
      <ToastContainer/>
    </div>
  );
}
