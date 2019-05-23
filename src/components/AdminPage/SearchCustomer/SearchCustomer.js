import React from 'react';

import TextField from '@material-ui/core/TextField';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

class SearchCustomer extends React.Component{
    state = {
        search: ''
    }
    handleChange = (event) => {
        this.setState({
            search: event.target.value
        })
        console.log(this.state)
        
        setTimeout(()=>{
            this.props.dispatch({
                type: 'FETCH_SEARCH',
                payload: this.state.search,
            });
            if(this.state.search == ''){
                this.props.dispatch({
                    type: 'FETCH_DATA',
                });
            }
        }, 100)
        
    }

render(){
    return (
        <TextField
            fullWidth
            id="filled-search"
            label="Search"
            type="search"
            margin="normal"
            variant="filled"
            onChange={this.handleChange}
        />
    )
}
}


const styles = theme => ({
    searchField: {
        width: '100%',
    },
})

const mapStateToProps = reduxState => ({
    reduxState,
});

export default withRouter(connect(mapStateToProps)(withStyles(styles)(SearchCustomer)));