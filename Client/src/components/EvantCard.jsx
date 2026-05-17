import { Link } from 'react-router-dom';

function EventCard({ event }) {
  return (
    <div className='bg-slate-800 rounded-2xl overflow-hidden hover:ring-1 hover:ring-indigo-500 transition group'>
      <div className='overflow-hidden h-48'>
        <img
          src={event.image_url}
          alt={event.title}
          className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
        />
      </div>

      <div className='p-5'>
        <h2 className='text-base font-bold text-white truncate'>{event.title}</h2>
        <p className='text-sm text-slate-400 mt-1'>📍 {event.location}</p>

        <div className='flex items-center justify-between mt-4'>
          <span className='text-indigo-400 font-bold text-lg'>${event.price}</span>
          <Link
            to={`/events/${event.id}`}
            className='bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-4 py-2 rounded-lg transition'
          >
            View Event
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
