import {
  TableContainer,
  Thead,
  Table,
  Tr,
  Th,
  Td,
  Tbody,
  IconButton,
  Flex, Input, InputGroup, InputRightElement
} from "@chakra-ui/react";
import { SearchIcon } from '@chakra-ui/icons';
import { DeleteIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import axiosClient from "../../context/axiosClient";
import LoadingSpinner from "../../components/ui/loading-spinner";
import Swal from "sweetalert2"




const Users = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(()=>{
    const fetchUsers = async ()=>{
      const { data } = await axiosClient.get('http://127.0.0.1:8000/api/users')
      setLoading(false)
      setUsers(data)
    }
    fetchUsers()
  },[])


  const deleteUser = async (id) =>{

    Swal.fire({
      title: "Vous ètes-surs?",
      text: "Vous ne pourrez pas récupérer cet utilisateur",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, je confirme",
    }).then(async(result) => {
      if (result.isConfirmed) {
      try{
        await axiosClient.delete(`http://127.0.0.1:8000/api/users/${id}`);
        setUsers(users.filter((user) => user.id !== id));
        Swal.fire("Supprimé!", "", "success");
      }catch(e){
        console.error(e)
      }
      }
    });
    
  }





  if (loading)  return  <LoadingSpinner />
  
  return (
    <TableContainer p={10}>
            <Flex justify="flex-end" py={2} mb={4}>
              <InputGroup w="300px">
                <Input
                  type="text"
                  value={search}
                  placeholder="Rechercher un utilisateur"
                  onChange={(e)=> setSearch(e.target.value.toLocaleLowerCase())}
                />
                <InputRightElement pointerEvents="none">
                  <SearchIcon color="gray.400" />
                </InputRightElement>
              </InputGroup>
            </Flex>
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Prénom</Th>
                  <Th>Nom</Th>
                  <Th>Email</Th>
                  <Th>Téléphone</Th>
                  <Th>Editer</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users && 
                users
                .filter(user=>
                user.firstname.toLowerCase().includes(search) || user.lastname.toLowerCase().includes(search))
                .map((user)=>(
                <Tr key={user.id}>
                  <Td>{user.id}</Td>
                  <Td>{user.firstname}</Td>
                  <Td>{user.lastname}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.telephone}</Td>
                  <Td>
                    <IconButton
                      bg={""}
                      _hover={{ bg: "red", color: "white" }}
                      ml={1}
                      aria-label="Delete"
                      icon={<DeleteIcon />}
                      onClick={()=>deleteUser(user.id)}
                    />
                  </Td>
                </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
  )
}

export default Users