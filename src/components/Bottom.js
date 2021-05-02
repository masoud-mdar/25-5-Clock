import React from "react"

function Bottom(props) {
    return(
        <div className="buttom">
            <button className="btn" id="start_stop" onClick={props.data.player} >{props.data.play}</button>
            <button className="btn" id="reset" onClick={props.data.reseter} >reset</button>
        </div>
    )
}

export default Bottom