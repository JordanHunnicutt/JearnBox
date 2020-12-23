import React, { useEffect } from 'react';
import SocketJsClient from "react-stomp";


export const QuestionComponent = (props) =>{

    let clientRef;

    const getQuestion = () =>{

        const message = clientRef.sendMessage('/app/question')
        console.log(message);
    }

    // useEffect(()=>{
    //     const interval=setInterval(()=>{
    //         getQuestion()},5000);
    //         return ()=>{clearInterval(interval)}
    // },[]);

    // clientRef.sendMessage('/app/questions',JSON.stringify({}))
    return(
        <>
        <button onClick={getQuestion}>get the question</button>
        <SocketJsClient
        url="http://localhost:8080/gs-guide-websocket"
        topics={["/game/players"]}
        onConnect={() => { console.log("connected");}}
        onDisconnect={() => {console.log("disconnected");}}
        onMessage={(msg) => {console.log(msg);}}
        ref={(client) => {clientRef = client;}}/>
        </>
    )
}