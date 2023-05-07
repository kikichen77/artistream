import Peer from 'peerjs';
import React, { useEffect } from 'react';
import SocketIO from 'socket.io-client';

export default function Room({props}){
    let ROOM_ID=props
    console.log("Component - Room ID:"+ROOM_ID)
    let socket = SocketIO("http://localhost:3000")
    useEffect(() => {
        const videoGrid = document.getElementById('video-grid')
        
        const myPeer = new Peer(undefined, {
        host: '/',
        port: '3001'
        })

        const myVideo = document.createElement('video')
        myVideo.muted = true
        const peers = {}
        navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
        }).then(stream => {
        addVideoStream(myVideo, stream)

        myPeer.on('call', call => {
            call.answer(stream)
            const video = document.createElement('video')
            call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream)
            })
        })

        socket.on('user-connected', userId => {
            connectToNewUser(userId, stream)
        })

        const videoTrack = stream.getVideoTracks()[0];
        const constraints = { width: { exact: 269 }, height: { exact: 150 } };
        videoTrack.applyConstraints(constraints);
        })

        socket.on('user-disconnected', userId => {
            if (peers[userId]) peers[userId].close()
        })

        myPeer.on('open', id => {
            socket.emit('join-room', ROOM_ID, id)
        })

        function connectToNewUser(userId, stream) {
            const call = myPeer.call(userId, stream)
            const video = document.createElement('video')
            call.on('stream', userVideoStream => {
                addVideoStream(video, userVideoStream)
            })
            call.on('close', () => {
                video.remove()
            })
            peers[userId] = call
        }

        function addVideoStream(video, stream) {
            video.srcObject = stream
            video.addEventListener('loadedmetadata', () => {
                video.play()
            })
            videoGrid.append(video)
        }
    }
)
return (<div id="video-grid"></div>);
};
