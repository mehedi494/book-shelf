'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { FcGoogle } from 'react-icons/fc';

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

interface SignupFormInputs {
  email: string;
  password: string;
  confirmPassword:string
}

export function SignupForm({ className, ...props }: UserAuthFormProps) {
 

  const validationSchema = Yup.object().shape({
    email:Yup.string().required('email is required'),
    password: Yup.string()
        .required('Password is required'),
        // .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('password')], 'Passwords must match')
        
});
const formOptions = { resolver: yupResolver(validationSchema) };

// get functions to build form with useForm() hook
const { register, handleSubmit, reset, formState } = useForm(formOptions);
const { errors } = formState;

function onSubmit(data:SignupFormInputs) {
    // display form data on success
    console.log(data);
}

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
              {...register('email')}
            />
            {errors.email && <p>{errors.email.message}</p>}
            <Input
              id="password"
              placeholder="your password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              {...register('password')}
            />
            {errors.password && <p>{errors.password.message}</p>}
            <Input
              id="confirmPassword"
              placeholder="confirm password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              {...register('confirmPassword')}
              />
              {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          </div>
          <Button>Create Account</Button>
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