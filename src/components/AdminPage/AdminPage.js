import React from 'react';

import { connect } from 'react-redux';

import ManageDrawer from './Drawer/ManageDrawer';
import PrintReceipt from './PrintReceipt/PrintReceipt';

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
    return (this.props.reduxState.infoView !== 4 ? <ManageDrawer /> : <PrintReceipt />)
  }
};

const mapStateToProps = reduxState => ({
  reduxState,
});


export default connect(mapStateToProps)(Manage);
