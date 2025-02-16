import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { Context } from '../../App';
import {Link} from 'react-router-dom';

const Comics = () => {

  const people = [
    {id: 1, name: 'Alice', pets: [{name: 'Jack', type:'dog'}, {name: 'Bob', type:'cat'}]},
    {id: 2, name: 'Bob', pets: [{name: 'Chi', type:'turtle'}, {name: 'Chu', type:'rabbit'}]},
    {id: 3, name: 'Carl', pets: [{name: 'Upin', type:'hamster'}, {name: 'Ipin', type:'parrot'}]},
  ];

  //const [loggedinUser, setLoggedinUser] = useContext(Context);
  const [allComics, setAllComics] = useState({});

  //var comicUrl = process.env.BACK_END + "/comics/" + id + "/comic";

  useEffect(()=>{
          getAllComics().then((data) => {
              if (data) {
                  setAllComics(data);
              }            
          });
  },[]);

  useEffect(()=>{
      console.log("allComics : ");
      console.log(allComics);
  },[allComics]);

  const getAllComics = async () => {
    console.log("start of getAllComics");

    const response = await fetch("http://localhost:3001/comics"
    , {

        method: "GET",

      }
    );
    
    const data = await response.json();

    return data;
}

// const getComic = async (input) => { 
//   console.log("start of handleLogin");

//   const response = await fetch("http://localhost:3001/login", {

//       method: "POST",
//       credentials: 'include',
//       headers: {
//       'Content-Type': 'application/json',      
//       },
//       body: JSON.stringify(input),

//   });
//   const data = await response.json();

//   console.log("getComic request result:");
//   console.log(data);
//   setLoggedinUser(data);

  
// }



  return (
    <div className="Comics">
      <h3>All comics list</h3>
       
              {people ? 
              
                people.map((person, index) => (
                  <div key={index}>
                    <h2>Name: {person.name}</h2>

                    {person.pets.map((pet, index) => (
                      <div key={index}>
                        <h2>Pet: {pet.name}</h2>
                        <h2>Type : {pet.type}</h2>
                      </div>
                    ))}

                    <hr />
                  </div>
                ))
            
                : null
              }
                
              {allComics["allComics"] ?

                 allComics["allComics"].map((user)=>(
                    <div>
                      <h2>{user["_id"]}</h2>
                    
                      {user.comics.map((comic) => (
                      
                          <li>
                             <p>{comic.title}</p>
                             <img src={comic.mainImg} width="200px" alt="comic main image"/><br/>
                             <p>Synopsis : {comic.synopsis}</p>
                             <p>Likes : {comic.likes}</p>
                             <Link to={comic["_id"] + "/comic"}><button>Go to comic</button></Link>
                         </li>
                      
                      ))}
                    
                    </div>


                 
                ))


                 : null
              }

              {/* {allComics["allComics"] ?

                 allComics["allComics"].map((user)=>(
                    <div>
                      <h2>{user["_id"]}</h2>
                    
                      {user.comics.map((comic) => (
                      
                        <h2>Comic: {comic.title}</h2>
                      
                      ))}
                    
                    </div>


                 
                ))


                 : null
              } */}
              
              {/* {allComics["allComics"] ?
                 allComics["allComics"].map((user)=>{
                    console.log(user["comics"]);
                    
                    user["comics"].map((comic)=>{
                      console.log(comic["title"]);
                      
                       return <p>{comic["title"]}</p>
                        
                       
                      
                    })
                    
                    return <div>{user["_id"]}</div>
                  
                 })

                 : null
              } */}

              

              {/* {allComics["allComics"] ?
                 allComics["allComics"].map((user)=>{
                  return (
                    <li>{user["_id"]}</li>
                  )
                 })

                 : null
              } */}

              {/* {allComics["allComics"] ? 

                  allComics["allComics"].map((user)=>{user["comics"].map((comic)=>{
                    console.log("Hello!!");
                    return (
                      <li>
                        <p>Hello!!</p>
                        <p>{comic["title"]}</p>
                      </li>
                    )
                    
                    //console.log(comic["title"]);
                  })}) 

                  : null
              } */}
              
              
                
              

                {/* // return (
                //   <li>
                //       <p>{locals.comicsarr[i].comics[j].title}</p>
                //       <img src={locals.comicsarr[i].comics[j].mainImg} width="200px" alt="comic main image"/><br/>
                //       <p>Synopsis : {locals.comicsarr[i].comics[j].synopsis}</p>
                //       <p>Likes : {locals.comicsarr[i].comics[j].likes}</p>
                //       <a href="/comics/<%= locals.comicsarr[i].comics[j]._id %>/comic"><button>Go to comic</button></a>
                //   </li>
                // ) */}

            

       
    </div>
  )
}

export default Comics