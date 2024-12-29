import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Card from './components/Card'
import axios from 'axios'

interface book{
  title:string;
  id:string;
  authorId:string;
  genreId:string
}

function App() {

  const [data, setData] = useState<book[]>([]);;
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
              <Card name={item?.title} id={item?.id} authorId={item?.authorId} genreId={item?.genreId}/>
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
