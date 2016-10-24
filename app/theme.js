import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { cyan500, cyan700, grey100, grey300, grey400, grey500, pinkA200, white, darkBlack, fullBlack } from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';

export const customTheme = getMuiTheme({
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: "#3ED1D9",
        primary2Color: "#3ED1D9",
        primary3Color: grey400,
        accent1Color: pinkA200,
        accent2Color: grey100,
        accent3Color: grey500,
        textColor: "#383838",
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        disabledColor: fade(darkBlack, 0.3),
        pickerHeaderColor: "#3ED1D9",
        clockCircleColor: fade(darkBlack, 0.07),
        shadowColor: fullBlack
    }
});