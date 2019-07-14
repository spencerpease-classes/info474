const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');
const EventSource = require('eventsource');
const url = 'https://stream.wikimedia.org/v2/stream/recentchange';


class TestEventsource extends React.PureComponent {


    componentDidMount() {

        // opens a connection to the server
        // var eventSource = new EventSource(url, {withCredentials: true});
        var initDict = {headers: {'Cache-Control': 'no-store, no-cache'}};
        var eventSource = new EventSource(url, initDict);
        //eventSource.addEventListener('message', this.handleData.bind(this));
        //privates.set(this, eventSource);

        console.log(`Connecting to EventStreams at ${url}`);

        eventSource.onopen = function(event) {
            console.log('--- Opened connection.');
        };

        eventSource.onerror = function(event) {
            console.error('--- Encountered error', event);
        };

        eventSource.onmessage = function(event) {
            // event.data will be a JSON string containing the message event.
            console.log(JSON.parse(event.data));
        };


    };


    render() {
        return (
            <h2>TEsting?!?!</h2>
        );
    }



}

module.exports = TestEventsource;