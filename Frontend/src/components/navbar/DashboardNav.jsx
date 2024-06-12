import { Box, Flex, Spacer, Button } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';
import { useStateContext } from '../../context/ContextProvider';
import axiosAdminClient from '../../context/axiosAdminClient';

function DashboardNav() {

  const { setAdminToken }  = useStateContext()

  const navigate = useNavigate()


  const handleLogout = async () => {
    try {
      await axiosAdminClient.post("http://127.0.0.1:8000/api/admin/logout");
      setAdminToken(null);
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Flex
      className=" navbar navbar-expand-lg"
      justifyContent={"space-between"}
      alignItems={"center"}
      bg={"gray.600"}
      p={4}
      color={"white"}
    >
      <Box>
        <Link
          to="/dashboard"
          style={{ fontWeight: "bold", fontSize: "1.2rem" }}
        >
          Dashboard
        </Link>
      </Box>

      <Spacer />

      <Button
        color={"white"}
        colorScheme={"blackAlpha"}
        variant="ghost"
        leftIcon={<MdLogout color="white" />}
        onClick={() => handleLogout()}
      >
        Déconnexion
      </Button>
    </Flex>
  );
}

export default DashboardNav;
