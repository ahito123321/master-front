import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
    palette: {
        common: {
            black: "#000",
            white: "#fff"
        },
        type: "light",
        primary: {
            light: "#7986cb",
            main: "#3f51b5",
            dark: "#303f9f",
            contrastText: "#fff",
        },
        secondary: {
            light: "#7986cb",
            main: "#3f51b5",
            dark: "#303f9f",
            contrastText: "#fff",
        },
        text: {
            primary: "rgba(31, 37, 61, 0.87)",
            secondary: "rgba(31, 37, 61, 0.54)",
            disabled: "rgba(31, 37, 61, 0.38)",
            hint: "rgba(31, 37, 61, 0.38)"
        },
        background: {
            paper: "#fff",
            default: "#fafafa"
        },
    },
    status: {
        danger: 'orange',
    },
});