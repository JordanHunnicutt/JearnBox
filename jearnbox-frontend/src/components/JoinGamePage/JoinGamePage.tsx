import Axios from 'axios';
import React from 'react'
import './JoinGamePage.css'
import { InGamePage } from '../InGamePage/InGamePage';
import { useDispatch } from 'react-redux';
import { setJoinVals } from '../../_actions/JoinGameActions';
import { WebsocketJoinComponent } from './WebsocketJoinComponent/WebsocketJoinComponent';

export const JoinGamePage: React.FC<any> = (props: any) => {

    const [errMess, setErrMess] = React.useState("");
    const [gameJoined, setGameJoined] = React.useState(false);
    const [result, setResult] = React.useState("");
    const [uName, setUName] = React.useState("");

    const dispatch = useDispatch();
    dispatch(setJoinVals([{ errMess, gameJoined, result, uName }]));




    return (
        <>
            {gameJoined ?
                <InGamePage address={result} uName={uName} gameJoined={setGameJoined} />
                :
                <>
                    <h1>JearnBox</h1>
                    <WebsocketJoinComponent setGameJoined={setGameJoined} />
                    <p className="errMessClass">{errMess}</p>
                </>
            }
        </>
    )

}