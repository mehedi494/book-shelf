import BookCard from '@/components/BookCard';

import { useTopTenBooksQuery } from '@/redux/features/books/bookApi';

// import { useToast } from '@/components/ui/use-toast';

import { IBook } from '@/types/globalTypes';


// import { useEffect, useState } from 'react';

export default function TopTen() {

    const { data } = useTopTenBooksQuery(undefined)
    const books = data?.data?.data.slice(0, 10);
 console.log(data);
  

  return (
    <div>
          <div className="grid  max-w-7xl mx-auto  ">
        <div className="col-span-9 grid grid-cols-4 gap-5 pb-10">
          {books?.map((book: IBook) => (
            <BookCard book={book} />
          ))}
        </div>
      </div>
    </div>
  );
}
