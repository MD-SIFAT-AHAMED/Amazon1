import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { use } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { initializeLoginFramework,handelLogOut , handelGoggleSignIn, createUserEmailAndPassword, signInEmailAndPassword} from '../LoginManager/LoginManager';

// Initialize Firebase app
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

  initializeLoginFramework();

  const [loggedInUser,setLoggedInUser] = useContext(UserContext);



  const handelSubmit=(e)=>{
    if(newUser && users.email && users.password)
    {
       createUserEmailAndPassword(users.name,users.email,users.password)
       .then(res=>{
        handelResponse(res,true);
      })
    }
 
    if(!newUser && users.email && users.password)
    {
      signInEmailAndPassword(users.email, users.password)
      .then(res=>{
        handelResponse(res,true);
      })
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
  const handelResponse=(res,redirect)=>{
      setUsers(res);
      setLoggedInUser(res);
      if(redirect)
      {
        navigate(from.pathname,{replace:true});
      }
  }
   const handelwithGoggleSignIn=()=>{
      handelGoggleSignIn()
      .then(res=>{
        handelResponse(res,true);
      })
   }
   const handelLoggedOut=()=>{
    handelLogOut()
    .then(res=>{
      handelResponse(res,false);
    })
    
   }
  return (
    <div style={{textAlign:"center"}}>
      
      {
        users.isSignIn ? <button onClick={handelLoggedOut}>Log Out</button> : <button onClick={handelwithGoggleSignIn}>Sign in</button> 
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
      <button>Forget Password</button>
      <p style={{color:"red"}}>{users.error}</p>
      {users.success && <p style={{color:"green"}}>User {newUser ? "Created" : "Logged In"} Successfuly</p>}
    </div>
  );
};

export default Login;