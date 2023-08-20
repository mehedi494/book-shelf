import { useEffect } from 'react';
import { Toaster } from './components/ui/Toaster';
import MainLayout from './layouts/MainLayout';
import { useGetMeUserMutation } from './redux/features/auth/authApi';
import { useAppDispatch } from './redux/app/hook';
import { setUser } from './redux/features/auth/authSlice';


function App() {

  const [getUserFunc,{data}]= useGetMeUserMutation(undefined)
  const session = localStorage.getItem('accessToken')
  // console.log(session);
  // console.log(data?.data);
  const dispatch = useAppDispatch()
  dispatch(setUser(data?.data))
  
  useEffect(() => {
    getUserFunc(session as string)
  },[])
 

  return (
    <div>
      <Toaster />
      <MainLayout />
    </div>
  );
}

export default App;
