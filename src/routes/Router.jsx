import React from 'react'
import { Switch, BrowserRouter, Route } from 'react-router-dom';

import HomePage from '../containers/pages/HomePage';
import MapPage from '../containers/pages/MapPage';

export default function Router() {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={MapPage} />
                <Route path="*" component={() => <div>Not Found 404 <a href="/">home page</a></div>} />
            </Switch>
        </BrowserRouter>
    );
}
