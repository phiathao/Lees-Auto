import React from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class Vehicle extends React.Component {
    render() {
        return (
            <Card className="card-container">
                <CardContent>
                    Year: {this.props.vehicle.year}
                </CardContent>
                <CardContent>
                    Make: {this.props.vehicle.make}
                </CardContent>
                <CardContent>
                    Model: {this.props.vehicle.model}
                </CardContent>
                <CardContent>
                    Color: {this.props.vehicle.color}
                </CardContent>
                <CardContent>
                    Plate: {this.props.vehicle.plate}
                </CardContent>
                <CardContent>
                    Other: {this.props.vehicle.other}
                </CardContent>
                <Button variant="contained" color="secondary">view</Button>
                <Button variant="contained" color="secondary">edit</Button>
                <Button variant="contained" color="secondary">delete</Button>
            </Card>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(Vehicle);
