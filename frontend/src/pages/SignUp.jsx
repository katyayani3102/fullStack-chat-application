import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern';
import toast from 'react-hot-toast';

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password:"",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { signup, isSigningUp } = useAuthStore();

  const validateForm = ()=>{
    if(!formData.fullname.trim()){return toast.error("Full name is required !!")}
    if(!formData.email.trim()){ return toast.error("Email is required !!")}
    if(!formData.password){return toast.error("Password is required !!")}
    if(formData.password.length < 6){ return toast.error("Password must be at least 6 characters long !!")}
    // if(!/\S+@S+\.\S+/.test(formData.email)){ return toast.error("Please enter a valid email address !!")}

    return true;
  }
  
  const handleSubmit = (e)=>{
    e.preventDefault();

    const success = validateForm();
    if(success === true){
      signup(formData)
    }
  }

  return <div className='min-h-screen grid lg:grid-cols-2'>
    {/*leftSide of pages form*/ }
    <div className="flex flex-col justify-center items-center p-6 sm:p-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-2 group"> 
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <MessageSquare className='size-6 text-primary' />
            </div>
            <h1 className="text-2xl mt-2 font-bold">Creat Account</h1>
            <p className="text-base-content/60"> Get started with your free account</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">
                Full Name
              </span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center justify-center pointer-events-none">
                <User className='size-5 text-base-content/40' />
              </div>
              <input type="text" placeholder='John Doe' value={formData.fullname} onChange={(e)=>setFormData({...formData, fullname: e.target.value})} className="input input-bordered w-full pl-10" />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">
                Email
              </span>
            </label>
            <div className="relative">
              <div className="absolute justify-center inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className='size-5 text-base-content/40' />
              </div>
              <input type="email" placeholder='you@email.com' 
              value={formData.email} onChange={(e)=>setFormData({...formData, email: e.target.value})} 
              className="input input-bordered w-full pl-10" />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">
                Password
              </span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center justify-center pointer-events-none">
                <Lock className='size-5 text-base-content/40' />
              </div>
              <input type={showPassword ? "text" : "password"} placeholder='********' value={formData.password} onChange={(e)=>setFormData({...formData, password: e.target.value})} className="input input-bordered w-full pl-10" />
              <button type='button' className='absolute inset-y-0 right-0 pr-3 flex items-center' onClick={()=>setShowPassword(!showPassword)}> 
                {showPassword ? (
                  <EyeOff className='size-5 text-base-content/40' />
                ) : (
                  <Eye className='size-5 text-base-content/40' />
                )
              }
              </button>
            </div>
          </div>
          <button type='submit' className="btn btn-primary w-full" disabled={isSigningUp}>
            {isSigningUp ? (
              <>
                <Loader2 className='size-5 animate-spin' />
                Loading...
              </>
            ) : (
              "Create Account"
            )
          }
          </button>
        </form>
        <div className="text-center">
          <p className="text-base-content/60">
            Already have an account? 
            <Link href="/login" className="link link-primary">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
    {/*rightSide of pages image*/ }

    <AuthImagePattern
    title="Join Our Community" 
    subtitle="Connect with friends, share moments and stay in touch with your loved ones."
    />
  </div>;
  
}

export default SignUp
