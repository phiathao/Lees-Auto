import React from 'react';

import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';

import image from '../image/motor.jpg';

class ServicesPage extends React.Component {
  componentDidMount = () => {
    this.props.dispatch({
      type: 'FETCH_SERVICES'
    });
    this.props.dispatch({
      type: 'SET_HEADER',
      payload: { value: 1 },
    })
  }
  render() {
    const { classes } = this.props;

    let allService = this.props.reduxState.services.map((service, i) => {
      if (i % 2) {
        return <div key={service.id} value={service.id} className={classes.serviceItem}>{service.service_type}</div>
      } else {
        return <div key={service.id} value={service.id} className={classes.hServiceFeature}>{service.service_type}</div>
      }
    });
    return (
      <div>
        <div>
          <div className={classes.pl} />
          {allService}
        </div>
      </div>
    )
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
});

const styles = theme => ({
  pl: {
    backgroundImage: `url(${image})`,
    height: '100%',
    minHeight: '300px',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  serviceItem: {
    textAlign: "center",
    margin: 0,
    overflow: "hidden",
    paddingBottom: 30,
    paddingTop: 30,
    minHeight: 200,
    backgroundColor: "#f2f2f2",
  },
  hServiceFeature: {
    textAlign: "center",
    margin: 0,
    color: "white",
    backgroundColor: "#6a7b83",
    overflow: "hidden",
    paddingBottom: 30,
    paddingTop: 30,
    borderBottom: "#2196f3 solid 2px",
    borderTop: "#2196f3 solid 2px",
    minHeight: 200,
  },
});

export default connect(mapStateToProps)(withStyles(styles)(ServicesPage));
