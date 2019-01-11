import React from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import Button from '@material-ui/core/Button';
import "./HomePage.css";
import Card from '@material-ui/core/Card';


// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`


class HomePage extends React.Component {
  render() {
    let setting = {
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
    }
    return (
      <div>
        <div className="service-item">
          <h3>A Service</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <Button variant="contained" color="secondary">other services</Button>
        </div>
        <Slider {...setting}>
          <div>
            <Card className="home-card">1</Card>
          </div>
          <div>
            <Card className="home-card">2</Card>
          </div>
          <div>
            <Card className="home-card">3</Card>
          </div>
          <div>
            <Card className="home-card">4</Card>
          </div>
          <div>
            <Card className="home-card">5</Card>
          </div>
          <div>
            <Card className="home-card">6</Card>
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

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(HomePage);
