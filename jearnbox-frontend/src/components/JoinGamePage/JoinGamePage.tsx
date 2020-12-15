import Axios from 'axios';
import React from 'react'
import { Form, FormGroup, Input, Label } from 'reactstrap'
import './JoinGamePage.css'
import { InGamePage } from '../InGamePage/InGamePage';
import { useDispatch } from 'react-redux';
import { setJoinVals } from '../../_actions/JoinGameActions';

export const JoinGamePage: React.FC<any> = (props: any) => {

    const [errMess, setErrMess] = React.useState("");
    const [gameJoined, setGameJoined] = React.useState(false);
    const [result, setResult] = React.useState("");
    const [uName, setUName] = React.useState("");

    const dispatch = useDispatch();
    dispatch(setJoinVals([{ errMess, gameJoined, result, uName }]));

    const enterRoom = (event: any) => {
        event?.preventDefault();
        const form = event.currentTarget.parentElement;
        const userName = form.firstChild.childNodes[2].value;
        const roomCode = form.childNodes[1].childNodes[2].value;

        if (userName == "") {
            setErrMess("Please input a valid username");
            dispatch(setJoinVals([{ errMess, gameJoined, result, uName }]));
            return;
        } else if (roomCode.length < 6) {
            setErrMess("Please input a valid room code");
            dispatch(setJoinVals([{ errMess, gameJoined, result, uName }]));
            return;
        } else {
            setErrMess("");
        }

        try {
            setResult("someIP");
            //const result = await Axios.get("url/{roomCode}");
        } catch (error) {

            dispatch(setJoinVals([{ errMess, gameJoined, result, uName }]));
            setErrMess("Something went wrong trying to connect to the server");
            return;
        }

        setUName(userName);
        setGameJoined(true);
        dispatch(setJoinVals([{ errMess, gameJoined, result, uName }]));

        // enterFunction(event, setErrMess, setGameJoined, setResult, setUName);

    }


    return (
        <>
            {gameJoined ?
                <InGamePage address={result} uName={uName} gameJoined={setGameJoined} />
                :
                <>
                    <h1>JearnBox</h1>
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
                            <Input type="text" name="roomCode" id="roomCode" placeholder="6 char" maxLength={6} />
                            <br />
                        </FormGroup>
                        <Input className="Button" type="submit" name="submit" id="submitJ" value="Enter Room" onClick={enterRoom} />
                    </Form>
                    <p className="errMessClass">{errMess}</p>
                </>
            }
        </>
    )

}