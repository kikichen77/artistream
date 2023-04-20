const WebSocket=require('ws')
const wss=new WebSocket.Server({port:4000});

wss.on('connection', ws => {
   console.log('Client connected');
 
   ws.on('message', message => {
     console.log('Received message:', message);
 // Echo message back to client
 wss.clients.forEach(client => {
   if (client.readyState === WebSocket.OPEN) {
     // console.log(message)
     client.send(message);
   }
 });
   });
 
   ws.on('close', () => {
     console.log('Client disconnected');
   });
 });