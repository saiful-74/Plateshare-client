
import { auth } from "../Firebase/firebase.config";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

export const googleLogin = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
};

export const loginUser = async (email, password) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
};

export const registerUser = async (email, password, name) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  if (name) {
    await updateProfile(result.user, { displayName: name });
  }
  return result.user;
};

export const logout = async () => {
  await signOut(auth);
};
