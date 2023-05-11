import React from "react"
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { Form, 
         LogoImage,
         Input, 
         InputDark, 
         Button, 
         ButtonDark, 
         WrapperCol, 
         WrapperRow 
        } from "./Components/MarkupComponent";
import logoImage from './assets/HilariousHuskies.png';
import styles from "./LandingPageComponents/LandingPageStyles.module.css"
import axios from "axios";


export default function ConnectPage({theme}) {
    const roomId = useRef(null);
    const userName = useRef(null);
    const navigate = useNavigate();

    const makeRoom = (e) => {
      e.preventDefault();
      const makeRoomId = uuidv4();
      if(!userName.current.value){
        alert("userName cannot be empty")
      }else{
      sessionStorage.setItem('username', userName.current.value);
      navigate("/room", { state: { ROOM_ID: makeRoomId } })
    }
  }


    const submitRoom = async (e) => {
      e.preventDefault();
    if (!roomId.current.value){
       alert("Room number cannot be empty")
      }else if(!userName.current.value){
        alert("Username cannot be empty")
      }else{
       const{roomExist,roomFull}= await checkRoom()
       console.log(roomExist)
       console.log(roomFull)
       if(!roomExist){
          alert("Check the right room number")
        }else if(roomFull){
          alert("The room is full, please wait")
        }else{

        sessionStorage.setItem('username', userName.current.value);
        navigate("/room", { state: { ROOM_ID: roomId.current.value } })
      }
    }
   }

   async function checkRoom(){
      const response=await axios.get(`http://localhost:3000/room/${roomId.current.value}`)
      console.log(response.data)
      return response.data
    }
  
    return (
    <WrapperCol>
      <div className={styles.lpBackground}>
        <div className={styles.logoSpace}>
          <LogoImage src={logoImage}/>
        </div>
        {/* <h1>Username</h1> */}
        <Form onSubmit={submitRoom}>
          <WrapperCol>
            {theme ?
            <>
              <label>
                <InputDark type="text" ref={userName} placeholder="Enter username" />
              </label>
              <br />
              <label>
                <InputDark type="text" ref={roomId} placeholder="Enter room ID" />
              </label>
            </>
            :
            <>
              <label>
                <Input type="text" ref={userName} placeholder="Enter username" />
              </label>
              <br />
              <label>
                <Input type="text" ref={roomId} placeholder="Enter room ID" />
              </label>
            </>
            }
            </WrapperCol>
            <br />
            <WrapperRow>
              {theme ? 
              <>
                <ButtonDark type="submit" value="Join Room" />
                <ButtonDark type="button" onClick={makeRoom} value = "Make Room"/>
              </>
              :
              <>
                <Button type="submit" value="Join Room" />
                <Button type="button" onClick={makeRoom} value = "Make Room"/>
              </>
              }
            </WrapperRow>
          </Form>
      </div>
      </WrapperCol>
    )
}
