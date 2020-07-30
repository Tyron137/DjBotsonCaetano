const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const client = new Discord.Client();
var servers = {};
// prefixo de ativação de comandos do bot
const prefix = '!';


// para alterar o valor da versão, edite a variável abaixo
var version = '1.0.1';


// token de login do bot, alterar apenas se vazar
client.login('NzEzMjExNjYxNjExNDM0MDA1.Xsc_BA.K2YlYLF4opQLOraNkwriuXWP9Y0');


// output no console sobre o status do bot
client.on('ready', () => {nod
  console.log(`Logged in as ${client.user.tag}!`);
});


// comandos que triggam com certas palavras sendo ditas no chat
client.on('message', message =>{
    if(message.content === "zika"){
      message.channel.send('do baile') 
    }
    if(message.content === "o nome dela é"){
      message.channel.send('JAIRO');
    }
    if(message.content === "agropesca"){
      message.channel.send('jacaré');
    }
    if(message.content === "saveiro"){
      message.channel.send('pega no breu');
    }
    if(message.content === "vo mergulha"){
      message.channel.send('cade o chinelo');
    }
    if(message.content === "ronaldo"){
      message.channel.send('ronaldo, camon');
    }
    if(message.content === "ela"){
      message.channel.send('me deixa suado e danado');
    }
    if(message.content === "boa noite"){
      message.channel.send('quem ta com a mao abaixada não comeu ninguém');
    }
    if(message.content === "na base"){
      message.channel.send('do xenhenhen')
    }
})


// comandos que triggam apenas com o uso do prefixo
client.on('message', message =>{
  let args = message.content.substring(prefix.length).split(" ");
    
  switch(args[0]){
    case 'help':
      if(args [1] === 'versão'){
        message.channel.send('versão: ' + version);
        break;
        }
        if(args [1] === 'comandos'){
        message.channel.send('!saveiro, !cdsaveiro, !psicopata, !poderosa, !dejavu, !somebodyx9, !skip, !play <link da música>');
        break;
        }
        else{ 
          message.channel.send('use !help versão ou !help comandos');
        }
        break;
    case 'play':

        function play(connection, message){
          var server = servers[message.guild.id];
          
          server.dispatcher = connection.play(ytdl(server.queue[0], {filter: "audioonly"}));
          
          server.queue.shift(); 

          server.dispatcher.on("end", function(){

            if(server.queue[0]){
                play(connection, message);
            }else{
              connection.disconnect();
            }
          });
        }

        if(!args[0]){
           message.channel.send('oq tu quer tocar seu jegue?');
             return;
        } 
        if(!message.member.voice.channel){
          message.channel.send('o cabeça de toro, tu não tá em nenhum canal de voz!')
           return;
        }

        if(!servers[message.guild.id]) servers[message.guild.id] = {
           queue: []
        }

        var server = servers[message.guild.id];

        server.queue.push(args[1]);

        if(!message.member.voice.connection) message.member.voice.channel.join().then(function(connection){
          play(connection, message); 

        })  

        break;

    case 'saveiro':
        if(!message.member.voice.connection) message.member.voice.channel.join().then(function(connection){
          play(connection, message); 
  
        })
        message.channel.send('!play https://www.youtube.com/watch?v=TFdO7oqkMzI');
        break;

    case 'cdsaveiro':
        if(!message.member.voice.connection) message.member.voice.channel.join().then(function(connection){
          play(connection, message); 
  
        })
        message.channel.send('!play https://www.youtube.com/watch?v=mc6r20MRiD0');
        break;

    case 'psicopata':
        if(!message.member.voice.connection) message.member.voice.channel.join().then(function(connection){
          play(connection, message); 
  
        })
        message.channel.send('!play https://www.youtube.com/watch?v=4PucP69iibc&t=21s');
        break;

    case 'poderosa':
        if(!message.member.voice.connection) message.member.voice.channel.join().then(function(connection){
          play(connection, message); 
  
        })
        message.channel.send('!play https://www.youtube.com/watch?v=wzMJWz8dAxU');
        break;

    case 'somebodyx9':
        if(!message.member.voice.connection) message.member.voice.channel.join().then(function(connection){
          play(connection, message); 
  
        })
        message.channel.send('!play https://www.youtube.com/watch?v=vV196a3vaaY');
        break;

    case 'saveiro2020':
        if(!message.member.voice.connection) message.member.voice.channel.join().then(function(connection){
          play(connection, message); 
  
        })
        message.channel.send('!play https://www.youtube.com/watch?v=HhcefAq5LRs');
        break

    case 'skip':
        var server = servers[message.guild.id];
          if(server.dispatcher) server.dispatcher.end();
          message.channel.send('pelo visto vem coisa boa pela frente, pulando a música atual')
        break; 
      
    case 'stop':
        var server = servers[message.guild.id];
        if(message.guild.voice.connection){
          for(var i = server.queue.length -1; i >=0; i--){
            server.queue.splice(i, 1);
          }

          server.dispatcher.end();
          message.channel.send('vo te q sair, vou dar um cagão')
          console.log('parou a fila')
        }
        if(message.guild.connection) message.member.voice.connection.disconnect();

        break;
    }
})