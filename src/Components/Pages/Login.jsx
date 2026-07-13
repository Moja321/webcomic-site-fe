import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { Context } from '../../App';
import { Link, useNavigate, useParams } from 'react-router-dom';
import EditComic from './EditComic';

const Login = () => {

  var navigate = useNavigate();

  //const {id} = useParams();

  const [loggedinUser, setLoggedinUser] = useContext(Context);

  //you can get comic Id from the below react state
  const [comicToEdit, setComicToEdit] = useState({});

  //react state for image previewer
  const [previewSrc, setPreviewSrc] = useState('');
  //for multiple previews
  const [previews, setPreviews] = useState([]);


  useEffect(()=>{
          console.log("comicToEdit:");
          console.log(comicToEdit);
  },[comicToEdit]);

  // Clean up the object URL when the component unmounts or a new file is chosen (for image previewer)
  // This is to prevent memory leaks
  useEffect(() => {
    return () => {
      if (previewSrc) {
        //must be called to prevent memory leaks 
        //if not, URL.createObjectURL() will cause the browser to hold the images in memory
        URL.revokeObjectURL(previewSrc);
      }
    };
  }, [previewSrc]);
  
  //Clean up ALL object URLs to prevent memory leaks for multiple previews
  useEffect(() => {
    return () => {
      previews.forEach(p => URL.revokeObjectURL(p.src));
    };
  }, [previews]);

  //function for image previewer
  const handleFileSelect = (evt) => {
    const file = evt.target.files[0]; // Get the single selected file

    if (file && file.type.startsWith('image/')) {
      // Create a temporary local URL for the new image
      const newUrl = URL.createObjectURL(file);
      setPreviewSrc(newUrl);
    }
  };

  //multiple previews version
  const handleFileSelectMultiple = (evt) => {
    const files = Array.from(evt.target.files); // Convert FileList to standard Array

    // Filter out non-images and map them into preview objects
    const newPreviews = files
      .filter(file => file.type.startsWith('image/'))
      .map(file => ({
        id: crypto.randomUUID(), // Unique key for React mapping
        src: URL.createObjectURL(file),
        name: file.name,
        file : file // <-- CRITICAL: Keep a reference to the actual raw file object
      }));

    //setPreviews(newPreviews);
    
    // Append the new previews to the existing ones using the spread operator
    setPreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
  };

  const handleRemovePreview = (idToRemove) => {
    setPreviews((prevPreviews) => {
      // Optional but recommended: Revoke the object URL to free up memory
      const imageToDelete = prevPreviews.find(p => p.id === idToRemove);
      if (imageToDelete && imageToDelete.src) {
        URL.revokeObjectURL(imageToDelete.src);
      }
      
      // Filter out the image with the matching ID
      return prevPreviews.filter((preview) => preview.id !== idToRemove);
    });
  };

  const [formValues, setFormValues] = useState({ title: 'One Piece'});
  const handleChange = (event) => {
      //notice the 2 different forms of deconstructuring used below*
      const { name, value } = event.target;
      setFormValues({ ...formValues, [name]: value });
  };

  //method handlers (input initalisers)
  const handleCreateComic = (event) => {

    //initalise input data for createComic and run createComic(input)

    console.log("Start of handleCreateComic():");

    //prevents page from reloading
    event.preventDefault();

    let formData = new FormData();
    formData.append('title', event.target.title.value);
    formData.append('comicImg', event.target.comicImg.files[0]);
    formData.append('synopsis', event.target.synopsis.value);

    //const form = new FormData(event.target);

    alert('Submitted comic details for creation: Title:' + formValues.title);
    console.log("formData : ");
    //Display the key/value pairs
    for (var pair of formData.entries())
    {
      console.log(pair[0]+ ', '+ pair[1]); 
    }
    // console.log(formData);
    // console.log(formData.title);
    createComic(formData).then((data) => {
        //navigate(0); doesnt work for some reason
        window.location.reload(); //temporary solution, should really rerender with setState
        alert('Comic :' + data.title + ' has been created!');

    });
  }
  
  const handleCreateChapter = (event) => {
    //initalise input data for createChapter and run createChapter(input)

    console.log("Start of handleCreateChapter():");

    //prevents page from reloading
    event.preventDefault();

    let formData = new FormData();
    // formData.append('title', event.target.title.value);
    // formData.append('comicImg', event.target.comicImg.files[0]);
    // formData.append('synopsis', event.target.synopsis.value);
    formData.append('chapterTitle', event.target.chapterTitle.value);
    formData.append('data1', 1);
    formData.append('data2', 2);

    //const form = new FormData(event.target);

    alert('Submitted chapter name for creation: Title : ' + event.target.chapterTitle.value);
    console.log("formData : ");
    //Display the key/value pairs
    for (var pair of formData.entries())
    {
      console.log(pair[0]+ ' : '+ pair[1]); 
    }

    //call createChapter()
    //need to find a way to assign comicId
    let comicIdVal = comicToEdit.comic._id;
    console.log("comicId for createChapter is : " + comicIdVal);
    createChapter(formData,comicIdVal).then((data) => {
        //navigate(0); doesnt work for some reason
        //window.location.reload(); //temporary solution, should really rerender with setState
        if (data.title){

          //get the most recently added chapter
          let chapterData = data.chapters[data.chapters.length - 1];

          // for (var chapter of data.chapters){
          //   if (chapter._id = )
          // }


          alert('Chapter : ' + chapterData.chapterTitle + ' has been created!');
        } else {
          alert('No chapter was created');
        }
        

    });

  }

  //end of method handlers

  const createComic = async (input) => { 
    console.log("start of register()");

    // const formData = new FormData();
 
    // formData.append("files", input.comicImg[0]);
    // input = { ...input, comicImg: input.comicImg[0].name };
    // formData.append("recipe", JSON.stringify(input));

    const response = await fetch("http://localhost:3001/editcomics", {

        method: "POST",
        credentials: 'include',
        
        body: input,

    });
    const data = await response.json();

    console.log("createComic result:");
    console.log(data);
    //setLoggedinUser(data);
    return data;

    //maybe need to refresh the page after succesful api call to update edit comics list

    
  }

  const editComic = (comicId) => {
    console.log("editing chosen comic!");
    console.log("comicid is : " + comicId);
    var target;

    loggedinUser["comics"].map((comic)=>(
      comicId == comic._id ? 
      target = comic :
      null
    ))
    //console.log("comic to edit :");
    console.log("Target is :");
    console.log(target);
     setComicToEdit({comic : target});
  }

  const createChapter = async (input, comicId) => {
    //TODO 10/4/25
    console.log("start of createChapter:");

    console.log("createChapter input is : ");
    for (var pair of input.entries())
    {
      console.log(pair[0]+ ' : '+ pair[1]); 
    }

    //fetch "editcomics/chapters/:id"
    const response = await fetch("http://localhost:3001/editcomics/chapters/" + comicId, {

        method: "POST",
        credentials: 'include',
        
        body: input,

    });
    const data = await response.json();

    console.log("createChapter result:");
    console.log(data);
    //setLoggedinUser(data);
    return data;
  }

  const handleUploadPages = (event) => {

    console.log("Start of handleUploadPages() :");

    //prevents page from reloading
    event.preventDefault();

    let formData = new FormData();
    // formData.append('title', event.target.title.value);
    // formData.append('comicImg', event.target.comicImg.files[0]);
    // formData.append('synopsis', event.target.synopsis.value);
    //formData.append('chapterTitle', event.target.chapterTitle.value);
    formData.append('chapters', event.target.chapters.value);
    //formData.append('chapterImg', event.target.chapterImg.files);

    // for (var file of event.target.chapterImg.files){
    //   formData.append('files', file);
    // }

    // Optional: Frontend validation since the native 'required' attribute on the input 
    // won't accurately track the accumulated files anymore.
    if (previews.length === 0) {
      alert("Please select at least one image page to upload.");
      return;
    }

    // CHANGED HERE: Instead of reading from the native file input,
    // loop through your accumulated React state and pull out the 'file' property
    previews.forEach((preview) => {
      formData.append('chapterImg', preview.file);
    });

    //previous loop using native event.target method, instead of reading from a React state variable.
    // for (let i=0;i<event.target.chapterImg.files.length;i++){
    //   formData.append('chapterImg', event.target.chapterImg.files[i]);
    // }

    alert('Submitted uploading image pages to chapter with ID : ' + event.target.chapters.value);
    console.log("formData for uploadChapters: ");
    //Display the key/value pairs
    for (var pair of formData.entries())
    {
      console.log(pair[0]+ ' : '+ pair[1]); 
    }

    // for (var file of formData.chapterImg){
    //   console.log(file);
    // }

    console.log(formData.getAll("chapterImg"));

    //TODO 4/11/25: Test code below
    //call uploadPages()
    
    let comicIdVal = comicToEdit.comic._id;
    console.log("comicId for uploadPages is : " + comicIdVal);
    uploadPages(formData,comicIdVal).then((data) => {
        //navigate(0); doesnt work for some reason
        //window.location.reload(); //temporary solution, should really rerender with setState
        if (data.title){

          let chapterData = data.chapters[data.chapters.length - 1];

          alert('Chapter : ' + chapterData.chapterTitle + ' has been updated!');
        } else {
          alert('No chapter was updated');
        }

    });

  }

  const uploadPages = async (input,comicId) => {
    //TODO after completing createChapter()
    //"/edit-chapters/:id"

    console.log("start of uploadPages()");

    const response = await fetch("http://localhost:3001/editcomics/edit-chapters/" + comicId, {

        method: "POST",
        credentials: 'include',
        
        body: input,

    });
    const data = await response.json();

    console.log("uploadPages result:");
    console.log(data);
    //setLoggedinUser(data);
    return data;

  }

  const updateComic = () => {
    //TODO after completing uploadPages()
  }


  return (
    <div className="">

      <div>Login</div>
      <p>Logged in user page of:  {loggedinUser["username"] || "none"} </p> 
      <p>This is where users can create or update comics/series</p>

      <h2>Create comic</h2>
      <form onSubmit={handleCreateComic} encType="multipart/form-data">
        <label htmlFor="title">Title:</label><br/>
        <input type="text" id="title" name="title" onChange={handleChange} defaultValue={formValues.title} required/><br/>

        <p>Upload thumbnail image for comic here:</p>
        <input type="file" accept="image/jpeg" id="comicImg" name="comicImg" required/><br/>
        <output id="preview"></output><br/>

        <label htmlFor="synopsis">Synopsis:</label><br/>
        <textarea id="synopsis" name="synopsis" rows="4" cols="50" required>blablabla</textarea><br/>
        
        <input type="submit" defaultValue="Submit"/>
      </form>
      <br/>

      <p>Click on a comic to edit/update</p>
      <h2>Comics List</h2>
      <ul>
          
        { loggedinUser["username"] ? 
            loggedinUser["comics"].map((comic)=>(
              
              <li>

                <p>{comic.title}</p>
                { (loggedinUser["username"] == "Zack" || loggedinUser["username"] == "Bob") ? 
                  <img src={comic.mainImg} width="200px" alt="comic main image"/>
                  :
                  <img src={process.env.REACT_APP_BACK_END + comic.mainImg} width="200px" alt="comic main image"/>
                }
                
                <br/>
                <br/>
                {/* <Link to={"/editcomic/" + comic._id}><button>EDIT</button></Link> */}
                <button onClick={() => editComic(comic._id)}>EDIT COMIC</button>
                <form
                  style={{display: "inline"}}
                  action=""
                  method="POST"
                >
                  <input type="submit" defaultValue="DELETE" />
                </form>


              </li>
            ))
            
            : null
        }   

      </ul>

      { comicToEdit["comic"] ? 
           <div className="comic">
            <h1>Hello!{comicToEdit.comic._id}</h1>

            <h2>Edit existing comic - {comicToEdit.comic.title}: </h2>
            <form action="/editcomics/comicid" method="POST" encType="multipart/form-data">
              <label htmlFor="title">Title:</label><br/>

              <input 
                type="text" 
                id="title" 
                name="title" 
                defaultValue={comicToEdit?.comic?.title}  
                required              
              /><br/>

              <p>Upload thumbnail image for comic here:</p>
              <input 
                type="file" 
                accept="image/*" 
                id="comicImg" 
                name="comicImg" 
                onChange={handleFileSelect} 
                required
              /><br/>
              <output id="preview">

                {previewSrc && (
                  <span>
                    <img 
                      style={{ width: '200px', border: '1px solid #000', margin: '5px' }} 
                      src={previewSrc} 
                      alt="New thumbnail preview" 
                    />
                  </span>
                )}

              </output>
              <br/>
              <p>Current comic thumbnail image:</p>
              <img src="" alt="comic main image"/><br/>
              <br/>
              <label htmlFor="synopsis">Synopsis:</label><br/>
              <textarea id="synopsis" name="synopsis" rows="4" cols="50" defaultValue={editComic?.synopsis} required></textarea><br/>
              
              <input type="submit" defaultValue="Submit edit"/>
            </form>
            
            <br/>

            <h2>Add new chapter:</h2>
            <form onSubmit={handleCreateChapter}>
              <label htmlFor="chapterTitle">Chapter Title:</label><br/>
              <br/>
              <input type="text" id="chapterTitle" name="chapterTitle" defaultValue="Chapter 1" required/><br/>
              <br/>
              <input type="submit" defaultValue="Add new chapter"/>
            </form>

            <br/>

            <h2>Add chapter pages:</h2>

            <form onSubmit={handleUploadPages} encType="multipart/form-data">
              <label htmlFor="chapters">Choose a comic chapter:</label>
              <select name="chapters" id="chapters" required>
                {/* if (editComic) for(let i=0; i< locals.editComic.chapters.length; i++){ 

                <option defaultValue="<%= editComic["chapters"][i]["_id"] %>"><%= editComic["chapters"][i]["chapterTitle"] %></option> */}

                {comicToEdit.comic.chapters.map((chapter) => (
                                      
                    <option value={chapter._id}>{chapter.chapterTitle}</option>
                                      
                ))}
                
                
              </select>
              <br/>
              <br/>
              <label htmlFor="chapterImg"
              
                style={{
                  display: 'inline-block',
                  padding: '8px 12px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
                            
              >Choose pages (max 10)</label>
              <br/>
              <br/>
              <input 
                type="file" 
                accept="image/*" 
                id="chapterImg" 
                name="chapterImg" 
                multiple
                onChange={handleFileSelectMultiple}
                style={{ display: 'none' }} // <-- This hides the input and its default text completely
              />
              <output id="previews">

                {previews.map((preview) => (
                  <span 
                    key={preview.id} 
                    style={{ display: 'inline-block', position: 'relative', textAlign: 'center', margin: '5px' }}
                  >
                    <img 
                      style={{ width: '150px', border: '1px solid #000', display: 'block' }} 
                      src={preview.src} 
                      alt={preview.name}
                      title={preview.name} 
                    />
                    <button
                      type="button" // CRITICAL: Setting type="button" prevents it from accidentally submitting the form
                      onClick={() => handleRemovePreview(preview.id)}
                      style={{
                        marginTop: '5px',
                        backgroundColor: '#ff4d4d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px',
                        padding: '2px 8px',
                        cursor: 'pointer'
                      }}
                    >
                      Remove
                    </button>
                  </span>
                ))}

              </output>
              <br/>
              <input type="submit" value="Upload chapter pages"/>
              <p>locals.errorMsg || "Please upload images for the comic chapter selected"</p>
            </form>

            <br/>
           
           </div>

           
            
            : null
        }   




    </div>
    
  )
}

export default Login