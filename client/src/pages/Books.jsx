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
    <h1 style={{marginBottom:100,color:'blueviolet'}}>Book Store: Tokyo</h1>
    {books.length}
    <div className='books'>
    {
        books.map(book=>(
            <div className='book' key={book.id}>

            {book.cover ? <img src={book.cover} alt="" /> : undefined }
             <h3>{book.title}</h3>
             <p style={{overflow:'scroll', fontSize:12,height:'105px',paddingRight:"11px", paddingLeft:"7px"}}>{book.desc}</p>
             <p style={{fontSize:10,color:'blue',paddingRight:"5px", paddingLeft:"5px"}}>{book.url}</p>
             <p>Price:¥ {book.price}</p>
             
             <button  className='delete' onClick = {()=>handleDelete(book.id)}>Delete</button>
             <button className='update'><Link to={`/update/${book.id}`}>Update</Link></button>
            </div>
        ))
    }
    </div>
    <button style={{margin:60,backgroundColor:'yellow',color:"white",fontSize:18,textDecoration:"none",padding:"3px 10px"}}>
    <Link to="/add">Add new Book</Link></button>
    </div>
  )
}

export default Books

