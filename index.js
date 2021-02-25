var io = require('socket.io')(process.env.PORT || 52300);

var Jogador = require('./Jogador.js');

console.log('Servidor iniciado');

var jogadores = [];
var sockets = [];

Object.defineProperty(Number.prototype, 'formatNumber', {
    value: function() {
        //console.log('formatNumber');
        return new Intl.NumberFormat('en-US', {style: 'decimal'}).format(this);
    }
});

//npm install socket.io@^2.1.1
io.on('connection', function(socket)
{
    console.log('Um jogador se conectou!');

    var jogador = new Jogador();
    var jogadorID = jogador.id;

    jogadores[jogadorID] = jogador;
    sockets[jogadorID] = socket;

    //console.log('socket.emit(register -  id = ' + jogadorID);
    socket.emit('register', {id: jogadorID});//informa o cliente qual é o seu ID
    socket.emit('spawn', jogador);//informa para o cliente que o jogador pode ser criado
    socket.broadcast.emit('spawn', jogador);//envia as informaç~eos para todos os outros, menos o cliente 

    for(var _jogador in jogadores)
    {
        if(_jogador != jogadorID)
        {
            //console.log('socket.emit(spawn, jogadores[_jogador]);');
            socket.emit('spawn', jogadores[_jogador]);//avisar o cliente sobre os outros jogadores
        }
    }
    
    //posição
    // socket.compress('updatePosition', function(data)
    socket.on('updatePosition', function(data)
    {
         console.log(jogador.id + 'data posição: x ' + data.position.x
         + ' posição: y ' + data.position.y + ' posição: z ' + data.position.z);

        /*jogador.position.x = data.position.x;
        jogador.position.y = data.position.y;
        jogador.position.z = data.position.z;*/

        // jogador.position.x = new Number(data.posX).formatNumber();
        // jogador.position.y = new Number(data.posY).formatNumber();
        // jogador.position.z = new Number(data.posZ).formatNumber();

        // jogador.posX = new Number(data.posX).formatNumber();
        // jogador.posY = new Number(data.posY).formatNumber();
        // jogador.posZ = new Number(data.posZ).formatNumber();

        jogador.position.x = new Number(data.position.x).formatNumber();
        jogador.position.y = new Number(data.position.y).formatNumber();
        jogador.position.z = new Number(data.position.z).formatNumber();

         console.log(jogador.id + 'jogador posição: x ' + jogador.position.x
         + ' posição: y ' + jogador.position.y + ' posição: z ' + jogador.position.z);

        /*
        
        So for my game to get it all working with culture stuff I can send the float normally to the server using the
CultureInfo.CurrentCulture = CultureInfo.GetCultureInfo("en-US");

in my Start() method of NetworkClient.cs

When my server goes to send any float data with decimals even if there's a chance or not I run it through the server side culture stuff
Object.defineProperty(Number.prototype, 'formatNumber', {
    value: function() {
        return new Intl.NumberFormat('en-US', {style: 'decimal'}).format(this);
    }
});

Above can just go into a Prototypes.js file no need to wrap it in a module class or anything just above in that file
Import it one time in index.js this will give it to all files of the app
let Prototypes = require('./Classes/Utility/Prototypes') //Brings in all prototype functions for the first time

Then I would send it similar to this example
let position = location.JSONData();
position.x = new Number(position.x).formatNumber();
position.y = new Number(position.y).formatNumber();

connection.socket.emit('collisionLocation', position);

On the client side I would then do
float x = float.Parse(E.data["position"]["x"].str);
float y = float.Parse(E.data["position"]["y"].str);
      
        
        */

        socket.broadcast.emit('updatePosition', jogador);
    });

    // socket.compress('updateRotation', function(data)
    socket.on('updateRotation', function(data)
    {
        console.log(jogador.id + '  rotação');

        /*jogador.rotation.x = data.rotation.x;
        jogador.rotation.y = data.rotation.y;
        jogador.rotation.z = data.rotation.z;*/

        jogador.rotation.x = new Number(data.rotation.x).formatNumber();
        jogador.rotation.y = new Number(data.rotation.y).formatNumber();
        jogador.rotation.z = new Number(data.rotation.z).formatNumber();

        // jogador.rotX = new Number(data.posX).formatNumber();
        // jogador.rotY = new Number(data.posY).formatNumber();
        // jogador.rotZ = new Number(data.posZ).formatNumber();

        socket.broadcast.emit('updateRotation', jogador);
    });

    socket.on('disconnect', function()
    {
        console.log('Um jogador se desconectou!');
        delete jogadores[jogadorID];
        delete sockets[jogadorID];
        //console.log('socket broadcast emit( disconnected');
        socket.broadcast.emit('disconnected', jogador);
    });

});