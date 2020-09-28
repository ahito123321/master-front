import React, { Component } from 'react';

import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { theme } from '../configs/index';

import Router from '../routes/Router';
import { axios } from '../configs/index';

import { SnackbarProvider } from 'notistack';

import { createStore } from 'redux';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';

import reducers from '../reducers/index';

const store = createStore(combineReducers(reducers));

export default class App extends Component {

    constructor(props) {
        super(props);
        axios.init();
    }

    render() {
        return (
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <SnackbarProvider maxSnack={3}>
                        <Router />
                    </SnackbarProvider>
                </ThemeProvider>
            </Provider>
        )
    }
}

