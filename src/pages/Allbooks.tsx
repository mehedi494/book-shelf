import BookCard from '@/components/BookCard';

// import { useToast } from '@/components/ui/use-toast';

import { IBook } from '@/types/globalTypes';
import { FaFilter } from 'react-icons/fa';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { useForm } from 'react-hook-form';
import {
  filterBook,
  getAllBooks,
  
} from '@/redux/features/books/bookSlice';
import { useAppDispatch, useAppSelector } from '@/redux/app/hook';
import { useEffect } from 'react';

export default function Allbooks() {
  const dispatch = useAppDispatch();
  const { books, loading } = useAppSelector(
    (state) => state.books
  );

  // console.log(books?.data?.data);

  // dispatch( getAllBooks())

  let booksData;
  
  // eslint-disable-next-line prefer-const

  booksData = books?.data?.data || []

  // if (!booksData?.length) {
  //   setIsLoding(true)
  // } else {
  //   setIsLoding(false)
  // }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type Idata= {
    genre: string;
    publication_date: string;
}
  const onSubmit =  (data:Idata) => {
     dispatch(filterBook(data));
    booksData = books?.data?.data;
  };
  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  const { register, handleSubmit } = useForm<Idata>();

  return (
    <>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-12 max-w-7xl mx-auto relative ">
          <div className="col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky top-16 h-[calc(100vh-80px)]">
            <div className="space-y-3 ">
              <h1 className="text-2xl uppercase">
                FILTER <FaFilter className="inline" />
              </h1>
              
                <div className="max-w-xl">
               
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="By genre"
                      {...register('genre')}
                      id="genre"
                    ></Input>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <Input
                      placeholder="By year"
                      id="year"
                      {...register('publication_date')}
                    ></Input>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <Button
                      type="submit"
                      className="w-full"
                      variant={'secondary'}
                    >
                      Find
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
            <div className="col-span-9 grid grid-cols-3 gap-10 pb-20">
            
                <>
                  {booksData.length === 0 &&
                  <h1 className='text-center text-2xl'>Not Found</h1>}
                </>
              
            {booksData?.map((book: IBook) => (
              <BookCard book={book} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
