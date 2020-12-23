import Axios from 'axios';
import React from 'react'
import { Form, FormGroup, Input, Label } from 'reactstrap';
import './InGamePage.css'
import { QuestionComponent } from './QuestionAnswerWebSockets/QuestionComponent';

interface IGInfo {
    address: string,
    uName: string,
    gameJoined:(val:boolean)=>{}
}

interface IQInfo{
    questionId:number,
    question:string,
    answer:string,
    category:string
}

export const InGamePage: React.FC<any> = (props: IGInfo) => {

    const displayName = props.uName;

    const [questionText, setQuestionText] = React.useState("Waiting for the host to start the game...");
    const [answerHidden, setAnswerHidden] = React.useState(false);
    const [score, setScore] = React.useState(0);
    const [rightAnswer, setRightAnswer] = React.useState("");
    let qObject:[IQInfo] = [{questionId:0,question:'',answer:'',category:''}];
    let uQArr:[number] = [-1];

    const changeQuestion = (newText: string) => {
        //do websocket code to get question text and answer
        // rightAnswer = "correct";
        setQuestionText(newText);
        setAnswerHidden(false);
    }

    const changeQuestionNoSockets = async () => {

        if(qObject[0].questionId == 0){
            qObject = await (await Axios.get('http://localhost:9010/question')).data;
        }

        if(uQArr.length - 1 < qObject.length){
            let randomQ = -1;
            while(uQArr.includes(randomQ)){
                randomQ = Math.floor(Math.random() * (qObject.length - 1));
            }
            uQArr.push(randomQ);
            setQuestionText(qObject[randomQ].question);
            setRightAnswer(qObject[randomQ].answer);
            setAnswerHidden(false);
        } else{
            uQArr = [-1];
            let randomQ = -1;
            while(uQArr.includes(randomQ)){
                randomQ = Math.floor(Math.random() * (qObject.length - 1));
            }
            uQArr.push(randomQ);
            setQuestionText(qObject[randomQ].question);
            setRightAnswer(qObject[randomQ].answer);
            setAnswerHidden(false);
        }

    }

    const submitAnswer = (event: any) => {
        event?.preventDefault();
        setAnswerHidden(true);
        const form = event.currentTarget.parentElement;
        const answer = form.firstChild.firstChild.value;
        setQuestionText("Waiting for other players...");
        // setTimeout(function () { changeQuestion('This is a new question?'); checkAnswer(answer); }, 3000);
        setTimeout(function () { checkAnswer(answer); changeQuestionNoSockets(); }, 2000);
    }

    const checkAnswer = (val:string) => {
        if(val == rightAnswer){
            setScore(score + 100);
            console.log("right answer");
        } else{
            console.log("wrong answer");
        }
    }

    const gameExit = (event:any) => {
        event?.preventDefault();
        //disconnect from websocket
        props.gameJoined(false);
    }

    return (
        <>
            <h1>{displayName}</h1>
            <h2>Score: {score}</h2>
            <h3>{questionText}</h3>
            <Form hidden={answerHidden}>
                <FormGroup>
                    <Input type="text" name="answer" id="answer" placeholder="Type your answer here" />
                </FormGroup>
                <Input className="Button" type="submit" name="submit" id="submit" value="Submit Answer" onClick={submitAnswer} />
                <Input className="Button" type="submit" onClick={gameExit} value="Quit"/>

            </Form>

            <QuestionComponent/>
        </>
    )
}