import { join } from "path";
import {CombinedState, combineReducers, Reducer} from "redux";
import {joinReducer, IJoinState} from "./JoinGameReducer"

export interface IRootState {
    joinState: IJoinState
}

/**
 * Combined reducer, stored in redux store
 */
export const rootReducer: Reducer<CombinedState<IRootState>> = combineReducers<IRootState>(
    {
        joinState: joinReducer
    }
)