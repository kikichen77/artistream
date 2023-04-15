import { useEffect, useRef } from "react";

export default function CreateRoom({ username }) {
  const localVideoRef = useRef(null);
  const streamRef = useRef(null);
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        console.log("stream", stream);
        if (!localVideoRef.current) {
          throw new Error("localVideoRef is null");
        }
        localVideoRef.current.srcObject = stream;
        streamRef.current = stream;
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      if (streamRef.current) {
        const tracks = streamRef.current.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div>
      <span>{username}</span>
      <video style={{ width: "400px" }} ref={localVideoRef} autoPlay></video>
    </div>
  );
}
