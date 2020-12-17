import React, { useState } from 'react';
import SocketJsClient from 'react-stomp';



export const WebSocketConnection = (props) =>{

    const [text, setText] = useState("");

let clientRef;
    const handleData = (data) => {
        const result = JSON.parse(data);
        props.message += result.movement
    }

    const sendText = ()=>{

    }

    const sendMessage = (event) =>{
        console.log(event.currentTarget.childNodes[1].value)
        event.preventDefault();
        clientRef.sendMessage('/app/user-all',JSON.stringify({
            message: event.currentTarget.childNodes[1].value
        }));
    }
 
    return(
        <>
            <div>
                message:{text}
                <br/>
                <form onSubmit={sendMessage}>
                <label>Text:</label>
                <input type="text" name="testMessage">{props.message}</input>
                </form>

                <SocketJsClient 
                url="http://localhost:8080/gs-guide-websocket" 
                topics={['/topic/user']} 
                onConnect ={()=>{console.log("connected")}}
                onDisconnect = {()=>{console.log("disconnected")}}
                onMessage={ (msg)=>{ setText(msg); console.log(msg)}}
                ref={(client) =>{clientRef = client}}
                />



            </div>
        </>
    )
}