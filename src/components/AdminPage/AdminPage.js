import React from 'react';

import { connect } from 'react-redux';

import ManageDrawer from './Drawer/ManageDrawer';

class Manage extends React.Component {
  componentDidMount = () => {
    this.props.dispatch({
      type: 'FETCH_DATA'
    })
    this.props.dispatch({
      type: 'SET_HEADER',
      payload: { value: 5 },
    })
  }
  render() {
    return <ManageDrawer />
  }
};

const mapStateToProps = reduxState => ({
  reduxState,
});


export default connect(mapStateToProps)(Manage);
