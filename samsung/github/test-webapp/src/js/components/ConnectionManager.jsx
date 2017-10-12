import React from 'react';

export default class ConnectionManager extends React.Component{

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('ConnectionManager Mounted');
    }

    componentWillUnmount(){
        console.log('ConnectionManager Unmount')
    }

    onDeviceSelect(event){
        console.log(event);
    }

    render() {

        if (this.props.currentService){
            return (
                <div className="connection-manager">
                    <header>
                        <h3>{this.props.deviceName}</h3>
                    </header>
                    <footer>
                    <div class="btn-disconnect mui-btn mui-btn-default">Disconnect</div>
                    </footer>
                </div>
            );
        }else{
            if(this.props.services && this.props.services.length > 0){
                return (
                    <div className="connection-manager">
                        <header>
                            <h3>Connect to:</h3>
                        </header>
                        <ul className="device-list">
                            {this.props.services.map(function(service) {
                                return <li key={service.id} onClick={self.onDeviceSelect.bind(self)}>{service.name}</li>;
                            })}
                        </ul>
                    </div>
                );
            }else{
                return null;
            }

        }
    }
}

