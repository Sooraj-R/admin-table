import *  as types from './Types';

const getInitialData = () => (
    {
        type: types.GET_INITIAL_DATA
    }
);
const setInitialData = (payload) => (
    {
        type: types.SET_INITIAL_DATA,
        payload
    }
);

const editRecord = (payload) => (
    {
        type: types.EDIT_RECORD,
        payload
    }
);

const setEditRecord = (payload) => (
    {
        type: types.SET_EDIT_RECORD,
        payload
    }
);

const deleteRecord = (payload) => (
    {
        type: types.DELETE_RECORD,
        payload
    }
);

const setDeleteRecord = (payload) => (
    {
        type: types.SET_DELETE_RECORD,
        payload
    }
);

const addRecord = (payload) => (
    {
        type: types.ADD_RECORD,
        payload
    }
);

const setAddRecord = (payload) => (
    {
        type: types.SET_ADD_RECORD,
        payload
    }
);

const sortByDate = (payload) => (
    {
        type: types.SORT_BY_DATE,
        payload
    }
);

const searchRecord = (payload) => (
    {
        type: types.SEARCH_RECORD,
        payload
    }
);

const filterByBranch = (payload) => (
    {
        type: types.FILTER_BY_BRANCH,
        payload
    }
);

const filterByStatus = (payload) => (
    {
        type: types.FILTER_BY_STATUS,
        payload
    }
);

const filterByType = (payload) => (
    {
        type: types.FILTER_BY_TYPE,
        payload
    }
);

const filteredData = (payload) => (
    {
        type: types.FILTERED_DATA,
        payload
    }
);

const setApiError = () => (
    {
        type: types.SET_API_ERROR
    }
);

const filteredToDate = (payload) => (
    {
        type: types.FILTER_BY_TODATE,
        payload
    }
);

const filteredFromDate = (payload) => (
    {
        type: types.FILTER_BY_FROMDATE,
        payload
    }
);
const setId = (payload) =>({
    type: types.SET_ID,
    payload
});

export {
    getInitialData,
    setInitialData,
    editRecord,
    setEditRecord,
    deleteRecord,
    setDeleteRecord,
    addRecord,
    setAddRecord,
    sortByDate,
    searchRecord,
    filterByType,
    filterByStatus,
    filterByBranch,
    setApiError,
    filteredData,
    filteredToDate,
    filteredFromDate,
    setId
}