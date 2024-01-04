import DashboardReducer from './DashboardReducer'
import {combineReducers} from 'redux'

export default combineReducers(
    {
       dashBoardData : DashboardReducer
    }
);