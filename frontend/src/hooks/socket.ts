import { useEffect, useState } from "react"

const WS_URL = "ws://localhost:8080";

export const useSocket = () => {
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(WS_URL);
        ws.onopen = () => {
            setSocket(ws);
            console.log('Webws is open now.');
        }
        ws.onerror = function(error) {
            console.error('Webws error observed:', error);
        };
        
        ws.onclose = function() {
            console.log('Webws is closed now.');
            setSocket(null);
        };


        return () => {
            ws.close();
        }
    }, []);

    return socket;  
};