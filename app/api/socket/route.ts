import { Server } from 'socket.io';
import cors from 'cors';

import { NextResponse } from "next/server";

// Create a new instance of the CORS middleware
const corsMiddleware = cors();

const SocketHandler = (req: any, res: any) => {
    if (res.socket.server.io) {
        console.log("Already set up");
        res.end();
        return;
    }

    const io = new Server(res.socket.server);
    // Apply the CORS middleware to the request and response
    corsMiddleware(req, res, () => {
        res.socket.server.io = io;
        res.end();
    });
}

export default SocketHandler;

export async function GET(request: Request, response: Response) {
    SocketHandler(request, response);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
}
