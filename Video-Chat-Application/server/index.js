const { Server } = require("socket.io");

const io = new Server(process.env.PORT || 8000, {
  cors: true,
});

const emailToSocketIdMap = new Map();
const SocketIdToEmailMap = new Map();

io.on("connection", (socket) => {

  console.log("Socket Connected - ", socket.id);

  socket.on("room:join", (data) => {

    const { email, room } = data;

    emailToSocketIdMap.set(email, socket.id);

    SocketIdToEmailMap.set(socket.id, email);

    io.to(room).emit("user:joined", { email, id: socket.id });

    socket.join(room);

    io.to(socket.id).emit("room:join", data);


  });

    socket.on("user:call",({to, offer})=>{
        io.to(to).emit('incomming:call',{from:socket.id, offer})
    })

    socket.on("call:accepted",({to, answer})=>{
        io.to(to).emit('call:accpeted',{from:socket.id, answer})
    });

    socket.on('peer:negotiation:needed',({offer,to}) => {
        io.to(to).emit("peer:negotiation:needed",{ from : socket.id, offer})
    });

    socket.on("peer:negotiation:done",({ to ,ans })=>{
        io.to(to).emit("peer:negotiation:final", { from: socket.id, ans });

    })
});
