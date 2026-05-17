import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import { AuthContext } from '../contexts/AuthContext';

function EventDetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    async function fetchEvent() {
      const response = await api.get(`/events/${id}`);
      setEvent(response.data);
    }
    fetchEvent();
  }, [id]);

  const { user } = useContext(AuthContext);

  async function handleBooking() {
    await api.post('/bookings', { eventId: id, quantity: 1, userEmail: user?.email });
    setBooked(true);
  }

  if (!event) return (
    <div className='min-h-screen bg-slate-900 flex items-center justify-center text-slate-500'>
      Loading...
    </div>
  );

  return (
    <div className='bg-slate-900 min-h-screen py-12 px-6'>
      <div className='max-w-4xl mx-auto'>
        <div className='bg-slate-800 rounded-3xl overflow-hidden border border-slate-700'>
          <img
            src={event.image_url}
            alt={event.title}
            className='w-full h-72 object-cover'
          />

          <div className='p-8'>
            <h1 className='text-4xl font-extrabold text-white'>{event.title}</h1>

            <div className='flex flex-wrap gap-4 mt-4 text-sm text-slate-400'>
              <span>📍 {event.location}</span>
              {event.event_date && (
                <span>📅 {new Date(event.event_date).toLocaleDateString()}</span>
              )}
            </div>

            <p className='mt-6 text-slate-300 leading-relaxed'>{event.description}</p>

            <div className='mt-8 flex items-center justify-between'>
              <span className='text-3xl font-bold text-indigo-400'>${event.price}</span>

              {booked ? (
                <span className='bg-green-900 text-green-300 font-semibold px-6 py-3 rounded-xl border border-green-700'>
                  ✅ Booking Confirmed!
                </span>
              ) : (
                <button
                  onClick={handleBooking}
                  className='bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3 rounded-xl transition'
                >
                  Book Ticket
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetailsPage;
