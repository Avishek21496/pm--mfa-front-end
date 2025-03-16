import {
    GithubAuthProvider,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
  } from "firebase/auth";
import app from "../Firebase/firebase.config";
import { createContext, useEffect, useState } from "react";
import { SERVER_URL } from "../Constants/url";
import useAxiosPublic from "../Hooks/useAxiosPublic";
const auth = getAuth(app);
export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const axiosPublic = useAxiosPublic();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [on, setOn] = useState(false);
    const [reload, setReload] = useState(false)

    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const updateUserProfile = (name, photo)=>{
        return updateProfile(auth.currentUser , {
            displayName: name,
            photoURL: photo
        });
    }

    const signIn = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () =>{
        setLoading(true);
        return signOut(auth);
    }

    const googleProvider = new GoogleAuthProvider;
    const signInWithGoogle = () =>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const githubProvider = new GithubAuthProvider;
    const signInWithGithub = () => {
        setLoading(true);
        return signInWithPopup(auth, githubProvider);
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          if (currentUser) {
            const userInfo = { email: currentUser.email };
            axiosPublic.post("/jwt", userInfo).then((res) => {
              if (res.data.token) {
                localStorage.setItem("access-token", res.data.token);
              }
            });
          } else {
            localStorage.removeItem("access-token");
          }
          setUser(currentUser);
          setLoading(false);
        });
        return () => {
          return unsubscribe();
        };
      }, []);
      
    const authInfo = { createUser , signIn , user, logOut, loading, signInWithGoogle, signInWithGithub, updateUserProfile,
                        on, setOn, setLoading, reload, setReload}
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;