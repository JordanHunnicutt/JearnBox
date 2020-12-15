export interface IJoin {
    errMess:string,
    gameJoined:boolean,
    result:string,
    uName:string
}

export interface IJoinState {
    joinVals:IJoin[] | null;
}

const initialState:IJoinState = {
    joinVals:[],
}


export const joinReducer = (state:IJoinState = initialState, action:any) => {
    if(action.type === "JOIN_GAME") {
        return {
            joinVals:[...action.payload]
        }
    } else {
        return state;
    }
}