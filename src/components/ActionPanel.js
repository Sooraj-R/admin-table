import React, { useState, useEffect } from "react";
import FilterDropDown from '../components/filters'
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import InputForm from "./InputForm";
import { connect } from 'react-redux'
import { compose } from 'recompose';
import { filterByBranch as filterByBranchAction, filterByType as filterByTypeAction, filterByStatus as filterByStatusAction, filteredData as filterDataAction, setId as setIdAction, filteredToDate as filteredToDateAction, filteredFromDate as filteredFromDateAction } from '../redux/actions'

const branchProps = {
    defaultValue: 'all',
    inputProps: {
        name: 'branch',
        id: 'branch-native',
    },
    label: 'Branch',
    data: [
        'thane', 'navi mumbai', 'mumbai', 'kurla', 'vile parle', 'lower parel'
    ],
    minWidth: '70'
}
const typeProps = {
    defaultValue: 'all',
    inputProps: {
        name: 'type',
        id: 'type-native',
    },
    label: 'Type',
    data: [
        'full', 'short'
    ],
    minWidth: '70'
}
const statusProps = {
    defaultValue: 'all',
    inputProps: {
        name: 'status',
        id: 'status-native',
    },
    label: 'Status',
    data: [
        'pending', 'approved', 'rejected'
    ],
    minWidth: '70'
}

const ActionPanel = (props) => {
    const { filterByBranch, filterByType, filterByStatus, dashBoardData, filteredData, setId, filteredToDate, filteredFromDate } = props
    const [row, setRow] = useState(dashBoardData.dashBoardData)
    useEffect(() => {
        setRow(dashBoardData.dashBoardData)
    }, [dashBoardData])
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleFilter = (value, field) => {
        const to = field === 'toDate' ? value : row.toDate;
        const from = field === 'fromDate' ? value : row.fromDate;
        if(field === 'id'){
            value ? setId(value) : setId('')
        }
        if (field === 'branch') {
            filterByBranch(value)
        } else if (field === 'type') {
            filterByType(value)
        } else if (field === 'status') {
            filterByStatus(value)
        }else if(field === 'toDate'){
            filteredToDate(value);
        }else if(field === 'fromDate'){
            filteredFromDate(value);
        }
        const payload = {
            field: field,
            value: value,
            branch: row.branch,
            type: row.type,
            status: row.status,
            toDate: to,
            fromDate: from,
            id:row.id
        }
        filteredData(payload)
    }

    
    return (<>
        <div style={{ display: 'flex', marginBottom: '2rem', justifyContent: 'flex-end' }}>
            <Button variant="outlined" endIcon={<AddIcon />} color="inherit" style={{ height: '36px' }} onClick={handleClickOpen}>
                Create
            </Button>
        </div>
        <h style={{fontSize:'16px', fontWeight: 'bold', color:'#595757'}}>Total: {row.dashboard_data.length}</h>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', width: '80%' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker format="MM/DD/YYYY" label="From" onChange={(newValue) => handleFilter(dayjs(newValue).format("MM/DD/YYYY"), 'fromDate')} />
                <DatePicker format="MM/DD/YYYY" label="To" onChange={(newValue) => handleFilter(dayjs(newValue).format("MM/DD/YYYY"), 'toDate')} />
            </LocalizationProvider>
            <FilterDropDown {...branchProps} setValue={handleFilter} />
            <FilterDropDown {...typeProps} setValue={handleFilter} />
            <FilterDropDown {...statusProps} setValue={handleFilter} />
            <TextField id="searchID" label="Search ID" variant="outlined" sx={{ ml: 1 }} onChange={(e) => handleFilter(e.target.value,'id')} />
        </div>
        <InputForm handleClose={handleClose} open={open} />
    </>)
}

const mapStateToProps = (
    dashBoardData
) => ({ dashBoardData: dashBoardData })

export default compose(
    connect(mapStateToProps,
        {
            filterByBranch: filterByBranchAction,
            filterByType: filterByTypeAction,
            filterByStatus: filterByStatusAction,
            filteredData: filterDataAction,
            setId: setIdAction,
            filteredToDate: filteredToDateAction,
            filteredFromDate: filteredFromDateAction
        }))
    ((props) => <ActionPanel {...props} />)