import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

function Books() {
    const [books, setBooks] = useState([])

    useEffect(() => {
        const fetchAllBooks = async ()=>{
            try{
                const res= await axios.get('http://localhost:8800/books')
                setBooks(res.data);
                console.log(res)
            }catch(err){
                console.log(err)
            }
        }
      fetchAllBooks()
    }, [])
    
    const handleDelete = async (id) => {
        try{
            await axios.delete('http://localhost:8800/books/'+id)
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }

  return (
    <div>
    <h2>Kobe Book Store</h2>
    {books.length}
    <div className='books'>
    {
        books.map(book=>(
            <div className='book' key={book.id}>
             {book.cover && <img src={book.cover} alt="" />}
             <h3>{book.title}</h3>
             <h3>Description: {book.desc}</h3>
             <h2>Price: {book.price}</h2>
             
             <button  className='delete' onClick = {()=>handleDelete(book.id)}>Delete</button>
             <br/>
             <button className='update'><Link to={`/update/${book.id}`}>Update</Link></button>
            </div>
        ))
    }
    </div>
    <button>
    <Link to="/add">Add new Book</Link></button>
    </div>
  )
}

export default Books