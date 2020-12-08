import React from 'react'
import { Form, FormGroup, Input, Label } from 'reactstrap';

interface IGInfo {
    address: string,
    uName: string,
    gameJoined:(val:boolean)=>{}
}

export const InGamePage: React.FC<any> = (props: IGInfo) => {

    const displayName = props.uName;
    let rightAnswer:string;

    const [questionText, setQuestionText] = React.useState("Waiting for the host to start the game...");
    const [answerHidden, setAnswerHidden] = React.useState(false);
    const [score, setScore] = React.useState(0);

    const changeQuestion = (newText: string) => {
        //do websocket code to get question text and answer
        rightAnswer = "correct";
        setQuestionText(newText);
        setAnswerHidden(false);
    }

    const submitAnswer = (event: any) => {
        event?.preventDefault();
        setAnswerHidden(true);
        const form = event.currentTarget.parentElement;
        const answer = form.firstChild.firstChild.value;
        setQuestionText("Waiting for other players...");
        setTimeout(function () { changeQuestion('This is a new question?'); checkAnswer(answer); }, 3000);
    }

    const checkAnswer = (val:string) => {
        if(val === rightAnswer){
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
                <Input type="submit" name="submit" id="submit" value="Submit Answer" onClick={submitAnswer} />
                <Input type="submit" onClick={gameExit} value="Quit"/>

            </Form>
        </>
    )
}