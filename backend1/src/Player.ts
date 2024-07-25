export class Player {
  username: string;
  private socket: WebSocket;
  constructor(name: string, socket: WebSocket) {
    this.username = name;
    this.socket = socket;
  }
}
