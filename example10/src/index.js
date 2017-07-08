import App from '../components/appContainer';
import { render } from 'react-dom';
import React from 'react';
import '../public/stylesheets/style.css'

const app = document.getElementById('app');
render(<App />, app);
