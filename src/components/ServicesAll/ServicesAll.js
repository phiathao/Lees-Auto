import React from 'react';
import { withStyles } from '@material-ui/core';
import Styles from '../Styles/Styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class ServicesPage extends React.Component {
  componentDidMount = () => {
    this.props.dispatch({ type: 'FETCH_SERVICES' });
  }
  render(){
  let allService = this.props.reduxState.services.map((service, i) => {
    if (i % 2 ) {
    return <div key={service.id} value={service.id}>{service.service_type} even</div>
    } else {
      return <div key={service.id} value={service.id}>{service.service_type} odd</div>
    }
  })
    return (
  <div>
    <div>
      <p>
        {allService}
      </p>
    </div>
  </div>
    )
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(withStyles(Styles)(ServicesPage));
