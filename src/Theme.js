import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

const Theme = createMuiTheme({
  palette: {
    primary: {
      main: '#455a64',
    },
    secondary: {
      main: '#2196f3',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    error: red,
  },
  textPrimary: {
    color: 'white',
  },
});

export default Theme;
