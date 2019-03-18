import React from 'react';

import { connect } from 'react-redux';

class Contact extends React.Component {
  componentDidMount = () => {
    this.props.dispatch({
      type: 'SET_HEADER',
      payload: { value: 4 },
    })
  }
  render() {
    return (
      <div>
        <div>
          <p>
            This about page is for anyone to read!
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps)(Contact);
