import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCGqzbUYR-1D391NqwItk3ipDENlnNRvSU',
  authDomain: 'boooking-system-848ff.firebaseapp.com',
  projectId: 'boooking-system-848ff',
  storageBucket: 'boooking-system-848ff.appspot.com',
  messagingSenderId: '498247991806',
  appId: '1:498247991806:web:d55a7688c6dd1616df40af',
  measurementId: 'G-K5SYCZ3661'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
