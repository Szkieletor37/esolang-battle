import '@babel/polyfill';

const ReactDOM = require('react-dom');
const React = require('react');
const Simple = require('./app.jsx');

ReactDOM.render(React.createElement(Simple), document.getElementById('app'));
