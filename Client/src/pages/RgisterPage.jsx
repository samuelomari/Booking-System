import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function RegisterPage() {
  const { register } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Unable to create account.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='min-h-screen bg-slate-900 flex items-center justify-center px-4'>
      <div className='w-full max-w-md bg-slate-800 rounded-3xl border border-slate-700 shadow-2xl p-8'>

        <div className='text-center mb-8'>
          <h1 className='text-3xl font-extrabold text-white'>Create account</h1>
          <p className='text-slate-400 mt-2'>Join TicketHub today</p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-5'>
          <div>
            <label className='block text-sm font-medium text-slate-300 mb-1'>Email</label>
            <input
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder='you@example.com'
              className='w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-300 mb-1'>Password</label>
            <input
              type='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder='Min. 6 characters'
              className='w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
              required
              minLength={6}
            />
          </div>

          {error && (
            <div className='bg-red-900/40 border border-red-700 text-red-300 text-sm px-4 py-3 rounded-xl'>
              {error}
            </div>
          )}

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition'
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className='mt-6 text-center text-sm text-slate-400'>
          Already have an account?{' '}
          <Link to='/login' className='text-indigo-400 font-medium hover:text-indigo-300'>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
