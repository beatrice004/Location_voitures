import { useRef } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import FormButton from "./form-button";
import FormInput from "./form-input";
import axiosClient from "../../context/axiosClient";
import {useStateContext} from "../../context/ContextProvider";

const SignUpForm = () => {

  const navigate = useNavigate()

  const {setUser, setToken} = useStateContext()

  const toast = useToast();
  const toastMessage = (message, type = "error", title = "Error occured.") => {
    return toast({
      title: title,
      description: message,
      status: type,
      duration: 3000,
      isClosable: true,
    });
  };

  const firstname = useRef();
  const lastname = useRef();
  const telephone = useRef();
  const email = useRef();
  const password = useRef();


  function createUserAcccount(e) {
    e.preventDefault();

   
    const payload = {
      firstname: firstname.current.value,
      lastname: lastname.current.value,
      telephone: telephone.current.value,
      email: email.current.value,
      password: password.current.value,
    }
    axiosClient.post("http://127.0.0.1:8000/api/signup",payload)
      .then(({data}) => {
        console.log(data)
        toastMessage(
          "We've created your account for you.",
          "success",
          "Account created."
        ); 
        setUser(data.user)
        setToken(data.token)
        navigate("/cars");
      })
      .catch((error) => {
        toastMessage(error.response.data.message)
      });
  }

  return (
    <div className="col-md-6 col-lg-6 p-md-5 px-4 py-5">


      <form onSubmit={createUserAcccount}>
        <FormInput name="Prénom" type="text" refe={firstname} />
        <FormInput name="Nom" type="text" refe={lastname} />
        <FormInput name="Téléphone" type="tel" refe={telephone} />
        <FormInput name="Email" type="email" refe={email} />
        <FormInput name="Mot de passe" type="password" refe={password} />

        <FormButton bgColor="btn-secondary" btnText="Créer votre compte " />
      </form>
    </div>
  );
};

export default SignUpForm;
