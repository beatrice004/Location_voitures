import { Container, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Container
      bg={"gray.200"}
      minW={"full"}
      maxW={"6xl"}
      mt={4}
      p={8}
      align={"center"}
      style={{display : 'flex' , justifyContent : 'space-between', alignItems : 'center'}}
    >
      <Text>© Copyright. Tout droit reservés.</Text>
      <Link to="/dashboard" style={{fontSize : '14px'}}>Admin</Link>
    </Container>
  );
};

export default Footer;