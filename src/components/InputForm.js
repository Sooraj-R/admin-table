import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FilterDropDown from '../components/filters';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { get, isEmpty } from 'lodash'
import { connect } from 'react-redux'
import { compose } from 'recompose';
import { addRecord as addRecordAction, editRecord as editRecordAction } from '../redux/actions'

const InputForm = (props) => {
  const { handleClose, open, editData, addRecord, editRecord } = props

  const id = get(editData, 'id', '');
  const amount = get(editData, 'amount', '');
  const request_by = get(editData, 'request_by', '');
  const branch = get(editData, 'branch', '');
  const type = get(editData, 'type', '');
  const bank = get(editData, 'bank', '');
  const date = get(editData, 'date', '');
  const status = get(editData, 'status', '');

  const [amountData, setAmount] = useState('');
  const [requestByData, setRequestBy] = useState('');
  const [bankData, setBank] = useState('');
  const [typeData, setType] = useState('');
  const [branchData, setBranch] = useState('');
  const [dateData, setDate] = useState(dayjs(new Date()).format("MM/DD/YYYY"));
  const [statusData, setStatus] = useState('');
  const [amountError, setAmountError] = useState(false);
  const [bankError, setBankError] = useState(false);
  const [statusError, setStatusError] = useState(false);
  const [branchError, setBranchError] = useState(false);
  const [typeError, setTypeError] = useState(false);
  const [requestError, setRequestByError] = useState(false);

  useEffect(() => {
    if (!isEmpty(editData)) {
      setAmount(amount);
      setRequestBy(request_by);
      setBank(bank);
      setType(type);
      setBranch(branch);
      setDate(date)
      setStatus(status)
    }
  }, [editData])

  const setStatusValue = (value) => {
    setStatus(value)
    value ? setStatusError(false) : setStatusError(true)
  }
  const setTypeValue = (value) => {
    setType(value)
    value ? setTypeError(false) : setTypeError(true)
  }
  const setBranchValue = (value) => {
    setBranch(value)
    value ? setBranchError(false) : setBranchError(true)
  }
  const setRequestByValue = (value) => {
    setRequestBy(value)
    value ? setRequestByError(false) : setRequestByError(true)
  }
  const enterAmount = (value) => {
    setAmount(value)
    value ? setAmountError(false) : setAmountError(true)
  }
  const enterBank = (value) => {
    setBank(value)
    value ? setBankError(false) : setBankError(true)
  }

  const handleSubmit = (e) => {
    amountData ? setAmountError(amountError) : setAmountError(true)
    statusData ? setStatusError(statusError) : setStatusError(true)
    bankData ? setBankError(bankError) : setBankError(true)
    branchData ? setBranchError(branchError) : setBranchError(true)
    typeData ? setTypeError(typeError) : setTypeError(true)
    requestByData ? setRequestByError(requestError) : setRequestByError(true)

    if (amountData && statusData && bankData && branchData && typeData && requestByData) {
      e.preventDefault();
      const payload = {
        id: id ? id : Math.floor((Math.random() * 100) + 11111),
        date: dateData,
        branch: branchData,
        type: typeData,
        amount: amountData,
        bank: bankData,
        request_by: requestByData,
        status: statusData
      }
      !isEmpty(editData) ? editRecord(payload) : addRecord(payload);
      handleClose();
    }
  }
  const branchProps = {
    inputProps: {
      name: 'branch',
      id: 'branch-native',
    },
    label: 'Branch',
    data: [
      'thane', 'navi mumbai', 'mumbai', 'kurla', 'vile parle', 'lower parel'
    ],
    defaultValue: branch ? branch : ''
  }
  const typeProps = {
    inputProps: {
      name: 'type',
      id: 'type-native',
    },
    label: 'Type',
    data: [
      'full', 'short'
    ],
    defaultValue: type ? type : ''
  }
  const statusProps = {
    inputProps: {
      name: 'type',
      id: 'status-native',
    },
    label: 'Status',
    data: [
      'pending', 'approved', 'rejected'
    ],
    defaultValue: status ? status : ''
  }
  return (
    <>
      <Dialog open={open} onClose={handleClose} style={{ minWidth: '100%' }}>
        <DialogTitle>{isEmpty(editData) ? 'Add record' : 'Edit record'}</DialogTitle>
        <DialogContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', maxWidth: '200px' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
              <DatePicker format="MM/DD/YYYY" label="Date" value={dayjs(dateData)}
                onChange={(newValue) => setDate(dayjs(newValue).format("MM/DD/YYYY"))} />
            </LocalizationProvider>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <FilterDropDown {...branchProps} setValue={setBranchValue} error={branchError} helpText="Please enter branch" required={true} />
            <FilterDropDown {...statusProps} setValue={setStatusValue} error={statusError} helpText="Please enter amount" required={true} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <FilterDropDown {...typeProps} setValue={setTypeValue} error={typeError} helpText="Please enter type" required={true} />
            <TextField
              error={amountError}
              helperText={amountError ? "Please enter amount" : ""}
              id="amount"
              label="Amount"
              type="number"
              fullWidth
              variant="standard"
              style={{ marginTop: 0, maxWidth: '200px' }}
              onChange={(e) => enterAmount(e.target.value)}
              defaultValue={amount}
              required
            />
          </div>
          <TextField
            error={bankError}
            helperText={bankError ? "Please enter bank" : ""}
            id="bank"
            label="Bank"
            type="text"
            fullWidth
            variant="standard"
            style={{ marginTop: 0 }}
            onChange={(e) => enterBank(e.target.value)}
            defaultValue={bank}
            required
          />
          <TextField
            error={requestError}
            helperText={requestError ? "Please enter request by" : ""}
            id="requestedBy"
            label="Requested By"
            type="text"
            fullWidth
            variant="standard"
            style={{ marginTop: 0 }}
            onChange={(e) => setRequestByValue(e.target.value)}
            defaultValue={request_by}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={(e) => handleSubmit(e)}>{isEmpty(editData) ? 'Submit' : 'Edit'}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
const mapStateToProps = (

) => ({})

export default compose(
  connect(mapStateToProps,
    {
      addRecord: addRecordAction,
      editRecord: editRecordAction
    }))
  ((props) => <InputForm {...props} />)
