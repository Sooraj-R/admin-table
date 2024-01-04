import { SET_INITIAL_DATA, FILTER_BY_BRANCH, FILTER_BY_STATUS, FILTER_BY_TYPE, FILTER_BY_FROMDATE, FILTER_BY_TODATE, SEARCH_RECORD, SET_ID } from '../actions/Types';

const initialState = {
    id: 0,
    date: '',
    branch: '',
    type: '',
    amount: '',
    bank: '',
    requested_by: '',
    status: '',
    dashboard_data: [],
    fromDate: '',
    toDate: '',
    searchData: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIAL_DATA:
            return { ...state, dashboard_data: action.payload }
        case SEARCH_RECORD:
            return { ...state, searchData: action.payload }
        case FILTER_BY_BRANCH:
            return { ...state, branch: action.payload }
        case FILTER_BY_STATUS:
            return { ...state, status: action.payload }
        case FILTER_BY_TYPE:
            return { ...state, type: action.payload }
        case FILTER_BY_FROMDATE:
            return { ...state, fromDate: action.payload }
        case FILTER_BY_TODATE:
            return { ...state, toDate: action.payload }
        case SET_ID:
            return { ...state, id: action.payload }
        default: {
            return state;
        }
    }
}