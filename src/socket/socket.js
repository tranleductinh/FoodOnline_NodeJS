import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:5173",
        "https://food-online-tinh-react-js.vercel.app",
      ],
      methods: ["GET", "POST", "DELETE"],
    },
  });
  io.on("connection", (socket) => {
    console.log(`✅ Client kết nối: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`❌ Client ngắt kết nối: ${socket.id}`);
    });
  });
};

export const getIO = () => {
    if (!io) {
        throw new Error('Socket.io chưa được khởi tạo!');
    }
    return io;
};
