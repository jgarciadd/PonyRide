var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var mysql = require('mysql');

app.use(express.static('PonyRide'));


io.on('mensaje',function(socket){
    console.log("Cliente conectado");
    socket.emit('mensaje',"Bienvenido");
});

app.get("/",function(req,res){
   res.status(200).send("Hola");
});

io.on('connection', function(socket) {
    console.log('Alguien se ha conectado con Sockets');

    socket.on('solicitud', function(data) {
        console.log("S: "+data.from+" => "+data.to);
        //Insertar notificacion en BD, ajax pero sin jQuery
        var con = mysql.createConnection({
            host:"localhost",
            user:"pony",
            password:"ponyride",
            database:"ponyRide"
        });
        con.connect(function(err){
            if(err)
                console.log("ERROR AL CONECTAR A BD");
            else{
                var query = "INSERT INTO notificaciones VALUES(null,'"+data.to+
                "','"+data.from+"','"+data.idViaje+"',curtime(),'"+data.tipo+"',0)"
                con.query(query,function(err,res){
                    if(err)
                        console.log("Error en la consulta");
                    else{
                        var query2 = "SELECT idNotificacion FROM notificaciones WHERE idViaje ='"+data.idViaje+"' AND tipo='s' ORDER BY idNotificacion DESC LIMIT 1";
                        con.query(query2,function(err,res){
                            var id = res[0].idNotificacion
                            var query3 = "INSERT INTO encuentro VALUES("+id+",0,"+data.lat+","+data.lng+")";
                            con.query(query3);
                        });
                    }
                });
            }
        });
        io.sockets.emit("solicitud",data);
  });
    socket.on('respuesta',function(data){
        console.log("C: "+data.from+" => "+data.to);
        io.sockets.emit("respuesta",data);
    })
});

server.listen(3000,function(){
    console.log("Escuchando en puerto 3000")
});
