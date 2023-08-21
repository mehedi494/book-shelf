import BookCard from '@/components/BookCard';
import { useAppSelector } from '@/redux/app/hook';

// import { useToast } from '@/components/ui/use-toast';

import { IBook } from '@/types/globalTypes';
import { useLocation } from 'react-router-dom';


// import { useEffect, useState } from 'react';

export default function WishList() {
  const {pathname}= useLocation()
  const { wishlist,total } = useAppSelector((state) => state.books)
 
  

  return (
    <div>
      
      {
        pathname === "/wishlist" ?<h1 className='text-xl text-end  m-4 text-muted-foreground mb-5'>Wishlist total: <b>{ total}</b>  </h1>:<></>
    }
          <div className="grid  max-w-7xl mx-auto  ">
        <div className="col-span-9 grid grid-cols-4 gap-5 pb-10">
          {wishlist?.map((book: IBook) => (
            <BookCard book={book} />
          ))}
        </div>
      </div>
    </div>
  );
}
