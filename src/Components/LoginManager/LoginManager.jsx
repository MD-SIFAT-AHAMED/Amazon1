import { initializeApp } from 'firebase/app';
import firebaseConfig from '../Login/firebase_config';

import { getAuth,updateProfile,signInWithEmailAndPassword, signInWithPopup,createUserWithEmailAndPassword, GoogleAuthProvider, signOut } from "firebase/auth";

export const initializeLoginFramework = ()=>{
    initializeApp(firebaseConfig);
}  
const provider = new GoogleAuthProvider();
export const handelGoggleSignIn =()=>{
    const auth = getAuth();
    return signInWithPopup(auth,provider)
    .then((result)=>{
      const {displayName,email,photoURL} = result.user;
      const signInUser={
        isSignIn:true,
        name:displayName,
        email:email,
        photo:photoURL
      }
       return signInUser;
    })
    .catch(err=>{
      console.log(err)
    })
  }


export const handelLogOut=()=>{
    const auth = getAuth();
    return signOut(auth)
    .then(()=>{
      const LogOutUser={
        isSignIn:false,
        name:"",
        email:"",
        photo:"",
        error:"",
        success:false
      }
      return LogOutUser;
    })
    .catch((err)=>{
      console.log(err);
    })
  }

export const createUserEmailAndPassword =()=>{
    const auth = getAuth();
            createUserWithEmailAndPassword(auth, users.email, users.password)
            .then((result) => {
              const userInfo={...users};
              userInfo.error='';
              userInfo.success=true;
              setUsers(userInfo);
            })
            .catch((error) => {
              const userInfo = {...users};
              userInfo.error = "User alredy existe";
              userInfo.success=false;
              setUsers(userInfo);
              updateUserName(users.name);
            });
}
export const signInEmailAndPassword =()=>{
    const auth = getAuth();
      signInWithEmailAndPassword(auth, users.email, users.password)
      .then((result) => {
        const userInfo={...users};
        userInfo.error='';
        userInfo.success=true;
        setUsers(userInfo);
        setLoggedInUser(userInfo);
        navigate(from.pathname,{replace:true});
        console.log(result.user);
      })
      .catch((error) => {
        const userInfo = {...users};
        userInfo.error = "Invalid email or password";
        userInfo.success=false;
        setUsers(userInfo);
      });
}

const updateUserName = (name)=>{
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: name,
      }).then(() => {
        console.log("Updated profile");
      }).catch((error) => {
        console.log(error)
      });
  }

