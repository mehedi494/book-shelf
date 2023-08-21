import { Link, useLocation } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { DropdownMenuSeparator } from '../components/ui/dropdown-menu';
import { DropdownMenuLabel } from '../components/ui/dropdown-menu';
import {
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '../components/ui/dropdown-menu';

import logo from '../assets/images/bookShelf-logo .png';


import { Input } from '@/components/ui/input';
import {IoMdAddCircleOutline} from 'react-icons/io'
import {TiBookmark} from 'react-icons/ti'
import { useAppDispatch, useAppSelector } from '@/redux/app/hook';
import { setUser } from '@/redux/features/auth/authSlice';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ISearch, searchBook } from '@/redux/features/books/bookSlice';



export default function Navbar() {
  const {pathname}=useLocation()
  const {user}= useAppSelector(state=>state.auth)
const dispatch = useAppDispatch()
  const handleLogout = () => {

   const  user= {
      _id: '',
      name: '',
      email: '',
      role: '',
      createdAt: '',
      updatedAt: '',
      id: '',
    }
    dispatch(setUser(user))
    localStorage.setItem('accessToken','')
    
  }
const {register,handleSubmit}= useForm<ISearch>()

  const handleSearch:SubmitHandler<ISearch> = (data: ISearch):void => {
    console.log(data);
    dispatch(searchBook(data))
  }


  return (
    <nav className="w-full h-16 fixed top backdrop-blur-lg z-10">
      <div className="h-full w-full bg-white/60">
        <div className="flex items-center justify-between w-full md:max-w-7xl h-full mx-auto ">
          <Link to='/'>
          <div >
            <img className="h-8" src={logo} alt="log" />
          </div></Link>
          <div>
            <ul className="flex items-center">
              {pathname=== '/allbooks'&&
                <li>
                <form onKeyUp={handleSubmit(handleSearch)} >
                  
                  <Input placeholder='Search...' {...register('searchTerm')}/>
             </form>
              
              </li>}
              <li>
                <Button variant="link" asChild>
                  <Link to="/">Home</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link to="/allbooks">Allbooks</Link>
                </Button>
              </li>
              {user?.email&&<li>
                <Button variant="link" asChild>
                  <Link to="/wishlist">Wishlist <TiBookmark /></Link>
                </Button>
              </li>}
             
             {user?.email&& <li>
              <Button variant="link" asChild>
                  <Link to="/addnewbook">Add new book <IoMdAddCircleOutline/> </Link>
                </Button>
              </li>}
              <li className="ml-5">
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                   {user?.email&& <DropdownMenuItem className="cursor-pointer">
                      {user?.email}
                    </DropdownMenuItem>}

                    {!user?.email && (
                      <>
                        <DropdownMenuItem className="cursor-pointer">
                          <Link to="/login">Login</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Link to="/signup">signup</Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    {user?.email && (
                      <DropdownMenuItem onClick={()=>handleLogout()} className="cursor-pointer">
                       Logout
                      </DropdownMenuItem>
                     )} 
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
