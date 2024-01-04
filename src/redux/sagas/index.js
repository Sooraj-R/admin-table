import { put, call, takeEvery } from "redux-saga/effects";
import {
    setInitialData, setApiError, searchRecord
} from '../actions';
import * as types from '../actions/Types';
import { commonApiCall } from './Api-call';

const ADMIN_DASBOARD_API_URL = 'http://localhost:3030/admin_dashboard'

export function* fetchInitialData() {

    try {
        const url = `${ADMIN_DASBOARD_API_URL}`;
        const options = {
            url: url,
            method: 'GET'
        };
        const response = yield call(commonApiCall(options));
        if (response.status === 200 && response.data) {
            yield put(setInitialData(response.data));
            yield put(searchRecord(response.data));
        } else {
            yield put(setApiError());
        }
    } catch (error) {
        yield put(setApiError());
    }
}

export function* addData(payload) {
    try {
        const url = `${ADMIN_DASBOARD_API_URL}/`;
        const options = {
            url: url,
            method: 'POST',
            body: JSON.stringify(payload?.payload)
        };
        const response = yield call(commonApiCall(options));
        if (response.status === 201 && response.data) {
            yield call(fetchInitialData);
        } else {
            yield put(setApiError());
        }
    } catch (error) {
        yield put(setApiError());
    }
}

export function* deleteData(payload) {
    try {
        const url = `${ADMIN_DASBOARD_API_URL}/${payload.payload}`;
        const options = {
            url: url,
            method: 'DELETE',
            body: JSON.stringify({ id: payload.payload })
        };
        const response = yield call(commonApiCall(options));
        if (response.status === 200 && response.data) {
            yield call(fetchInitialData);
        } else {
            yield put(setApiError());
        }
    } catch (error) {
        yield put(setApiError());
    }
}

export function* editData(payload) {
    try {
        const url = `${ADMIN_DASBOARD_API_URL}/${payload.payload.id}`;
        const options = {
            url: url,
            method: 'PUT',
            body: JSON.stringify(payload?.payload)
        };
        const response = yield call(commonApiCall(options));
        if (response.status === 200 && response.data) {
            yield call(fetchInitialData);
        } else {
            yield put(setApiError());
        }
    } catch (error) {
        yield put(setApiError());
    }
}

export function* filterData(payload) {
    try {
        const { value, field, branch, type, status } = payload.payload;
        const url = `${ADMIN_DASBOARD_API_URL}?${`${field === 'branch' && value !== 'all' ? `branch=${value}` : field === 'branch' && value === 'all' ? `branch!=all` : `${branch && branch !== 'all' ? `branch=${branch}` : 'branch!=all'}`}`}&${`${field === 'type' && value !== 'all' ? `type=${value}` : field === 'type' && value === 'all' ? `type!=all` : `${type && type !== 'all' ? `type=${type}` : 'type!=all'}`}`}&${`${field === 'status' && value !== 'all' ? `status=${value}` : field === 'status' && value === 'all' ? `status!=all` : `${status && status !== 'all' ? `status=${status}` : 'status!=all'}`}`}`
        const options = {
            url: url,
            method: 'GET'
        };
        const response = yield call(commonApiCall(options));
        if (response.status === 200) {
            yield put(setInitialData(response.data ? response.data : []));
            yield put(searchRecord(response.data ? response.data : []));
        } else {
            yield put(setApiError());
        }
    } catch (error) {
        yield put(setApiError());
    }
}

export default function* root() {
    yield takeEvery(types.GET_INITIAL_DATA, fetchInitialData);
    yield takeEvery(types.ADD_RECORD, addData);
    yield takeEvery(types.DELETE_RECORD, deleteData);
    yield takeEvery(types.EDIT_RECORD, editData);
    yield takeEvery(types.FILTERED_DATA, filterData)
}