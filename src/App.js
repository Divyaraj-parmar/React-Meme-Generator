import './App.css';
import { useEffect, useState } from 'react';
import HeaderComponent from './Components/HeaderComponent';
import React from 'react';


function App() {

  const [memeTemplates, setTemplates] = useState([]); // Array of Memes
  const [inputCount, setInputCount] = useState(0);
  const [template, setTemplate] = useState([]);
  const [url, setUrl] = useState('');
  const [text, setText] = useState([]); // number of inputs
  // const [generatedMemeUrl , setGeneratedMemeUrl] = useState('');
  const [data, setData] = useState({
  
    username: 'memeBanataHaiApun',
    password: 'memeMaker1234',
    boxes: []
  })



  useEffect(() => {
    fetch(' https://api.imgflip.com/get_memes').then(x => x.json().then(response => setTemplates(response.data.memes)));
  }, []);

  useEffect(() => {
    setText(Array(inputCount).fill(''));
  }, [inputCount]);

  // useEffect(()=>{
  //   console.log(text);
  // },[text]);



  function optionHandler(e) {

    memeTemplates.map(data => {
      if (data.name === e.target.value) {
        setUrl(data.url);
        setInputCount(data.box_count);
        setTemplate(data);
      }
    })

  }

  // const insertTextToTemplate = (e, index) => {

  //   const insertedText = e.target.value || '';
  //   setText(
  //     text.map((c, idx) => {
  //       if (index === idx) {
  //         return insertedText;
  //       }
  //       else {
  //         return c;
  //       }
  //     })
  //   );

  // }

  const generateMeme = () => {
    // console.log(data.boxes);
    let URL = `https://api.imgflip.com/caption_image?template_id=${data.template_id}&username=${data.username}&password=${data.password}`;
    data.boxes.map((b, indx) => {
      URL += `&boxes[${indx}][text]=${b.text}`;
    });
    fetch(URL).then(response => response.json()).then(res =>{
      // setGeneratedMemeUrl(res.data.url);
      setUrl(res.data.url);
    })
    
    // console.log(URL);
  }


  return (
    <div className="App">
      <HeaderComponent />
      <center >
        <h1>Choose Template</h1>
        <select style={{ display: 'block' }} onChange={optionHandler}>
          <option selected disabled style={{ textAlign: 'center' }}>Select Meme Template</option>
          {memeTemplates.map(template => {
            return <option key={template.id} >{template.name}</option>
          })}
        </select>

        <img style={{ width: '275px', margin: '15px' }} src={url} alt={template.name}/>

        {text.map((t, index) => (
          <input
            key={index}
            placeholder={`text ${index + 1}`}
            onChange={(e) => {
              // insertTextToTemplate(e, index)
              const newBox = data.boxes;
              newBox[index] = { text: e.target.value };
              setData({ ...data,template_id: template.id, boxes: newBox });
              // console.log(template.id);
              
              
            }}

          />
        ))}
        <button
          onClick={() => {
            generateMeme()
            // console.log(data)
            // console.log(template)
          }}
        >Create Meme</button>

        {/* <h1>Your Meme</h1> */}
        {/* <img style={{ width: '275px', margin: '15px' }} src={generatedMemeUrl} /> */}

      </center>
    </div>
  );
}

export default App;
