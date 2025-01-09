import React, { useEffect, useState } from 'react'
import axios from 'axios'

interface AnimeList {
  id:string
  title:string
  authorid:string
  genreid:string
  image:string
}

interface Genre {
  id:string
  name:string
}
interface Author {
  id:string
  name:string
}

interface ApiResponse<T> {
  data: T;
}



function Card({id,title,authorid,genreid,image}:AnimeList) {

   const [genres, setGenres] = useState<Genre[]>([]);
   const [authors, SetAutthors] = useState<Author[]>([]);
   const [matchedGenre, setMatchedGenre] = useState<Genre | null>(null); 
   const [matchedAuthor, setMatchedAuthor] = useState<Author | null>(null); 

  useEffect(() => {
    // Fetch genres
    axios.get<ApiResponse<Genre[]>>('https://author-book-genre.vercel.app/api/author')
      .then((response) => {
        const fetchedAuthor: Genre[] = response.data.data;
        SetAutthors(fetchedAuthor);

        // Find the genre that matches the genreid
        const author = fetchedAuthor.find((item) => item.id === authorid);
        setMatchedAuthor(author || null);
      })
      .catch((error) => {
        console.error('Error fetching genres:', error);
      });
  }, [authorid]);

  useEffect(() => {
    // Fetch genres
    axios.get<ApiResponse<Genre[]>>('https://author-book-genre.vercel.app/api/genre')
      .then((response) => {
        const fetchedGenres: Genre[] = response.data.data;
        setGenres(fetchedGenres);

        // Find the genre that matches the genreid
        const genre = fetchedGenres.find((item) => item.id === genreid);
        setMatchedGenre(genre || null);
      })
      .catch((error) => {
        console.error('Error fetching genres:', error);
      });
  }, [genreid]);


  return (
    <div className="card my-2">
    <div className='container-fluid' style={{height:'400px', overflow:'hidden'}}>
      <img src={image} className="card-img-top" alt="..."/>
    </div>
    <div className="card-body">
      <h5 className="card-title text-truncate">{ title }</h5>
            <h6 className="card-subtitle text-muted">
         {matchedGenre ? matchedGenre.name : '....'}
        </h6>
        <h6 className="card-subtitle text-muted">
         {matchedAuthor ? matchedAuthor.name : '....'}
        </h6>
      <a href={"#"} className="btn btn-primary" target='_blank'>Go somewhere</a>
    </div>
  </div>
  )
}

export default Card
