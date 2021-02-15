import app from '../firebase';
import 'firebase/auth';

export const {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} = app.auth();
