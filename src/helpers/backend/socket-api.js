import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import EventBus from '../../eventbus'

export default class SocketApi {
    constructor(url) {
        this.url = url;
        this.stompClient = null;
        this.connected = false;
        this.stompClient = null;
    }

    connect() {
        this.socket = new SockJS(this.url);
        this.stompClient = Stomp.over(this.socket);
        this.stompClient.connect(
            {},
            frame => {
                this.connected = true;
                console.log(frame);
                this.stompClient.subscribe("/topic/notifications", notification => {
                    EventBus.$emit('eventCreated', JSON.parse(notification.body))

                });
            },
            this.stompFailureCallback
        );
    }
     stompFailureCallback =  (error) => {
         this.connected = false;
         console.log('STOMP: ' + error);
        setTimeout(this.connect(), 100000);
        console.log('STOMP: Reconecting in 10 seconds');
    };

    disconnect() {
        if (this.stompClient) {
            this.stompClient.disconnect();
        }
        this.connected = false;
    }

    tickleConnection() {
        this.connected ? this.disconnect() : this.connect();
    }
}
