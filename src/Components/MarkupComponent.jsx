import styled from 'styled-components';

export const WrapperCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const WrapperRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LogoImage = styled.img`
  width: 180px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  margin-bottom: 20px

  margin: auto;
  padding: 10px;
`;

export const Input = styled.input`
  width: 180px;
  background-color: white;
  color: black;
  padding: 8px 16px;
  margin-bottom: 10px;
  border: 1px solid rgba(0, 0, 0, .3);
  border-radius: 30px;
	outline: none;
	-webkit-transition: all .3s ease;
	   -moz-transition: all .3s ease;
	    -ms-transition: all .3s ease;
	     -o-transition: all .3s ease;
	        transition: all .3s ease;
  &:hover {
    border-color: rgba(0, 0, 0, .5);
    box-shadow: 0 0 5px rgba(0, 0, 0, .2);
  }
  &:focus {
    border-color: rgb(44, 202, 247);
    box-shadow: 2px -2px 10px #1beabd, -2px 2px 10px #10abff;
  }
`;

export const InputDark = styled.input`
  width: 180px;
  background-color: white;
  color: black;
  padding: 8px 16px;
  margin-bottom: 10px;
  border: 1px solid rgba(44, 202, 247, .6);
  border-radius: 30px;
	outline: none;
	-webkit-transition: all .3s ease;
	   -moz-transition: all .3s ease;
	    -ms-transition: all .3s ease;
	     -o-transition: all .3s ease;
	        transition: all .3s ease;
  &:hover {
    border-color: rgba(44, 202, 247, 1);
    box-shadow: 0 0 5px rgba(44, 202, 247, .7);
  }
  &:focus {
    border-color: rgb(44, 202, 247);
    box-shadow: 2px -2px 10px #1beabd, -2px 2px 10px #10abff;
  }
`;

export const Button = styled.input`
  background-color: #5D627A;
  color: white;
  box-shadow: 2px 5px #040A20;
  border-radius: 10px;
  &:hover {
    background-color: rgb(43, 192, 105);
    cursor: pointer;
  }
  padding: 8px 16px;
  margin: 5px;
`;

export const ButtonDark = styled.input`
  background-color: rgb(44, 202, 247);
  color: black;
  width: 100px;
  padding: 8px 16px;
  margin: 5px;
  border: 1px solid rgb(44, 202, 247);
  border-radius: 30px;
  cursor: pointer;
  box-shadow: 0 5px 10px rgba(44, 202, 247, .3);
	-webkit-transition: all .3s ease;
	   -moz-transition: all .3s ease;
	    -ms-transition: all .3s ease;
	     -o-transition: all .3s ease;
	        transition: all .3s ease;
  &:hover {
    box-shadow: 0 2px 4px rgba(44, 202, 247, .4);
    -webkit-transition: all .3s ease;
    -moz-transition: all .3s ease;
     -ms-transition: all .3s ease;
      -o-transition: all .3s ease;
         transition: all .3s ease;
  }
`;



