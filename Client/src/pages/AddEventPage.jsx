import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

function AddEventPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '', description: '', location: '',
    event_date: '', price: '', available_tickets: '', image_url: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.post('/events', form);
      navigate('/events');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create event.');
    } finally {
      setLoading(false);
    }
  }

  const inputClass = 'w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500';
  const labelClass = 'block text-sm font-medium text-slate-300 mb-1';

  return (
    <div className='bg-slate-900 min-h-screen py-12 px-6'>
      <div className='max-w-2xl mx-auto'>

        <div className='mb-8'>
          <h1 className='text-3xl font-extrabold text-white'>Create New Event</h1>
          <p className='text-slate-400 mt-1'>Fill in the details to publish a new event.</p>
        </div>

        <div className='bg-slate-800 rounded-3xl border border-slate-700 p-8'>
          <form onSubmit={handleSubmit} className='space-y-5'>

            <div>
              <label className={labelClass}>Event Title</label>
              <input name='title' value={form.title} onChange={handleChange}
                placeholder='e.g. Summer Music Festival' className={inputClass} required />
            </div>

            <div>
              <label className={labelClass}>Description</label>
              <textarea name='description' value={form.description} onChange={handleChange}
                placeholder='Describe the event...' rows={4}
                className={`${inputClass} resize-none`} required />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
              <div>
                <label className={labelClass}>Location</label>
                <input name='location' value={form.location} onChange={handleChange}
                  placeholder='e.g. Nairobi, Kenya' className={inputClass} required />
              </div>

              <div>
                <label className={labelClass}>Date</label>
                <input name='event_date' type='datetime-local' value={form.event_date}
                  onChange={handleChange} className={inputClass} required />
              </div>

              <div>
                <label className={labelClass}>Price ($)</label>
                <input name='price' type='number' min='0' step='0.01' value={form.price}
                  onChange={handleChange} placeholder='0.00' className={inputClass} required />
              </div>

              <div>
                <label className={labelClass}>Available Tickets</label>
                <input name='available_tickets' type='number' min='1' value={form.available_tickets}
                  onChange={handleChange} placeholder='e.g. 100' className={inputClass} required />
              </div>
            </div>

            <div>
              <label className={labelClass}>Image URL</label>
              <input name='image_url' value={form.image_url} onChange={handleChange}
                placeholder='https://...' className={inputClass} />
              {form.image_url && (
                <img src={form.image_url} alt='preview'
                  className='mt-3 w-full h-40 object-cover rounded-xl'
                  onError={e => e.target.classList.add('hidden')} />
              )}
            </div>

            {error && (
              <div className='bg-red-900/40 border border-red-700 text-red-300 text-sm px-4 py-3 rounded-xl'>
                {error}
              </div>
            )}

            <div className='flex gap-3 pt-2'>
              <button type='button' onClick={() => navigate(-1)}
                className='flex-1 border border-slate-600 text-slate-300 font-medium py-3 rounded-xl hover:bg-slate-700 transition'>
                Cancel
              </button>
              <button type='submit' disabled={loading}
                className='flex-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition'>
                {loading ? 'Publishing...' : 'Publish Event'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default AddEventPage;
