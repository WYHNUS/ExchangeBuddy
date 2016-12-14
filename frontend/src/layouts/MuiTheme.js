import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as Colors from 'material-ui/styles/colors';

export const palette = {
  primary1Color: Colors.teal700,
  primary2Color: Colors.tealA700,
  accent1Color: Colors.red700,
  pickerHeaderColor: Colors.tealA700,
};

export default getMuiTheme({
  palette,
  datePicker: {
  }
});
