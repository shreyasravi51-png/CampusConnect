const socket = io();
const statusBox=document.getElementById('status'), startBtn=document.getElementById('start'), nextBtn=document.getElementById('next');
const localVideo=document.getElementById('localVideo'), remoteVideo=document.getElementById('remoteVideo');
const messages=document.getElementById('messages'); let localStream=null, pc=null, room=null, partnerEmail='unknown';
const config={iceServers:[{urls:'stun:stun.l.google.com:19302'}]};
function status(t){statusBox.textContent=t}
function addMessage(name,msg){const p=document.createElement('p'),b=document.createElement('strong');b.textContent=name+': ';p.append(b,document.createTextNode(msg));messages.append(p);messages.scrollTop=messages.scrollHeight}
async function getMedia(){if(!localStream)localStream=await navigator.mediaDevices.getUserMedia({video:true,audio:true});localVideo.srcObject=localStream}
function closePeer(){if(pc){pc.close();pc=null}remoteVideo.srcObject=null;room=null}
function makePeer(){pc=new RTCPeerConnection(config);localStream.getTracks().forEach(t=>pc.addTrack(t,localStream));pc.ontrack=e=>remoteVideo.srcObject=e.streams[0];pc.onicecandidate=e=>{if(e.candidate)socket.emit('signal',{candidate:e.candidate})};}
startBtn.onclick=async()=>{try{await getMedia();startBtn.disabled=true;nextBtn.disabled=false;status('Searching for another verified MSRUAS student...');socket.emit('join_queue')}catch(e){status('Camera/microphone permission is required for video. You can still use text chat after allowing access.') ;startBtn.disabled=false}};
nextBtn.onclick=()=>{closePeer();messages.innerHTML='';status('Finding another student...');socket.emit('next_chat')};
document.getElementById('leave').onclick=()=>{closePeer();socket.emit('next_chat');status('You left the conversation.');startBtn.disabled=false;nextBtn.disabled=true};
socket.on('notice',d=>status(d.message));
socket.on('matched',async d=>{room=d.room;status('Connected! Say hello.');makePeer();if(d.initiator){const offer=await pc.createOffer();await pc.setLocalDescription(offer);socket.emit('signal',{description:pc.localDescription})}});
socket.on('signal',async d=>{if(!pc)makePeer();if(d.description){await pc.setRemoteDescription(d.description);if(d.description.type==='offer'){const answer=await pc.createAnswer();await pc.setLocalDescription(answer);socket.emit('signal',{description:pc.localDescription})}}else if(d.candidate){try{await pc.addIceCandidate(d.candidate)}catch(e){console.warn(e)}}});
socket.on('partner_left',()=>{closePeer();status('The other student left. Click Next student to find someone else.')});
document.getElementById('messageForm').onsubmit=e=>{e.preventDefault();const input=document.getElementById('message'),msg=input.value.trim();if(msg){addMessage('You',msg);socket.emit('chat_message',{message:msg});input.value=''}};
socket.on('chat_message',d=>addMessage(d.name,d.message));
document.getElementById('report').onclick=async()=>{if(confirm('Report this student for inappropriate behaviour?')){await fetch('/report',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:partnerEmail,reason:'Reported from chat interface'})});status('Report submitted. Thank you for helping keep the community safe.')}};
window.addEventListener('beforeunload',()=>{if(localStream)localStream.getTracks().forEach(t=>t.stop())});
