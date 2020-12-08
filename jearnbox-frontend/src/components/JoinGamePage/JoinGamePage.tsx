import Axios from 'axios';
import React, { Fragment } from 'react'
import {Form, FormGroup, Input, Label} from 'reactstrap'
import {Redirect} from 'react-router-dom'
import './JoinGamePage.css'
import { InGamePage } from '../InGamePage/InGamePage';

export const JoinGamePage:React.FC<any> = (props:any) => {

    const [errMess, setErrMess] = React.useState("");
    const [gameJoined, setGameJoined] = React.useState(false);
    const [result, setResult] = React.useState("");
    const [uName, setUName] = React.useState("");

    const enterRoom = (event:any) => {
        event?.preventDefault();
        console.log("Button clicked")
        const form = event.currentTarget.parentElement;
        const userName = form.firstChild.childNodes[2].value;
        const roomCode = form.childNodes[1].childNodes[2].value;
        
        if(userName == ""){
            setErrMess("Please input a valid username");
            return;
        } else if(roomCode.length < 6){
            setErrMess("Please input a valid room code");
            return;
        } else{
            setErrMess("");
        }

        try{
            setResult("someIP");
            //const result = await Axios.get("url/{roomCode}");
        } catch(error){
            setErrMess("Something went wrong trying to connect to the server");
            return;
        }

        setUName(userName);
        setGameJoined(true);

    }


    return (
        <>
            {gameJoined ?
            <InGamePage address={result} uName={uName} gameJoined={setGameJoined}/>
            :
            <>
            <h1>JearnBox</h1>
            <Form>
                <FormGroup>
                    <Label for="userName">Username: </Label>
                    <br />
                    <input type="text" name="userName" id="userName" placeholder="12 char max" maxLength={12} />
                    <br />
                </FormGroup>
                <FormGroup>
                    <Label for="roomCode">Room Code: </Label>
                    <br />
                    <Input type="text" name="roomCode" id="roomCode" placeholder="6 char" maxLength={6} />
                    <br />
                </FormGroup>
                <Input type="submit" name="submit" id="submit" value="Enter Room" onClick={enterRoom}/>
            </Form>
            <p className="errMessClass">{errMess}</p>
            </>
    }
        </>
    )

}