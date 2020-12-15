import {IJoin} from "../_reducers/JoinGameReducer"

export const setJoinVals = (jVals:IJoin[]) => {
    return {
        type: "JOIN_GAME",
        payload: jVals
    }
}