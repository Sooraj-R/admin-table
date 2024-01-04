import React, { useState, useEffect } from "react";
import InputForm from '../components/InputForm';
import ActionPanel from '../components/ActionPanel';
import DataTable from '../components/DataTable';
import { connect } from 'react-redux'
import { compose } from 'recompose';
import {getInitialData as initialState} from '../redux/actions'

const AdminContainer = (props) => {
    const {getInitialData, dashBoardData} = props;
   React.useEffect(()=>{
    getInitialData()
   },[])

    return (<div style={{padding: '1.5rem'}}>
    <InputForm></InputForm>
        <ActionPanel></ActionPanel>
        <DataTable dashBoardRecord={dashBoardData}></DataTable>
    </div>)
}
const mapStateToProps = (
    dashBoardData
  ) => ({ dashBoardData})
  
  export default compose(
    connect(mapStateToProps,
      {
        getInitialData: initialState
      }))
    ((props) => <AdminContainer {...props} />)

