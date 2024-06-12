import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import {ArrowBackIcon} from "@chakra-ui/icons"
import { useState } from "react";
import Swal from "sweetalert2";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../context/axiosClient";
import { useNavigate } from "react-router-dom";

function DashboardLogin() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { setAdminToken } =  useStateContext()

  const navigate = useNavigate()

  const handleLogin = async (e) => {

    e.preventDefault();
    const admin = {
      username,
      password
    }

    if(!admin.username || !admin.password){
      return Swal.fire({
        icon: "error",
        title: "Fields are required",
      });
    }


    try{
      const {data} = await axiosClient.post('http://127.0.0.1:8000/api/admin/login',admin)

      setAdminToken(data.admin_token)

      navigate('/dashboard')

      
    }catch(e){
      console.error(e)
      return Swal.fire({
        icon: "error",
        title: e.response.data.message,
      });
    }



  };

  return (
    <Box
      width="300px"
      margin="auto"
      mt="100px"
      bg="white"
      boxShadow="lg"
      rounded="md"
      p={6}
    >
      <form onSubmit={(e)=>handleLogin(e)}>
        <FormControl isRequired>
          <FormLabel>Nom Utilisateur</FormLabel>
          <Input
            type="text"
            placeholder="Entrer Email"
            focusBorderColor="blue.400"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl mt={4} isRequired>
          <FormLabel>Mot de passe</FormLabel>
          <Input
            type="password"
            placeholder="Entrer Mot de passe"
            focusBorderColor="blue.400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button
          type="submit"
          colorScheme="blue"
          width="full"
          mt={6}
          _hover={{ bg: "blue.600" }}
        >
          Connexion
        </Button>
      </form>
    </Box>
  );
}

export default DashboardLogin;
