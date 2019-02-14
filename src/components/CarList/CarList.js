import React from 'react';
import { connect } from 'react-redux';


// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class AboutPage extends React.Component{
  componentDidMount = () => {
    this.props.dispatch({
      type: 'SET_HEADER',
      payload: {value: 2},
  })
  }
  render(){
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

export default connect(mapStateToProps)(AboutPage);
