import React from 'react';

import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Slider from 'react-slick';
import Card from '@material-ui/core/Card';
import Services from '../Services/Services';


// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`


class HomePage extends React.Component {
  componentDidMount = () => {
    this.props.dispatch({
      type: 'SET_HEADER',
      payload: { value: 0 },
    })
  }
  render() {
    let setting = {
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      arrows: false,
    }
    const { classes } = this.props
    return (
      <div>
        <Services />
        <Slider {...setting} className={classes.slider}>
          <div className={classes.sliderDiv}>
            <Card className={classes.sliderCard}>1</Card>
          </div>
          <div className={classes.sliderDiv}>
            <Card className={classes.sliderCard}>2</Card>
          </div>
          <div className={classes.sliderDiv}>
            <Card className={classes.sliderCard}>3</Card>
          </div>
          <div className={classes.sliderDiv}>
            <Card className={classes.sliderCard}>4</Card>
          </div>
          <div className={classes.sliderDiv}>
            <Card className={classes.sliderCard}>5</Card>
          </div>
          <div className={classes.sliderDiv}>
            <Card className={classes.sliderCard}>6</Card>
          </div>
        </Slider>
      </div>
    )
  }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

const styles = theme => ({
  slider: {
    padding: 50,
    backgroundColor: "#f2f2f2",
  },
  sliderCard: {
    minHeight: 50,
  },
  sliderDiv: {
    paddingRight: 10,
    paddingLeft: 10,
  },
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(withStyles(styles)(HomePage));
