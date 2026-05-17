import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import api from '../api/api';

function DashboardPage() {
  const { user, isAdmin, authLoading } = useContext(AuthContext);
  const [summary, setSummary] = useState(null);
  const [statsLoading, setStatsLoading] = useState(false);
  const [statsError, setStatsError] = useState('');

  useEffect(() => {
    async function loadStats() {
      if (!isAdmin || !user?.email) return;
      setStatsLoading(true);
      setStatsError('');
      try {
        const response = await api.get('/bookings/summary');
        setSummary(response.data);
      } catch (err) {
        setStatsError(err?.response?.data?.error || 'Unable to load stats.');
      } finally {
        setStatsLoading(false);
      }
    }
    if (!authLoading) loadStats();
  }, [authLoading, isAdmin, user]);

  return (
    <div className='bg-slate-900 min-h-screen py-12 px-6'>
      <div className='max-w-5xl mx-auto'>

        {/* Header */}
        <div className='bg-gradient-to-br from-indigo-900 to-slate-800 rounded-3xl p-8 border border-indigo-800'>
          <h1 className='text-3xl font-extrabold text-white'>Dashboard</h1>
          <p className='mt-2 text-slate-400'>Welcome back, {user?.email ?? 'Guest'}!</p>
          {isAdmin && (
            <span className='mt-3 inline-block bg-indigo-600/30 text-indigo-300 text-xs font-semibold px-4 py-1 rounded-full border border-indigo-600'>
              Admin Access
            </span>
          )}
        </div>

        <div className='grid grid-cols-1 xl:grid-cols-[1.4fr_0.9fr] gap-6 mt-8'>
          <div className='space-y-6'>

            {/* Stats */}
            <div className='bg-slate-800 rounded-3xl border border-slate-700 p-6'>
              <h2 className='text-lg font-bold text-white'>Overview</h2>
              <div className='mt-5 grid grid-cols-2 gap-4'>
                <div className='bg-slate-900 rounded-2xl p-5 border border-slate-700'>
                  <p className='text-sm text-slate-400'>Total Events</p>
                  <p className='mt-2 text-3xl font-bold text-white'>{summary?.total_events ?? '—'}</p>
                </div>
                <div className='bg-slate-900 rounded-2xl p-5 border border-slate-700'>
                  <p className='text-sm text-slate-400'>Tickets Sold</p>
                  <p className='mt-2 text-3xl font-bold text-white'>{summary?.tickets_sold ?? '—'}</p>
                </div>
              </div>
            </div>

            {/* Admin Stats */}
            {isAdmin && (
              <div className='bg-slate-800 rounded-3xl border border-slate-700 p-6'>
                <h2 className='text-lg font-bold text-white'>Admin Stats</h2>

                {statsLoading ? (
                  <p className='mt-4 text-sm text-slate-500'>Loading stats...</p>
                ) : statsError ? (
                  <p className='mt-4 text-sm text-red-400'>{statsError}</p>
                ) : summary ? (
                  <div className='mt-5 space-y-4'>
                    <div className='grid grid-cols-2 gap-4'>
                      <div className='bg-slate-900 rounded-2xl p-4 border border-slate-700'>
                        <p className='text-sm text-slate-400'>Bookings</p>
                        <p className='mt-1 text-2xl font-bold text-white'>{summary.bookings_count}</p>
                      </div>
                      <div className='bg-slate-900 rounded-2xl p-4 border border-slate-700'>
                        <p className='text-sm text-slate-400'>Events with Sales</p>
                        <p className='mt-1 text-2xl font-bold text-white'>{summary.events_with_sales}</p>
                      </div>
                    </div>

                    {summary.by_event?.length > 0 && (
                      <div className='bg-slate-900 rounded-2xl p-4 border border-slate-700'>
                        <p className='text-sm font-semibold text-slate-300 mb-3'>Top Events</p>
                        <div className='space-y-2'>
                          {summary.by_event.map(item => (
                            <div key={item.id} className='flex justify-between items-center text-sm'>
                              <span className='text-slate-400'>{item.title}</span>
                              <span className='text-white font-semibold'>{item.tickets_sold || 0}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className='mt-4 text-sm text-slate-500'>No stats available.</p>
                )}
              </div>
            )}
          </div>

          <div className='space-y-6'>
            {/* Manage Events */}
            <div className='bg-slate-800 rounded-3xl border border-slate-700 p-6'>
              <div className='text-3xl mb-3'>📅</div>
              <h2 className='text-lg font-bold text-white'>Manage Events</h2>
              <p className='mt-2 text-sm text-slate-400'>Create new events for users to discover and book.</p>
              {isAdmin ? (
                <Link
                  to='/events/new'
                  className='mt-5 inline-flex w-full items-center justify-center bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm px-5 py-3 rounded-xl transition'
                >
                  + Add Event
                </Link>
              ) : (
                <p className='mt-4 text-sm text-slate-500'>Only admins can add events.</p>
              )}
            </div>

            {/* My Bookings */}
            <div className='bg-slate-800 rounded-3xl border border-slate-700 p-6'>
              <div className='text-3xl mb-3'>🎟</div>
              <h2 className='text-lg font-bold text-white'>My Bookings</h2>
              <p className='mt-2 text-sm text-slate-400'>Review your upcoming ticket bookings.</p>
              <Link
                to='/bookings'
                className='mt-5 inline-flex w-full items-center justify-center bg-slate-700 hover:bg-slate-600 text-white font-semibold text-sm px-5 py-3 rounded-xl transition border border-slate-600'
              >
                View Bookings →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
