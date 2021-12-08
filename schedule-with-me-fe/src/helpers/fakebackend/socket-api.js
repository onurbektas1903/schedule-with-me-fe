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
                    // console.log(JSON.parse(notification.body));
                    EventBus.$emit('eventCreated', JSON.parse(notification.body))

                });
            },
            error => {
                console.log(error);
                this.connected = false;
            }
        );
    }

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
