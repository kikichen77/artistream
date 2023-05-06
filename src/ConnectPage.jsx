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
        } from "../Components/MarkupComponent";
import logoImage from './assets/HilariousHuskies.png';


export default function ConnectPage({theme}) {
    const roomId = useRef(null);
    const userName = useRef(null);
    const navigate = useNavigate();

    const makeRoom = (e) => {
      e.preventDefault();
      const makeRoomId = uuidv4();
      sessionStorage.setItem('username', userName.current.value);
      navigate("/room", { state: { ROOM_ID: makeRoomId } })
    }

    // const submitName = (e) => {
    //   e.preventDefault();
    //   sessionStorage.setItem('username', userName.current.value);
    //   alert('username set')
    // };

    const submitRoom = (e) => {
      e.preventDefault();
      if (roomId.current.value == "connect"){
        alert("Cannot use that name")
      }
      else{
        sessionStorage.setItem('username', userName.current.value);
        navigate("/room", { state: { ROOM_ID: roomId.current.value } })
      }
    }
  
    return (
    <WrapperCol>
      <LogoImage src={logoImage}/>
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
    </WrapperCol>
    )
}