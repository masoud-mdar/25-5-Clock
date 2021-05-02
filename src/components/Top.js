import React from "react"
function Top (props){
    //console.log(props.data.sessionSecondOff)
    const breakTime = (props.data.breakSecondOff/60)
    const sessionTime = (props.data.sessionSecondOff/60)
    return(
        <div className="top">
            <div id="break-section">
                <h1 className="label" id="break-label">Break Length</h1>
                <h1 className="length" id="break-length">{breakTime}</h1>
                
                <div className="buttons">
                    <button className="btn" id="break-increment" name="breakCount" onClick={props.data.Increment} >+</button>
                    <button className="btn" id="break-decrement" name="breakCount" onClick={props.data.Decrement} >-</button>
                </div>

            </div>
            <br />
            <div id="sesseion-section">
                <h1 className="label" id="session-label">Session Length</h1>
                <h1 className="length" id="session-length">{sessionTime}</h1>

                <div className="buttons">
                    <button className="btn" id="session-increment" name="sessionCount" onClick={props.data.Increment} >+</button>
                    <button className="btn" id="session-decrement" name="sessionCount" onClick={props.data.Decrement} >-</button>
                </div>

            </div>
        </div>
    )
}
export default Top