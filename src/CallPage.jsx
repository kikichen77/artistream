import { useLocation } from "react-router-dom";
import Room from "./VideoComponent";
import  { Navigate } from "react-router-dom";


export default function CallPage() {
  const {state} = useLocation();
  if (!state){
    return <Navigate to="/error"/>
  }
  
  const { ROOM_ID } = state;
  console.log("Page - Room ID:"+ROOM_ID)
  

  return (
      <Room props={ROOM_ID}/>
  );
}