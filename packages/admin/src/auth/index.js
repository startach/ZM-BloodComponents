import { makeSignUp, makeSignIn, makeSignOut } from './auth';

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as signOutUser,
} from '../frameworks/firebase';

const signUp = makeSignUp(createUserWithEmailAndPassword);
const signIn = makeSignIn(signInWithEmailAndPassword);
const signOut = makeSignOut(signOutUser);

export { signUp, signIn, signOut };
