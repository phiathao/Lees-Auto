import React from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import "./HomePage.css";
import Card from '@material-ui/core/Card';
import Services from '../Services/Services';


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
        <Services />
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
