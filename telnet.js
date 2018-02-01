var Telnet = require('telnet-client');
var connection =  new Telnet();
 
var params = {
  host: '10.5.164.249',
  port: 23,
  shellPrompt: 'QNET>',
  //shellPrompt: '/ # ',
  loginPrompt :'login:',
  passwordPrompt : 'password:',
  username: '\r\n',
  password: '\r\n',
  initialLFCR: true,
  timeout: 150000,
  //removeEcho: 4
}

connection.on('ready', function(prompt) {
  console.log('ready!')
})

connection.on('failedlogin', function(prompt) {
  console.log('failedlogin event!')
})

connection.on('writedone', function(prompt) {
  console.log('writedone event!')
})

connection.on('connect', function(prompt) {
  console.log('telnet connection established!')
  connection.send("<login>\r\n<psswd>\r\n", null ,function(err, response) {
        console.log("login cmd response",response);
  });
})
 
connection.on('timeout', function() {
  console.log('socket timeout!')
  //connection.end()
})
 
connection.on('close', function() {
  console.log('connection closed')
})

try {
  console.log('trying telnet connection.')
  connection.connect(params)
}catch(err) {
    
}

module.exports = {
    sendCMD: {
        type: "action",
        args: ["CMD"],
        fn: function(args, callback){
            console.log("send cmd args",args);
			connection.send(args.CMD+"\r\n", null , function(err, response) {
                console.log("send cmd results",response);
                callback(null,response);
            });
        },
    },
    connect: {
      type: "action",
        args: ["params"],
        fn: function(args, callback){
          try {
            callback(null,connection.connect(params/*args.params*/))
          }catch(err) {
            callback(null,null)
          }
          ;
        },
    }  
};

