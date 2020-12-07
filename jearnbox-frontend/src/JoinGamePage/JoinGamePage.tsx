import React, { Fragment } from 'react'
import {Form, FormGroup, Input, Label} from 'reactstrap'
import './JoinGamePage.css'

export const JoinGamePage:React.FC<any> = (props:any) => {


    return (
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
                <Input type="submit" name="submit" id="submit" value="Enter Room" />
            </Form>
        </>
    )

}