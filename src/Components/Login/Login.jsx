import React, { useContext, useState } from 'react';
import { getAuth,updateProfile,signInWithEmailAndPassword, signInWithPopup,createUserWithEmailAndPassword, GoogleAuthProvider, signOut } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase_config';
import { UserContext } from '../../App';
import { use } from 'react';
import { useLocation, useNavigate } from 'react-router';
// Initialize Firebase app
initializeApp(firebaseConfig);
const Login = () => {
  const [newUser,setNewUser]=useState(false);
  const [users,setUsers] = useState({
    isSignIn : false,
    name:"",
    email:"",
    password:"",
    photo:""
  });

  const location = useLocation();
  const navigate = useNavigate();
  const {from} = location.state || {from: {pathname: "/"}};


  const [loggedInUser,setLoggedInUser] = useContext(UserContext);
  const provider = new GoogleAuthProvider();
  const handelSignIn =()=>{
    const auth = getAuth();
    signInWithPopup(auth,provider)
    .then((result)=>{
      const {displayName,email,photoURL} = result.user;
      const signInUser={
        isSignIn:true,
        name:displayName,
        email:email,
        photo:photoURL
      }
      setUsers(signInUser);
    })
    .catch(err=>{
      console.log(err)
    })
  }
  const handelLogOut=()=>{
    const auth = getAuth();
    signOut(auth)
    .then(()=>{
      const LogOutUser={
        isSignIn:false,
        name:"",
        email:"",
        photo:"",
        error:"",
        success:false
      }
      setUsers(LogOutUser);
    })
    .catch((err)=>{
      console.log(err);
    })
  }


  const handelSubmit=(e)=>{
    if(newUser && users.email && users.password)
    {
      console.log("submitted");
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

    if(!newUser && users.email && users.password)
    {
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
    e.preventDefault();
  }

  const handelChange=(e)=>{
    let isValidform=true;
    if(e.target.name ===  'email')
    {
      isValidform = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e.target.value);
      
    }
    if(e.target.name === 'password')
    {
      isValidform = /\d{1}/.test(e.target.value);
    }
    if(isValidform)
    {
      const newUserInfo ={...users};
      newUserInfo[e.target.name]=e.target.value;
      setUsers(newUserInfo);
    }
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
  return (
    <div style={{textAlign:"center"}}>
      
      {
        users.isSignIn ? <button onClick={handelLogOut}>Log Out</button> : <button onClick={handelSignIn}>Sign in</button> 
      }
      
      {
        users.isSignIn && <div>
          <h2>Welcome {users.name}</h2>
          <p>Email: {users.email}</p>
          <img style={{width:'50%'}} src={users.photo} alt="" />
        </div>
      }


      <h2>Our Own Authentication</h2>
      <input type="checkbox" onChange={()=>setNewUser(!newUser)} name="newUser" id="" />
      <label htmlFor="newUser">New User Sign Up</label>
      <form onSubmit={handelSubmit}>
        {newUser && <input type="text" name="name" onBlur={handelChange} placeholder='Your Name' />}        <br />
        <input type="text" name='email' onBlur={handelChange} placeholder='Input Your Email' required />
        <br />
        <input type="password" name='password' onBlur={handelChange} placeholder='Password' required/>
        <br />
        <input type="submit" value='Submit' />
      </form>
      <p style={{color:"red"}}>{users.error}</p>
      {users.success && <p style={{color:"green"}}>User {newUser ? "Created" : "Logged In"} Successfuly</p>}
    </div>
  );
};

export default Login;