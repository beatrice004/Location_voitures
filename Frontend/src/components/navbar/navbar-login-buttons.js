import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import { HStack,Button } from "@chakra-ui/react";
import axiosClient from "../../context/axiosClient";
import { useEffect } from "react";

const NavbarLoginButtons = () => {

  const { token, setToken , setUser } = useStateContext()

  const navigate = useNavigate();


  useEffect(() => {
    if(token){
      axiosClient.get('/user')
      .then(({data}) => {
        setUser(data)
      })
    }
  },[])

  const logout = async(e)=>{
      e.preventDefault()


      await axiosClient.post('http://127.0.0.1:8000/api/logout')
      setToken(null)
      setUser({})
      navigate('/')

  }

 
  return (
    <div className="login-buttons d-flex align-items-center">
      {token ?
        <HStack position={"absolute"} right={0} top={3}>
            <Button
              color={"gray.600"}
              colorScheme={"blackAlpha"}
              variant="ghost"
              leftIcon={<MdAccountCircle color="gray" />}
              onClick={() => navigate("/profile")}
            >
              Profile
            </Button>
            <Button
              color={"gray.600"}
              colorScheme={"blackAlpha"}
              variant="ghost"
              leftIcon={<MdLogout color="gray" />}
              onClick={(e) => logout(e)}
            >
             Déconnexion
            </Button>
          </HStack>
          :
          <>
            <button
              type="button"
              className="btn-outline-secondary px-3 me-2"
              onClick={() => navigate("/login")}
            >
              Connexion
            </button>
            <button
              type="button"
              className="btn-primary"
              onClick={() => navigate("/signup")}
            >
              Inscription
            </button> 
          </>
      }
      
    </div>
  );
};

export default NavbarLoginButtons;
