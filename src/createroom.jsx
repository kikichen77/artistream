import { useEffect, useRef } from "react";
import "./createRoom.css";

export default function CreateRoom({ username }) {
  const localVideoRef = useRef(null);
  const streamRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const localStramRef = useRef();
  const pc = useRef();
  const serverConnection = useRef(new WebSocket("ws://localhost:4000"));

  useEffect(() => {
    initServerConnection();
    getMediaDevices().then(() => {
      createRtcConnection();
      addLocalStreamToRtcConnection();
    });

    return () => {
      if (streamRef.current) {
        const tracks = streamRef.current.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const initServerConnection = () => {
    serverConnection.current.onopen = () => console.log("socket connect!");

    serverConnection.current.onmessage = onMessage;
  };

  const onMessage = (e) => {
    const serverData = e.data;
    if (typeof serverData === "object" && serverData instanceof Blob) {
      serverData.text().then((text) => {
        const data = JSON.parse(text);
        const serverUsername = data["username"];
        console.log("username", serverUsername);
        if (username === serverUsername) {
          return;
        }
        const type = data["type"];
        if (type === "offer") {
          const offer = data["data"];
          pc.current.setRemoteDescription(
            new RTCSessionDescription(JSON.parse(offer))
          );
        }
        if (type === "answer") {
          const answer = data["data"];
          pc.current.setRemoteDescription(
            new RTCSessionDescription(JSON.parse(answer))
          );
        }
        if (type === "candidate") {
          const candidate = JSON.parse(data["data"]);
          pc.current.addIceCandidate(new RTCIceCandidate(candidate));
        }
      });
    } else {
      const data = JSON.parse(serverData);
      const serverUsername = data["username"];
      console.log("username", serverUsername);
      if (username === serverUsername) {
        return;
      }
      const type = data["type"];
      if (type === "offer") {
        const offer = data["data"];
        pc.current.setRemoteDescription(
          new RTCSessionDescription(JSON.parse(offer))
        );
      }
      if (type === "answer") {
        const answer = data["data"];
        pc.current.setRemoteDescription(
          new RTCSessionDescription(JSON.parse(answer))
        );
      }
      if (type === "candidate") {
        const candidate = JSON.parse(data["data"]);
        pc.current.addIceCandidate(new RTCIceCandidate(candidate));
      }
    }
  };

  const sendMessage = (type, data) => {
    serverConnection.current.send(
      JSON.stringify({
        username,
        type,
        data,
      })
    );
  };

  const getMediaDevices = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    console.log("stream", stream);
    localVideoRef.current.srcObject = stream;
    localStramRef.current = stream;
  };
  const createRtcConnection = () => {
    const _pc = new RTCPeerConnection({
      iceServers: [
        {
          urls: ["stun:stun.stunprotocol.org:3478"],
        },
      ],
    });
    _pc.onicecandidate = (e) => {
      if (e.candidate) {
        sendMessage("candidate", JSON.stringify(e.candidate));
      }
    };
    _pc.ontrack = (e) => {
      remoteVideoRef.current.srcObject = e.streams[0];
    };
    pc.current = _pc;
    console.log("rtc connect successfully", _pc);
  };

  const createOffer = () => {
    pc.current
      .createOffer({
        offerToReceiveVideo: true,
        offerToReceiveAudio: true,
      })
      .then((sdp) => {
        console.log("offer", JSON.stringify(sdp));
        pc.current.setLocalDescription(sdp);
        sendMessage("offer", JSON.stringify(sdp));
      });
  };

  const createAnswer = () => {
    pc.current
      .createAnswer({
        offerToReceiveVideo: true,
        offerToReceiveAudio: true,
      })
      .then((sdp) => {
        console.log("Answer", JSON.stringify(sdp));
        pc.current.setLocalDescription(sdp);
        sendMessage("answer", JSON.stringify(sdp));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addLocalStreamToRtcConnection = () => {
    const localStream = localStramRef.current;
    localStream.getTracks().forEach((track) => {
      pc.current.addTrack(track, localStream);
    });
    console.log("local stream has been add to RTC connection");
  };

  return (
    <div className="video-wrap">
      <span className="absolute top=1 left=1">{username}</span>
      <video
        style={{ width: "100%", transform: "rotateY(180deg)" }}
        ref={localVideoRef}
        autoPlay
      ></video>
      <span className="absolute top=1 left=1">{username}</span>
      <video
        style={{ width: "100%", transform: "rotateY(180deg)" }}
        ref={remoteVideoRef}
        autoPlay
      ></video>
      <button onClick={createOffer}>create offer</button>
      <button onClick={createAnswer}>Answer</button>
    </div>
  );
}