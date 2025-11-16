import React, { Children, createContext, useState } from 'react'
import run from '../gemini';

export const dataContext = createContext()

const UserContext = ({ children }) => {
    let [speaking, setSpeaking] = useState(false)
    let [prompt, setPrompt] = useState("listening..")
    let [response, setResponse] = useState(false)

    function speak(text) {
        let text_speak = new SpeechSynthesisUtterance(text)
        text_speak.volume = 1;
        text_speak.rate = 1;
        text_speak.pitch = 1;
        text_speak.lang = "hi-GB"
        window.speechSynthesis.speak(text_speak)
    }
    async function aiResponse(prompt) {
        let text = await run(prompt)
        let newText = text.split("**") && text.split("*") && text.replace("google", "Rahul") && text.replace("Google", "Rahul")
        setPrompt(newText)
        speak(newText)
        setResponse(true)
        setTimeout(() => {
            setSpeaking(false)
        }, 5000)

    }
    let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    let recognition = new speechRecognition()
    recognition.onresult = (e) => {
        let currentIndex = e.resultIndex
        let transcript = e.results[currentIndex][0].transcript
        console.log(transcript)
        setPrompt(transcript)
        takeCommand(transcript.toLowerCase())
    }

    function takeCommand(command) {
        if (command.includes("open") && command.includes("youtube")) {
            window.open('https://www.youtube.com/', "_blank")
            speak('opening Youtube')
            setPrompt('opening Youtube..')
        }
        else if (command.includes("open") && command.includes("instagram")) {
            window.open('https://www.instagram.com/', "_blank")
            speak('opening Instagram')
            setPrompt('opening Instagram..')}
        else{
            aiResponse(command)
        }
    }

    const value = {
        recognition, speaking, setSpeaking, prompt, setPrompt, response, setResponse
    }

    return (
        <div>
            <dataContext.Provider value={value}>
                {children}
            </dataContext.Provider>
        </div>
    )
}

export default UserContext