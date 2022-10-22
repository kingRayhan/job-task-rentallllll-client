import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./index";

export const createUser = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
};

export const signIn = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
};

const googleLoginProvider = new GoogleAuthProvider();
const githubLoginProvider = new GithubAuthProvider();

export const signInWithGoogle = async () => {
  const userCredential = await signInWithPopup(auth, googleLoginProvider);
  return userCredential;
};

export const signInWithGithub = async () => {
  const userCredential = await signInWithPopup(auth, githubLoginProvider);
  return userCredential;
};
