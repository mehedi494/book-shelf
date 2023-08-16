import { Toaster } from './components/ui/Toaster';
import MainLayout from './layouts/MainLayout';


function App() {

  
 
  

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     dispatch(setLoading(true))
  //     if (user) {
  //       dispatch(setUser(user.email))
  //       dispatch(setLoading(false))
  //       // ...
  //     } else {
  //       dispatch(setLoading(false))
  //     }
  //   })
  // },[dispatch])
 

  return (
    <div>
      <Toaster />
      <MainLayout />
    </div>
  );
}

export default App;
