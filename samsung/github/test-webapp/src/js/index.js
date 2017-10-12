import poly from "babelify/polyfill";
import React from 'react';
import App from './App.jsx';

var config = {
    appUrl : 'http://s3-us-west-1.amazonaws.com/dev-multiscreen-examples/examples/trailmix/tv/index.html',
    appChannel : "com.samsung.trailmix",
    libraryUrl : 'temp/library.json',
    colors : [
        "#ef6c00","#1a237e","#689f38","#e91e63","#2196f3",
        "#b71c1c","#01579b","#009688","#673ab7","#607d8b",
        "#880e4f","#3f51b5","#827717","#9c27b0","#3e2723",
        "#e65100","#006064","#1b5e20","#4a148c","#795548"
    ]
};

document.addEventListener("DOMContentLoaded", function(event) {
    React.render(<App config={config} />, document.body);
});