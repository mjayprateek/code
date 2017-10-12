import React from 'react';
import TapEventPlugin from 'react-tap-event-plugin';
TapEventPlugin();
import request from 'browser-request';
import UUID from './util/UUID';
import multiscreen from '../vendor/msf.min.js';
import hardware from './util/Hardware';

import VideoLibrary from './components/VideoLibrary.jsx';
import VideoPlayer from './components/VideoPlayer.jsx';
import ConnectionManager from './components/ConnectionManager.jsx';


export default class Application extends React.Component{

    constructor(props) {

        super(props);

        var config = this.config = props.config || {};
        var colors = config.colors || ["#ef6c00", "#1a237e", "#689f38"];

        this.state = {
            services : [],
            currentService : null,
            deviceName : null,
            videos : [],
            currentView : 'library',
            currentVideo : null
        };

        this.msfApp = null;
        this.currentView = null;

        this.userColor = colors[Math.floor(Math.random() * colors.length)];
        this.appUrl = config.appUrl || console.error("No appUrl defined");
        this.appChannel = config.appChannel || console.error("No appChannel defined");
        this.search = multiscreen.search();
        this.search.on('found', function (services) {
            this.availableServices.reset(services);
        }.bind(this));


        //this.setUserColor(this.userColor);
    }

    componentDidMount() {
        console.log('App Mounted');

        var options = {
            uri : this.props.config.libraryUrl,
            json : true
        };

        request.get(options, function(er, response, body) {
            if(er)throw er;
            console.log("library loaded: ",body);
            this.setState({videos:body});
        }.bind(this));
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('App Updated');
    }

    onVideoSelect(item){
        this.setState({currentView : 'player', currentVideo:item});
    }

    onConnectionClick(){
        console.log('connection click');
    }

    showLibrary(){
        this.setState({currentView : 'library'});
    }

    render() {

        var view;

        switch (this.state.currentView){
            case 'library':
                view = <VideoLibrary videos={this.state.videos} services={this.state.services} currentService={this.state.currentService} onItemSelect={this.onVideoSelect.bind(this)} onConnectionClick={this.onConnectionClick.bind(this)} />;
                break;
            case 'player' :
                view = <VideoPlayer data={this.state.currentVideo} services={this.state.services} currentService={this.state.currentService} onBackClick={this.showLibrary.bind(this)} onConnectionClick={this.onConnectionClick.bind(this)} />;
                break;
            default :
                console.error('no view was defined');
        }

        return (
            <div className="app" id="trailmix-app">
                {view}
                <ConnectionManager services={this.state.services} currentService={this.state.currentService}/>
            </div>
        );
    }

    setUserColor(hexColor){
        var style = document.createElement("style");
        style.appendChild(document.createTextNode(""));
        document.head.appendChild(style);
        style.sheet.insertRule(".user-color { color:"+hexColor+" !important }", 0);
        style.sheet.insertRule(".user-background-color { background-color:"+hexColor+" !important }", 0);
        /* $('meta[name=theme-color]').attr('content',this.userColor);*/
    }



}

