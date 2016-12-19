import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as Colors from 'material-ui/styles/colors';

export const palette = {
  primary1Color: '#4BB7E3',
  primary2Color: Colors.tealA700,
  accent1Color: Colors.red700,
  pickerHeaderColor: Colors.tealA700,
};

export default getMuiTheme({
  palette,
  datePicker: {
  }
});
