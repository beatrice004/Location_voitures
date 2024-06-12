import {
  Box,
  Container,
  HStack,
  List,
  ListItem,
} from "@chakra-ui/react";
import {useStateContext} from "../context/ContextProvider";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Dashboard() {

  const { adminToken } = useStateContext()

  const navigate = useNavigate()

  useEffect(() => {
    if (!adminToken) {
      return navigate("/admin/login");
    }
  }, []);



  return (
    <Container h="100vh" maxW="100vw" p={0}>
      <HStack h={"full"} spacing="0">
        <Box bg={"gray.600"} px="5" py={"40vh"} h="100vh" w={'15%'}>
          <List color={"white"} align="center">
            <ListItem
              transition="all 0.2s"
              borderRadius="md"
              p={2}
              cursor="pointer"
              _hover={{ bg: "gray.500" }}
              onClick={()=>navigate('/dashboard')}
            >
              Utilisateurs
            </ListItem>
            <ListItem
              transition="all 0.2s"
              borderRadius="md"
                 cursor="pointer"
              my={4}
              p={2}
              _hover={{ bg: "gray.500" }}
              onClick={()=>navigate('/dashboard/cars')}
              
            >
              Voitures
            </ListItem>
            <ListItem
              transition="all 0.2s"
              borderRadius="md"
              p={2}
                 cursor="pointer"
              _hover={{ bg: "gray.500" }}
              onClick={()=>navigate('/dashboard/rents')}
            >
              Locations
            </ListItem>
          </List>
        </Box>
        <Box h={"full"} w={'84%'}>
          <Outlet />
        </Box>
      </HStack>
    </Container>
  );
}
export default Dashboard;
