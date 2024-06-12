import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import FormButton from "./form-button";
import FormInput from "./form-input";
import axiosClient from "../../context/axiosClient";
import { useStateContext } from "../../context/ContextProvider";

const LoginForm = () => {


  const {setUser , setToken} = useStateContext()

  const navigate = useNavigate();
  const toast = useToast();
  const toastMessage = (message, type = "error", title = "Error occured.") => {
    return toast({
      title: title,
      description: message,
      status: type,
      duration: 4000,
      isClosable: true,
    });
  };

  const email = useRef();
  const password = useRef();

  function Login(e) {
    e.preventDefault();

    if (!email.current.value || !password.current.value){
      return toastMessage(
          "Email et Mot de passe sont obligatoires",
          "Erreur",
          "Champ vide"
        ); 
    }

    const payload = {
      email: email.current.value,
      password: password.current.value,
    }
    
     axiosClient.post("http://127.0.0.1:8000/api/login",payload)
      .then(({data}) => {
        console.log(data)
        setUser(data.user)
        setToken(data.token)
        toastMessage(
          "Welcome in your website",
          "success",
          "Login success"
        ); 
        navigate("/cars");
      })
      .catch((error) => {
        toastMessage(error.response.data.message)
      });
  }

  return (
    <div className="col-md-6 col-lg-6 p-md-5 px-4 py-5">
      <form onSubmit={Login}>
        <FormInput name="Email" type="email" refe={email} />
        <FormInput name="Mot de passe" type="password" refe={password} />

        <FormButton bgColor="btn-primary" btnText="Connexion" />
      </form>
    </div>
  );
};

export default LoginForm;
