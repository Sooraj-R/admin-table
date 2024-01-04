import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { connect } from 'react-redux'
import { compose } from 'recompose';
import { deleteRecord as deleteDataAction } from '../redux/actions'
import { isEmpty, capitalize } from 'lodash';
import InputForm from './InputForm'

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort(array, comparator) {
  const stabilizedThis = !isEmpty(array) && array.map((el, index) => [el, index]);
  stabilizedThis && stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis && stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const { order, orderBy, rowCount, onRequestSort, headCells } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={headCell.id === 'date' && orderBy === headCell.id ? true : false}
              direction={headCell.id === 'date' && orderBy === headCell.id ? order : 'asc'}
              onClick={headCell.id === 'date' ? createSortHandler(headCell.id) : null}
              hideSortIcon={headCell.id === 'date' ? false : true}
              style={{ whiteSpace: 'break-spaces' }}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  headCells: PropTypes.array.isRequired
};

const DataTable = (props) => {
  const headCells = [
    {
      width: 50,
      label: 'ID',
      id: 'id',
    },
    {
      width: 120,
      label: 'DATE',
      id: 'date',
      numeric: false,
    },
    {
      width: 120,
      label: 'BRANCH',
      id: 'branch',
      numeric: false,
    },
    {
      width: 120,
      label: 'TYPE',
      id: 'type',
      numeric: false,
    },
    {
      width: 80,
      label: 'AMOUNT\n(IN RUPEES)',
      id: 'amount',
      numeric: true,
    },
    {
      width: 160,
      label: 'BANK',
      id: 'bank',
      numeric: false,
    },
    {
      width: 120,
      label: 'REQUESTED BY\n(EMPLOYEE CODE)',
      id: 'requested_by',
      numeric: false,
    },
    {
      width: 120,
      label: 'STATUS',
      id: 'status',
      numeric: false,
    },
    {
      width: 60,
      label: '',
      id: 'delete',
      numeric: false,
    },
  ];

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { deleteData, dashBoardRecord } = props;
  const [rows, setRecords] = useState(dashBoardRecord.dashBoardData.dashboard_data);
  const [editRowData, setEditRowData] = useState()
  const [onDelete, setOnDelete] = useState(false)
  useEffect(() => {
    if (!isEmpty(dashBoardRecord.dashBoardData.dashboard_data)) {
      setRecords(dashBoardRecord.dashBoardData.dashboard_data)
    } else {
      setRecords([])
    }
  }, [dashBoardRecord])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (event, editId) => {
    if (!onDelete) {
      const data = rows.find((d) => d.id === editId)
      setEditRowData(data)
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      !isEmpty(rows) && stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, rows],
  );

  const deleteRecord = (e, id) => {
    e.preventDefault()
    setOnDelete(true)
    deleteData(id)
  }

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2, p: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows && rows.length}
                headCells={headCells}
              />
              <TableBody>
                {!isEmpty(rows) && visibleRows.map((row, index) => {

                  const labelId = `enhanced-table-checkbox-${index}`;
                  let key = Object.keys(row)
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.id}
                      sx={{ cursor: 'pointer' }}
                    >
                      {key.map((k, index) => {
                        return (
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            onClick={(event) => handleClick(event, row.id)}
                            align={k === 'amount' ? "right" : "left"}
                          >
                            {capitalize(row[k])}
                          </TableCell>)

                      })}
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                      >
                        <IconButton variant="outlined" color="inherit" style={{ height: '36px' }}
                        >
                          <CancelOutlinedIcon onClick={(e) => deleteRecord(e, row.id)} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                }
                )}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25]}
            component="div"
            count={rows && rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
      <InputForm handleClose={handleClose} open={open} editData={editRowData} />
    </>
  );
}
const mapStateToProps = (
  dashBoardData
) => ({ dashBoardData: dashBoardData })

export default compose(
  connect(mapStateToProps,
    {
      deleteData: deleteDataAction
    }))
  ((props) => <DataTable {...props} />)

