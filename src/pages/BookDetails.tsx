import { Button } from '@/components/ui/button';
import { useParams } from 'react-router-dom';
import {  useGetSingleBookQuery } from '@/redux/features/books/bookApi';


import { toast } from '@/components/ui/use-toast';
import { useAppDispatch } from '@/redux/app/hook';
import { addToWisthList } from '@/redux/features/books/bookSlice';
import { IBook } from '@/types/globalTypes';
import {FiEdit} from 'react-icons/fi'
import {MdDeleteForever} from 'react-icons/md'


export default function BookDetails() {
  const { id } = useParams();

  const dispatch = useAppDispatch()
  
  const handleAddWishList = (book: IBook) => {
    dispatch(addToWisthList(book))    
    toast({
      description: 'add to wishlist',
    })
  }

    const { data, isLoading } = useGetSingleBookQuery(id)
 
  const book = data?.data
  console.log(book );
  

  return (
    <>
      {isLoading ?<p className='text-center'>Loading ...</p>:
        
        <div className="flex max-w-7xl mx-auto items-center  border-b border-gray-300">
        <div  className="w-[50%] flex justify-center">
            <img className='' src={book?.image} alt="" />
           
          </div>
          
          <div className='w-[50%] flex justify-around'>
            <div className=" space-y-3">
          <h1 className="text-3xl font-semibold">{book?.title}</h1>
          <p className="text-xl">Author: {book?.author}</p>
          <p className="text-xl">Published: {book?.publication_date}</p>
          <ul className="space-y-1 text-lg">
            {book?.reviews?.map((feature:string) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <Button onClick={()=>handleAddWishList(book)}>Add to wishlist</Button>
            </div>
            
            <div className=' flex flex-col justify-around '>
           
             <Button variant={'outline'} className='text-4xl border p-6 ' title='edit'><FiEdit/></Button>
             <Button   variant={'outline'} className='text-5xl text-red-500 border p-6 ' title='delete'><MdDeleteForever/></Button>
             
</div>

        </div>
      </div>
     }
    </>
  );
}
