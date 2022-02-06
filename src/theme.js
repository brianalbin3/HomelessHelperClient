import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import teal from '@material-ui/core/colors/teal';

let theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: orange
  },
  status: {
      danger: 'red'
  }
});

theme = responsiveFontSizes(theme);

export default theme;