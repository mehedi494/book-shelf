import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '../components/ui/alert';

import { Button } from '@/components/ui/button';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDeleteBookMutation, useGetSingleBookQuery } from '@/redux/features/books/bookApi';
import { toast } from '@/components/ui/use-toast';
import { useAppDispatch } from '@/redux/app/hook';
import { addToWisthList } from '@/redux/features/books/bookSlice';
import { IBook } from '@/types/globalTypes';
import { FiEdit } from 'react-icons/fi';
import { MdDeleteForever } from 'react-icons/md';


export default function BookDetails() {
  const { id } = useParams();
const navigate =useNavigate()
  const { data, isLoading } = useGetSingleBookQuery(id);
  const [deleteFunc, { isSuccess, isError ,isLoading:loading}] = useDeleteBookMutation()
  
  const book = data?.data;
  const dispatch = useAppDispatch();

  const handleAddWishList = (book: IBook) => {
    dispatch(addToWisthList(book));
    toast({
      description: 'add to wishlist',
    });
  };

  const handlDelete = (id:string) => {
    const token = localStorage.getItem('accessToken')
    const options = {
      token,id
    }
    console.log(options.id);
    deleteFunc(options)
  }
  if (isSuccess) {
    toast({
      description: "Deleted success 👍"
    })
    navigate('/allbooks')
  }
    if (isError) {
      toast({
        description: "failed to Deleted ⚠"
      })
    }
    if (loading) {
      toast({
        description: "processing..."
      })
    }
  
 
  

  return (
    <>
      <AlertDialog />
      {isLoading ? (
        <p className="text-center">Loading ...</p>
      ) : (
        <div className="flex max-w-7xl mx-auto items-center  border-b border-gray-300">
          <div className="w-[50%] flex justify-center">
            <img className="" src={book?.image} alt="" />
          </div>

          <div className="w-[50%] flex justify-around">
            <div className=" space-y-3">
              <h1 className="text-3xl font-semibold">{book?.title}</h1>
              <p className="text-xl">Author: {book?.author}</p>
              <p className="text-xl">Published: {book?.publication_date}</p>
              <ul className="space-y-1 text-lg">
                {book?.reviews?.map((feature: string) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <Button onClick={() => handleAddWishList(book)}>
                Add to wishlist
              </Button>
            </div>

            <div className=" flex flex-col justify-around ">
              <Link to={`/book-edit/${book._id}`}>
                {' '}
                <Button
                  variant={'outline'}
                  className="text-4xl border p-6 "
                  title="edit"
                >
                  <FiEdit />
                </Button>
              </Link>
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button
                    variant={'outline'}
                    /* onClick={()=>{handlePopUp()}} */ className="text-5xl text-red-500 border p-6 "
                    title="delete"
                  >
                    <MdDeleteForever />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-secondary-foreground ">
                      Are you confirm deleting book? You can't restore after delete ⚠
                    </AlertDialogTitle>
                    <AlertDialogDescription></AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction  onClick={()=>handlDelete(book._id)} className="bg-red-400 hover:bg-red-500">
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
