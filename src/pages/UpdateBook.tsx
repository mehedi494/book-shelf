import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEditBookMutation, useGetSingleBookQuery } from '@/redux/features/books/bookApi';
import { useForm } from 'react-hook-form';
import {toast} from '../components/ui/use-toast'
import { useParams } from 'react-router-dom';


interface IAddNewbook{
    _id:string
  title: string;
  author: string;
  genre: string;
  publication_date: string;
    image: string;
    reviwes?: [];
}

export default function UpdateBook() {
const {id}=useParams()
    const { data } = useGetSingleBookQuery(id)
    const[editBookFunc,{isSuccess,isError}]=useEditBookMutation()
 
    const book = data?.data
  const {
    register,
    handleSubmit,
  } = useForm<IAddNewbook>();

    const onSubmit = (data: IAddNewbook) => {
      data._id= id as string
    const token = localStorage.getItem('accessToken')
    const options = {
      token, data
      }
      editBookFunc(options)
    console.log(options)
   
  };

  if (isSuccess) {
    toast({
      description: "Update Successfull  🎉"
    })
  }
    if (isError) {
      toast({
        description: "Faild to update ⚠ "
      })
    }



    return (
      <div className="flex justify-center items-center h-[calc(100vh-80px)] gap-10 text-primary">
        <div className="max-w-3xl w-full">
          <h1 className="mb-2">
            <b>Edit Book</b>
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div  className="h-[60vh] border border-gray-300 rounded-md p-10 overflow-auto">
                        <div className='w-40'>
                            <img src={book?.image} alt="" />
             </div>
             
             
                        <div className="flex gap-5">
                <div className="w-full space-y-5">
                  <div>
                    <Label htmlFor="title">Book Title</Label>
                    <Input
                      id="title"
                      placeholder="title"
                      type="text"
                      autoCapitalize="none"
                      autoComplete="text"
                                        autoCorrect="off"
                                    defaultValue={book?.title}
                      {...register('title', { required: 'title is required' })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="author">Book Author Name</Label>
                    <Input
                      id="author"
                      placeholder=""
                      type="text"
                      autoCapitalize="none"
                      autoComplete="text"
                                        autoCorrect="off"
                                        defaultValue={book?.author}
                      {...register('author', { required: 'author is required' })}
                    />
                  </div>
                </div>
                <div className="w-full space-y-5">
                  <div>
                    <Label htmlFor="genre">Book Genres</Label>
                    <Input
                      id="genre"
                      placeholder=""
                      type="text"
                      autoCapitalize="none"
                      autoComplete="text"
                                        autoCorrect="off"
                                        defaultValue={book?.genre}
                      {...register('genre', { required: 'genre is required' })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="year">Book Publication year</Label>
                    <Input
                      id="publication"
                      placeholder=""
                      type="text"
                      autoCapitalize="none"
                      autoComplete="text"
                                        autoCorrect="off"
                                        defaultValue={book?.publication_date}
                      {...register('publication_date', { required: 'publication year is required' })}
                    />
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="image">Image Url</Label>
                <Input
                  id="image"
                  placeholder=""
                  type="text"
                  autoCapitalize="none"
                  autoComplete="text"
                                autoCorrect="off"
                                defaultValue={book?.image}
                  {...register('image', { required: 'image is required' })}
                />
              </div>
              <Button className="w-full mt-10">Submit</Button>
            </div>
          </form>
        </div>
      </div>
    );
  }

