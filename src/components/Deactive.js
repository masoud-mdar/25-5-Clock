import React from "react"

function Deactive(props){
    const time = (props.data.isSession) ? props.data.sessionSecondOn.toString() : props.data.breakSecondOn.toString()
    String.prototype.toMMSS = function () {
        var sec_num = parseInt(this, 10); 
        var minutes = Math.floor((sec_num ) / 60);
        var seconds = sec_num -  (minutes * 60);
    
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        return minutes+':'+seconds;
    }
    const formattedTime = time.toMMSS()
    return(
        <div className="monitor">
            <h1 id="timer-label">{props.data.label}</h1>
            <div>
                <h1 id="time-left" className="minute" style={{color:props.data.color}}>{formattedTime}</h1>
            </div>
        </div>
    )
}

export default Deactive