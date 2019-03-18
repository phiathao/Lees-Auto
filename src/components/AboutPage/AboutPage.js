import React from 'react';

import { connect } from 'react-redux';

class AboutPage extends React.Component {
  componentDidMount = () => {
    this.props.dispatch({
      type: 'SET_HEADER',
      payload: { value: 3 },
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

export default connect()(AboutPage);
