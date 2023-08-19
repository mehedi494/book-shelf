'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';

import { FcGoogle } from 'react-icons/fc';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
// import { IoCheckmarkDoneCircleSharp } from 'react-icons/io';

import { useLoginUserMutation } from '@/redux/features/auth/authApi';
import { useNavigate } from 'react-router-dom';



type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

interface LoginFormInputs {
  email: string;
  password: string;
}

export function LoginForm({ className, ...props }: UserAuthFormProps) {
  const navigate = useNavigate()
  
  // const dispatch = useAppDispatch()
  const [loginUser,{data:userData,isLoading,isError,isSuccess}]= useLoginUserMutation()
  console.log(userData?.data?.accessToken)
  
   
  if (!isLoading && isSuccess && userData?.data.accessToken) {
    localStorage.setItem('accessToken', userData?.data?.accessToken)
  }
  
  if (isSuccess) {
    navigate('/')
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const onSubmit = (data: LoginFormInputs) => {   
     loginUser(data)   
   
  };

 
  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p>{errors.email.message}</p>}
            <Input
              id="password"
              placeholder="your password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
         {!isLoading? <Button  >Login with email</Button>:
            <Button disabled><p className='animate-spin'><AiOutlineLoading3Quarters /></p></Button>}
          <div>
            {
              isSuccess && !isError ?<p > Login success..</p> : !isSuccess && !isLoading?<></>: <p>something went wrong</p>
            }
          </div>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        className="flex items-center justify-between"
      >
        <p>Google</p>
        <FcGoogle />
      </Button>
    </div>
  );
}