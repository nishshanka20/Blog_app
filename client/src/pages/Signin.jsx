import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import {signInStart,signInSuccess,signInFailure} from '../redux/user/userSlice';

function SignIn() {
  const [formData,setFormData]=useState({})
  // const [errorMessage,setErrorMessage]=useState(null);
  // const [loading,setLoading]=useState(false);
  const {loading,error:errorMessage}=useSelector((state)=>state.user);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleChange=(e)=>{
    setFormData((prevFormData)=> ({...prevFormData,[e.target.id]: e.target.value.trim()}))
  }
  const handleSumbit=async (e) =>{
    e.preventDefault();
    if(!formData.username  || !formData.password){
      return  dispatch(signInFailure('Please fill in all fields'))
    }
    try{
      // setLoading(true);
      // setErrorMessage(null)
      dispatch(signInStart());
      const res=await fetch('/api/auth/signin',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData),
      })
      const data=await  res.json(); 
      if(data.success===false){
        dispatch(signInFailure(data.message));
      }
      
      if(res.ok){
        dispatch(signInSuccess(data));
        navigate('/');
      }
    }
    catch(err){
      //setErrorMessage(err.message);
      dispatch(signInFailure(err.message));
      //setLoading(false);
    }
  };
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center'>
        {/*left side */}
        <div className='flex-1'>
          <Link to="/" className='font-bold
           dark:text-white text-4xl'>
           <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>WLAN's</span>
           blog
          </Link>
          <p className='text-sm mt-5'>
            In this project ,you can signin with your username and password
            or with google
          </p>
        </div>
        {/*right side*/}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSumbit}>
           <div >
            <Label value="Your username"/>
            <TextInput type="text" placeholder="Username" id="username" onChange={handleChange}/>
           </div>
           
           <div>
            <Label value="Your password"/>
            <TextInput type="password" placeholder="Password" id="password" onChange={handleChange}/>
           </div>
           <Button gradientDuoTone='purpleToPink' type='submit'disabled={loading} >
            {
              loading ? (
                <>
                <Spinner size='sm'/>
                <span className='pl-3'>Loading...</span>
                </>
                
              ):( 'Sign in')
            }
           </Button>
          </form>
          <div  className='flex gap-2 text-sm mt-5'>
            <span>Don't have an account?</span>
            <Link to='/sign-up' className='text-blue-500'>
              Sign up
            </Link>
          </div>
          {errorMessage &&(
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
        

      </div>
      
    </div>
  )
}

export default SignIn;