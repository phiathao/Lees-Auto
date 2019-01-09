import React from 'react';
import './ManagePage.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class Manage extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'FETCH_DATA'
    })
  }
  handleView = (personId) => { // view base on the customer
    console.log(personId);
  }
  handleDelete = (vehicleId, personId) => {
    if (vehicleId === null) { // if customer don't have a vehicle under them // remove customer
      this.props.dispatch({
        type: 'DELETE_CUSTOMER',
        payload: personId
      })
    } else { // if customer have vehicle vehicle under them // only remove vehicle
      this.props.dispatch({
        type: 'DELETE_VEHICLE',
        payload: vehicleId
      })
    }
  }
  render() {
    // map data receive and put into table
    let dataList = this.props.reduxState.dataManage.map((item, i) => {
      return (
        <TableRow key={i}>
          <TableCell>{item.make} {item.model}</TableCell>
          <TableCell>{item.first_name}</TableCell>
          <TableCell>{item.last_name}</TableCell>
          <TableCell><Button variant='contained' color='primary' onClick={()=>this.handleView(item.id)}>View</Button></TableCell>
          <TableCell><Button variant='contained' color='primary' onClick={()=>this.handleDelete(item.vehicle_id, item.id)}>Remove</Button></TableCell>
        </TableRow>
      )
    }) // end of map
    return (
      <div>
        <div className='component-header'>
          <h3>Manage Customers and Vehicles</h3>
          <Button className='add-btn' variant='contained' color='secondary' component={Link} to='/manage/add'>Add Customer</Button>
          <TextField
            id="filled-search"
            label="Search field"
            type="search"
            className='search-field'
            margin="normal"
            variant="filled"
          />
        </div>
        {/* table */}
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Vehicle</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Customer Information</TableCell>
                <TableCell>Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataList}
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
};

const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(Manage);
