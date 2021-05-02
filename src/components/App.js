import React, {useState, useEffect} from "react"
import Active from "./Active"
import Deactive from "./Deactive"
import Top from "./Top"
import Bottom from "./Bottom"

function NewApp () { 
    const [breakSecondOff, setBreakSecondOff] = useState(300)
    const [sessionSecondOff, setSessionSecondOff] = useState(1500)
    const [breakSecondOn, setBreakSecondOn] = useState(300)
    const [sessionSecondOn, setSessionSecondOn] = useState(1500)
    const [color, setColor] = useState("rgba(255,255,255,.75)")
    const [isActive, setIsActive] = useState(false)
    const [isBreak, setIsBreak] = useState(false)
    const [isSession, setIsSession] = useState(true)
    const [label, setLabel] = useState("Session")
    const [play, setPlay] = useState("|>")
    
    const Increment = (event) =>{
        /// Here mesures will be displayed in seconds
        const {name} = event.target
        if ((!isActive)){
            if (name === "breakCount" && breakSecondOff < 3600){
                setBreakSecondOn(() => {return breakSecondOff})
                setBreakSecondOff(prevBreakSecondOff => prevBreakSecondOff + 60)
                setBreakSecondOn(prevBreakSecondOn => prevBreakSecondOn + 60)
                if (isBreak){
                    setColor("rgba(255,255,255,.75)")
                }

            } else if (name === "sessionCount" && sessionSecondOff < 3600){
                setSessionSecondOn(() => {return sessionSecondOff})
                setSessionSecondOff(prevSessionSecondOff => prevSessionSecondOff + 60)
                setSessionSecondOn(prevSessionSecondOn => prevSessionSecondOn + 60)
                if (isSession){
                    setColor("rgba(255,255,255,.75)")
                }
            }
        }
    }

    const Decrement = (event) =>{
        /// Here mesures will be displayed in seconds
        const {name} = event.target
        if ((!isActive)){
            if (name === "breakCount" && breakSecondOff > 60){
                setBreakSecondOn(() => {return breakSecondOff})
                setBreakSecondOff(prevbreakSecondOff => prevbreakSecondOff - 60)
                setBreakSecondOn(prevBreakSecondOn => prevBreakSecondOn - 60)
                if (isBreak){
                    setColor("rgba(255,255,255,.75)")
                }

            } else if(name === "sessionCount" && sessionSecondOff > 60) {
                setSessionSecondOn(() => {return sessionSecondOff})
                setSessionSecondOff(prevsessionSecondOff => prevsessionSecondOff - 60)
                setSessionSecondOn(prevSessionSecondOn => prevSessionSecondOn - 60)
                if (isSession){
                    setColor("rgba(255,255,255,.75)")
                }
            }
        }
    }

    const SessionCounter = () => {
        console.log("calls the session counter")
        if (sessionSecondOn > 60){
            setColor("rgba(255,255,255,.75)")
            setSessionSecondOn(prevSessionSecondOn => prevSessionSecondOn - 1)
        } else if(sessionSecondOn <= 60 && sessionSecondOn > 0) {
            setColor("orangered")
            setSessionSecondOn(prevSessionSecondOn => prevSessionSecondOn - 1)
        } else if(sessionSecondOn === 0){
            // offs the session so Dispathcer will call BreakCounter
            setBreakSecondOn(breakSecondOff)
            setIsSession(false)
            setIsBreak(true)
            setLabel("Break")
            const t = document.getElementById("beep")
            t.play()
        }
    }

    const BreakCounter = () => {
        console.log("calls the break counter")
        if (breakSecondOn > 60){
            setColor("rgba(255,255,255,.75)")
            setBreakSecondOn(prevBreakSecondOn => prevBreakSecondOn - 1)
        } else if(breakSecondOn <= 60 && breakSecondOn > 0) {
            setColor("orangered")
            setBreakSecondOn(prevBreakSecondOn => prevBreakSecondOn - 1)
        } else if(breakSecondOn === 0) {
            // offs the session so Dispathcer will call SessionCounter
            setSessionSecondOn(sessionSecondOff)
            setIsBreak(false)
            setIsSession(true)
            setLabel("Session")
            const t = document.getElementById("beep")
            t.play()
        }
    }


    const Dispatcher = () =>{
        if (isActive){
            if (isSession){
                setPlay("||")
                SessionCounter()
                
            } else if (isBreak){
                setPlay("||")
                BreakCounter()
            }
        } else {
            setPlay("|>")
        }
    }

    useEffect(() =>{
        const intervalId = setInterval(Dispatcher,1000)
        return () => clearInterval(intervalId)
    })

    const player = () =>{

        setIsActive(prevIsActive => !prevIsActive)
    }

    const reseter = () =>{
        setIsActive(false)
        setIsBreak(false)
        setIsSession(true)
        setSessionSecondOff(1500)
        setSessionSecondOn(1500)
        setBreakSecondOff(300)
        setBreakSecondOn(300)
        setLabel("session")
        setColor("rgba(255,255,255,.75)")
        setPlay("|>")
        const t = document.getElementById("beep")
        t.pause()
        t.currentTime = 0
    }

    
    return(
        <div className="container">
            <div className="control">
                <div id="top-section">
                    <Top data={{breakSecondOff,sessionSecondOff,Increment,Decrement}} />
                </div>
                <div id="bottom-section">
                    <Bottom data={{player,reseter, play}} />
                </div>
            </div>


            <div id="monitor">
                {(isActive && isSession) ? <Active data={{sessionSecondOn,color,label,isSession,isBreak}} />
                 :(!isActive && isSession) ? <Deactive data={{sessionSecondOn,color,label,isSession,isBreak}} />
                 :(isActive && isBreak) ?<Active data={{breakSecondOn,color,label,isSession,isBreak}} />
                 :<Deactive data={{breakSecondOn,color,label,isSession,isBreak}} />}
                <div id="sound">
                    <audio src="https://onlineclock.net/audio/options/default.mp3" className="" id="beep"></audio>
                </div>
            </div>

        </div>

    )
}

export default NewApp