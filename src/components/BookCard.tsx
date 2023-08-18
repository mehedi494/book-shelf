import { IBook } from '@/types/globalTypes';
import { toast } from './ui/use-toast';
import { Button } from './ui/button';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch } from '@/redux/app/hook';
import { addToWisthList } from '@/redux/features/books/bookSlice';


interface IProps {
  book: IBook;
}

export default function BookCard({  book }: IProps) {
  const {pathname}= useLocation()
  const dispatch = useAppDispatch()
 
  
  const handleAddWishList = (book: IBook) => {
dispatch(addToWisthList(book))
    
    toast({
      description: 'add to wishlist',
    });
  };
  return (
    <div>
      <div className="rounded-xl h-[480px] flex flex-col items-start justify-between p-5 overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:scale-[102%] transition-all gap-2">
      
        <Link to={`/book-details/${book._id}`} >
          <img src={book?.image} alt="product" />
          <h1 className="text-xl font-semibold">{book?.title.slice(0,17)}</h1>
        </Link>
     
        <p>Author: {book.author }</p>
        <p className="text-sm">
          Genre: { book?.genre}
        </p>
        <p className="text-sm">
          Published: { book?.publication_date}
        </p>
        
       {pathname !=="/wishlist" && <Button variant="outline" onClick={()=>handleAddWishList(book)} >
          Add to Wishlist
        </Button>}
      </div>
    </div>
  );
}
