import React from 'react';

import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments
} from "@devexpress/dx-react-scheduler-material-ui";

import { blue } from "@material-ui/core/colors";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";


// dummy data to test
const testAppointments = [
  {
    title: "Website Re-Design Plan",
    startDate: new Date(2019, 5, 25, 9, 30),
    endDate: new Date(2019, 5, 25, 11, 30),
    id: 0,
    location: "Room 1"
  },
  {
    title: "Book Flights to San Fran for Sales Trip",
    startDate: new Date(2019, 5, 25, 12, 0),
    endDate: new Date(2019, 5, 25, 13, 0),
    id: 1,
    location: "Room 1"
  },
]

const theme = createMuiTheme({ palette: { type: "light", primary: blue } });

class InfoPage extends React.Component {
  state = {
    data: testAppointments,
  };
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     data: testAppointments
  //   };
  // }
  render() {
    const { data } = this.state;
    return (
      <MuiThemeProvider theme={theme}>

      <Paper>
          <Scheduler data={data}>
            <ViewState currentDate="2019-05-24" />
            <WeekView startDayHour={9} endDayHour={19} />
            <Appointments />
          </Scheduler>
        </Paper>

    </MuiThemeProvider>

    );
  }
}

export default InfoPage;
