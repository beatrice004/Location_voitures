import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Stack,
  Box,
  FormLabel,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useState } from "react";
import axiosClient from "../../context/axiosClient";
import { useToast } from "@chakra-ui/react";
import { useStateContext } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";

function ProfileDrawer( {user}) {

  const { setUser } = useStateContext()

  const navigate = useNavigate()

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [firstname, setFirstName] = useState(user?.firstname)
  const [lastname, setLastName] = useState(user?.lastname)
  const [email, setEmail] = useState(user?.email)
  const [telephone, setTelephone] = useState(user?.telephone)

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


  const updateProfile = ()=>{
    const payload = {
      firstname,
      lastname,
      email,
      telephone
    }
    axiosClient.put(`http://127.0.0.1:8000/api/users/${user.id}`,payload)
    .then(({data}) => {
      toastMessage(
        "We've updated your account for you.",
        "success",
        "Account updated."
      ); 
      setUser(data)
      navigate("/cars");

    })
    .catch((error) => {
      toastMessage(error.response.data.message)
    });
  }

  

  return (
    <>
      <Button
        leftIcon={<EditIcon color={"white"} />}
        colorScheme="telegram"
        onClick={onOpen}
      >
        Modifier profile
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstname}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerHeader borderBottomWidth="1px">
            Modifier votre profil
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="firstname">Prénom</FormLabel>
                <Input value={firstname} onChange={(e)=>setFirstName(e.target.value)}/>
              </Box>

              <Box>
                <FormLabel htmlFor="lastname">Nom</FormLabel>
                <Input value={lastname} onChange={(e)=>setLastName(e.target.value)}/>
              </Box>


              <Box>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input value={email} onChange={(e)=>setEmail(e.target.value)}/>
              </Box>

              <Box>
                <FormLabel htmlFor="username">Téléphone</FormLabel>
                <Input value={telephone} onChange={(e)=>setTelephone(e.target.value)}/>
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Annuler
            </Button>
            <Button colorScheme="green" px={7} onClick={(e)=>updateProfile(e)}>
              Enregistrer
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default ProfileDrawer;
