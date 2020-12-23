import React, {useState} from "react";
import { Form, FormGroup, Input, Label } from 'reactstrap'
import { useDispatch } from 'react-redux';
import { setJoinVals } from '../../../_actions/JoinGameActions';
import SocketJsClient from "react-stomp";

export const WebsocketJoinComponent = (props) => {
    let clientRef;
    
    const joinGame = props.setGameJoined;
    const [text, setText] = useState("");

    
    const [errMess, setErrMess] = React.useState("");
    const [result, setResult] = React.useState("");
    const [uName, setUName] = React.useState("");

    const dispatch = useDispatch();
    dispatch(setJoinVals([{ errMess, result, uName }]));

    const sendMessage = (event) =>{
        event.preventDefault();
        const form = event.currentTarget.parentElement;

        const userName = form.firstChild.childNodes[2].value;
        const roomCode = form.childNodes[1].childNodes[2].value;

        if (userName == "") {
            setErrMess("Please input a valid username");
            dispatch(setJoinVals([{ errMess, result, uName }]));
            return;
        } else if (roomCode.length < 6) {
            setErrMess("Please input a valid room code");
            dispatch(setJoinVals([{ errMess,  result, uName }]));
            return;
        } else {
            setErrMess("");
        }

        clientRef.sendMessage('/app/join',JSON.stringify({
            name: form.firstChild.childNodes[2].value,
            roomCode: form.childNodes[1].childNodes[2].value,
        }));

        setUName(userName);
        joinGame(true);
        dispatch(setJoinVals([{ errMess, result, uName }]));
    }

  return (
    <>
      <Form>
        <FormGroup>
          <Label for="userName">Username: </Label>
          <br />
          <Input type="text" name="userName" id="userName" placeholder="12 char max" maxLength={12} />
          <br />
        </FormGroup>
        <FormGroup>
          <Label for="roomCode">Room Code: </Label>
          <br />
          <Input
            type="text"
            name="roomCode"
            id="roomCode"
            placeholder="6 char"
            maxLength={6}
          />
          <br />
        </FormGroup>
        <Input
          className="Button"
          type="submit"
          name="submit"
          id="submitJ"
          value="Enter Room"
          onClick={sendMessage}
        />
      </Form>
      <SocketJsClient
        url="http://localhost:8080/gs-guide-websocket"
        topics={["/game/players"]}
        onConnect={() => {
          console.log("connected");
        }}
        onDisconnect={() => {
          console.log("disconnected");
        }}
        onMessage={(msg) => {
          //setText(msg);
          console.log(msg);
        }}
        ref={(client) => {
          clientRef = client;
        }}
      />
    </>
  );
};
