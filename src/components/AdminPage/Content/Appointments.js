import React from 'react';

import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  MonthView,
  Toolbar,
  DateNavigator,
  Appointments,
  WeekView,
} from "@devexpress/dx-react-scheduler-material-ui";

import { blue } from "@material-ui/core/colors";
import data from "../AppointmentData/data";


class AppointmentPage extends React.Component {
  // state = {
  //   data: testAppointments,
  // };
  constructor(props) {
    super(props);

    this.state = {
      data: data
    };
  }
  render() {
    const { data } = this.state;
    const { classes } = this.props;
    return (
      <div>
      <Paper>
          <Scheduler data={data}>
            <ViewState currentDate="2019-05-21" />
            <MonthView />
            {/* <WeekView /> */}
            <Toolbar />
            <DateNavigator />
            <Appointments appointmentComponent={Appointment} />
          </Scheduler>
        </Paper>
        </div>
    );
  }
}

const Appointment = ({
  children, style, ...restProps
}) => (
  <Appointments.Appointment
    {...restProps}
    style={{
      ...style,
      backgroundColor: '#FFC107',
      borderRadius: '8px',
    }}
  >
    {children}
  </Appointments.Appointment>
);

export default AppointmentPage;
