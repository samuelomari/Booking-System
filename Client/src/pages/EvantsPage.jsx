import { useEffect, useState } from 'react';
import api from '../api/api';
import EventCard from '../components/EvantCard';

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await api.get('/events');
        setEvents(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  return (
    <div className='bg-slate-900 min-h-screen px-6 py-12'>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-4xl font-extrabold text-white'>Upcoming Events</h1>
        <p className='mt-2 text-slate-400'>Find and book your next experience.</p>

        <div className='mt-10'>
          {loading ? (
            <p className='text-slate-500'>Loading events...</p>
          ) : events.length ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {events.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className='bg-slate-800 rounded-2xl p-10 text-center text-slate-400 border border-slate-700'>
              No events found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventsPage;
