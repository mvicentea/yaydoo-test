import { createTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: '#00897b',
          },
          secondary: {
            main: '#f44336',
          },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
        },
    },
});

export default theme;