import { combineReducers } from "redux";
import entitiesReducer from "./entities";

const reducers = combineReducers({ entities: entitiesReducer });

export default reducers;

export type State = ReturnType<typeof reducers>;
