import { initializeApp } from 'firebase/app';
import firebaseConfig from '../Login/firebase_config';

import { getAuth,updateProfile,sendPasswordResetEmail,sendEmailVerification ,signInWithEmailAndPassword, signInWithPopup,createUserWithEmailAndPassword, GoogleAuthProvider, signOut } from "firebase/auth";

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
        photo:photoURL,
        success:true
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

export const createUserEmailAndPassword =(name,email,password)=>{
    const auth = getAuth();
            return createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
              const userInfo=result.user;
              userInfo.error='';
              userInfo.success=true;
              updateUserName(name);
              verifyEmail();
              return userInfo;
            })
            .catch((error) => {
              const userInfo = {};
              userInfo.error = "User alredy existe";
              userInfo.success=false;
              return userInfo;
            });
}
export const signInEmailAndPassword =(email,password)=>{
    const auth = getAuth();
      return signInWithEmailAndPassword(auth,email,password)
      .then(res => {
        const userInfo=res.user;
        userInfo.error='';
        userInfo.success=true;
        return userInfo;
      })
      .catch((error) => {
        const userInfo = {};
        userInfo.error = "Invalid email or password";
        userInfo.success=false;
        return userInfo;
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

const verifyEmail = ()=>{
  const auth = getAuth();
  sendEmailVerification(auth.currentUser)
  .then(() => {
    console.log("Verified email");
  });
}

export const resetPassword =(email)=>{
const auth = getAuth();
sendPasswordResetEmail(auth, email)
  .then(() => {

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
}