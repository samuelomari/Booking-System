import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import EventCard from '../components/EvantCard';

function HomePage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await api.get('/events');
        setEvents(response.data.slice(0, 3));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  return (
    <div className='bg-slate-900 min-h-screen'>

      {/* Hero */}
      <div className='bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-900 py-24 px-6 border-b border-slate-800'>
        <div className='max-w-4xl mx-auto text-center'>
          <span className='inline-block bg-indigo-900 text-indigo-300 text-xs font-semibold px-4 py-1 rounded-full mb-6 tracking-widest uppercase'>
            Live Events
          </span>
          <h1 className='text-5xl md:text-6xl font-extrabold text-white leading-tight'>
            Discover Amazing Events
          </h1>
          <p className='mt-5 text-lg text-slate-400'>
            Book tickets for concerts, sports, conferences, and more.
          </p>
          <Link
            to='/events'
            className='inline-block mt-8 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3 rounded-full transition'
          >
            Browse Events
          </Link>
        </div>
      </div>

      {/* Featured Events */}
      <div className='max-w-6xl mx-auto px-6 py-16'>
        <h2 className='text-2xl font-bold text-white'>Featured Events</h2>
        <p className='mt-1 text-slate-400'>Handpicked events ready to book.</p>

        <div className='mt-8'>
          {loading ? (
            <p className='text-slate-500'>Loading events...</p>
          ) : events.length ? (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {events.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <p className='text-slate-500'>No events available yet.</p>
          )}
        </div>

        {events.length > 0 && (
          <div className='mt-10 text-center'>
            <Link
              to='/events'
              className='inline-block bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-8 py-3 rounded-full transition font-semibold'
            >
              View All Events →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
