import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './_helpers';
import { App } from './App';
import Logo from './images/tastafe-logo.jpg';

var logoImg = document.getElementById('logo');
logoImg.src = Logo;

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);