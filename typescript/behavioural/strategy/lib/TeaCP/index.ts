import { noop } from '../helpers/noop';
import { randomBoolean } from '../random/random';

class Connection {

}

class Socket {
    write(buffer: Buffer): number {
        noop(buffer);

        if (randomBoolean(0.1)) {
            return -1;
        }

        return 1;
    }
}

class Buffer {
    write(command: string): boolean {
        noop(command);

        if (randomBoolean(0.1)) {
            return false;
        }

        return true;
    }
}

export function getTcpConnection(): Connection {
    return new Connection();
}

export function getSocket(connection: Connection): Socket {
    noop(connection);
    return new Socket();
}

export function makeBuffer(connection: Connection): Buffer {
    noop(connection);
    return new Buffer();
}
