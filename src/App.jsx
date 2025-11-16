import React, { useContext } from 'react'
import './App.css'
import va from './assets/ai.png'
import speakImg from './assets/speak.gif'
import aiGif from './assets/aiVoice.gif'
import { FaMicrophone } from "react-icons/fa6";
import { dataContext } from './context/UserContext';

const App = () => {
  let { recognition, setSpeaking, speaking, prompt, response, setPrompt,setResponse } = useContext(dataContext)

  return (
    <div className='main'>
      <img src={va} alt="" id='alice' />
      <span>I am Jenny, Your Virtual Assistant</span>
      {!speaking ? <button onClick={() => {
        setPrompt("listening..")
        setSpeaking(true)
        setResponse(false)
        recognition.start()
      }}>Click Here <FaMicrophone /></button> :
        <div className='response'>
          {response?<img src={speakImg} alt="" id='speak' />:<img src={aiGif} id="aiGif"/> }
          <p>{prompt}</p>
        </div>
      }
    </div>
  )
}

export default App