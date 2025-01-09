import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Card from './components/Card'
import axios from 'axios'

interface book{
  title:string;
  id:string;
  authorId:string;
  genreId:string;
  image:string;
}

interface genre{
  id:string;
  name:string;
}

function App() {

  const [data, setData] = useState<book[]>([]);;
  const [genre, setGenre] = useState<genre[]>([]);;
  const [isLoading, setIsLoading] = useState(false)


    useEffect(()=>{
    axios.get('https://author-book-genre.vercel.app/api/book')
  .then(function (response:any) {
    // handle success
    setIsLoading(true)
    setData(response.data.data)
    setIsLoading(false)
  })
  .catch(function (error:any) {
    // handle error
    console.log(error);
  })
  },[])


  

  return (
    <>
      <Navbar/>
      <div className="container pt-5">
        {isLoading ? (
          <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        ):(
<div className="row">
          {data?.map((item, index:number)=>{
            return (
              <div className="col-3" key={index}>
              <Card title={item?.title} id={item?.id} authorid={item?.authorId} genreid={item?.genreId} image={item?.image}/>
            </div>
            )
          })}
        </div>
        )} 
      </div>
    </>
  )
}

export default App
