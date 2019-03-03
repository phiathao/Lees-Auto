import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import Styles from '../../Styles/Styles';
import Grid from '@material-ui/core/Grid';
import Service from './Service';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import AddIcon from '@material-ui/icons/AddCircleOutline';
import RemoveIcon from '@material-ui/icons/RemoveCircleOutline';
import Tooltip from '@material-ui/core/Tooltip';

class AddReceipt extends React.Component {
  state = ({
    numberService: -5 || 1,
  })
  componentDidMount = () => {
    this.props.dispatch({ type: 'FETCH_SERVICES' });
  }
  handleSubmit = () => {
    
  }
  handleChange = (propertyName) => (event) => {
    
  }
  handleAddService = () => {
    this.setState({
      numberService: this.state.numberService + 1
    })
  }
  handleSubtractService = () => {
    this.setState({
      numberService: this.state.numberService - 1
    })
  }
  handleCloseDialog = () => {
    this.setState({
      numberService: 1
    })
    this.props.handleClose();
  }
  render() {

    let inputService = [];
    if (this.state.numberService < 1) {
      this.setState({
        numberService: 1
      })
    }
    for (let i = 0; i < this.state.numberService; i++) {
      inputService.push(<Service key={i} add={this.handleAddService} />)
    }

    const { classes } = this.props
    return (
      <Dialog
        maxWidth='lg'
        open={this.props.open}
        onClose={this.handleCloseDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle align="center">New Vehicle
        </DialogTitle>
        <DialogContent
          className={classes.dialogComponent}
        >
          <Grid container spacing={8}>
            {inputService}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                type="text"
                margin="normal"
                variant="filled"
                onChange={this.handleChange('year')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Amount Due"
                type="text"
                margin="normal"
                variant="filled"
                onChange={this.handleChange('color')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Payment Method"
                type="text"
                margin="normal"
                variant="filled"
                onChange={this.handleChange('other')}
              />
            </Grid>
            <Grid item xs={3} sm={3}>
              <Tooltip title="Add Service" placement="right">
                <AddIcon
                  fontSize="large"
                  onClick={this.handleAddService}
                  color="secondary"
                />
              </Tooltip>
            </Grid>
            <Grid item xs={3} sm={3}>
              <Tooltip title="Remove Service" placement="right">
                <RemoveIcon
                  fontSize="large"
                  onClick={this.handleSubtractService}
                  color="secondary"
                />
              </Tooltip>
            </Grid>
            <Grid item xs={3} sm={3} style={{ direction: 'rtl', }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.handleCloseDialog}
                fullWidth
              >Cancel</Button>
            </Grid>
            <Grid item xs={3} sm={3} style={{ direction: 'rtl', }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.handleSubmit}
                fullWidth
              >Submit</Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    )
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(withStyles(Styles)(AddReceipt));
