'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { FcGoogle } from 'react-icons/fc';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useCreateUserMutation } from '@/redux/features/auth/authApi';
import { toast } from './ui/use-toast';
import { useNavigate } from 'react-router-dom';

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

interface SignupFormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FetchBaseQueryError {
  data: {
    message: string;
    // Other properties...
  };
  // Other properties...
}

export function SignupForm({ className, ...props }: UserAuthFormProps) {
  const [createUserFunc, { isSuccess, isError, error }] =
    useCreateUserMutation();
  const errorMessage = (error as FetchBaseQueryError)?.data?.message;

  // validation form ....
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('name is required'),
    email: Yup.string().required('email is required'),
    password: Yup.string().required('Password is required'),
    // .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  // ........vlidation form end.......

  const navigte = useNavigate();

  if (isError) {
    toast({
      description: 'Faild! to crate account⚠',
    });
  }
  if (isSuccess) {
    toast({
      description: 'Sucessfully create account 🎉',
    });
    navigte('/login');
  }
  const duplicateEmail = errorMessage?.includes(
    'E11000 duplicate key error collection'
  );

  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data: SignupFormInputs) {
    const options = {
      name: data?.name,
      email: data?.email,
      password: data?.password,
    };
    createUserFunc(options);
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Full Name"
              type="text"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              {...register('name')}
            />
            {errors.email && <p>{errors.email.message}</p>}
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

      {
        <p className="text-red-500">
          {' '}
          {duplicateEmail ? 'Email alredy exist' : errorMessage}
        </p>
      }
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
