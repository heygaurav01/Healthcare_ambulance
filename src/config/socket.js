const { Server } = require("socket.io");

let io;

function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*", // TODO: change to frontend domain in production
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("⚡ New client connected:", socket.id);

    // User requests ambulance
    socket.on("request_ambulance", (data) => {
      console.log("🚑 User Request:", data);
      io.to("admins").emit("new_request", data);
    });

    // Admin confirms ambulance
    socket.on("confirm_ambulance", (data) => {
      console.log("✅ Admin confirmed:", data);
      io.to(data.userId).emit("ambulance_confirmed", data);
    });

    // Ambulance sends location updates
    socket.on("location_update", (data) => {
      console.log("📍 Location update:", data);
      io.to(data.userId).emit("location_update", data);
    });

    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
  });
}

function getIO() {
  if (!io) throw new Error("Socket.io not initialized!");
  return io;
}

module.exports = { initSocket, getIO };
