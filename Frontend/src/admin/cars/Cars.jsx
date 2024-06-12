import {
  TableContainer,
  Thead,
  Table,
  Tr,
  Th,
  Tbody,
  Button,
  Flex, Input, InputGroup, InputRightElement
} from "@chakra-ui/react";
import { SearchIcon,AddIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import axiosClient from "../../context/axiosClient";
import LoadingSpinner from "../../components/ui/loading-spinner";
import CarItem from "./CarItem";
import AddCar from "./AddCar";
import Swal from "sweetalert2";


const Cars = () => {

  const [cars, setcars] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [isOpen, setisOpen] = useState(false)

  useEffect(()=>{
    const fetchcars = async ()=>{
      const { data } = await axiosClient.get('http://127.0.0.1:8000/api/cars')
      setLoading(false)
      setcars(data.data)
    }
    fetchcars()
  },[])

  
  const deleteCar = async (id) => {
     Swal.fire({
       title: "Vous ètes sur?",
       text: "Vous ne pourrez pas récupérer cet utilisateur",
       icon: "warning",
       showCancelButton: true,
       confirmButtonColor: "#3085d6",
       cancelButtonColor: "#d33",
       confirmButtonText: "Oui, je confirme",
     }).then(async (result) => {
       if (result.isConfirmed) {
         try {
           await axiosClient.delete(`http://localhost:8000/api/cars/${id}`);
           setcars(cars.filter((car) => car.id !== id));
           Swal.fire("Supprimé!", "", "success");
         } catch (e) {
           console.error(e);
         }
       }
     });
   
  };



  if (loading)  return  <LoadingSpinner />
  
  return (
    <TableContainer p={10}>
      <Flex justify="space-between" py={2} mb={4}>
        <Button
          colorScheme="blue"
          leftIcon={<AddIcon />}
          onClick={() => setisOpen(true)}
        >
          Ajouter une voiture
        </Button>
        <InputGroup w="300px">
          <Input
            type="text"
            value={search}
            placeholder="Rechercher une voiture"
            onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
          />
          <InputRightElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputRightElement>
        </InputGroup>
      </Flex>

      <AddCar
        isOpen={isOpen}
        setisOpen={setisOpen}
        cars={cars}
        setcars={setcars}
      />

      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Photo</Th>
            <Th>Marque</Th>
            <Th>modèle</Th>
            <Th>Transmission</Th>
            <Th>type</Th>
            <Th>Prix</Th>
            <Th>Disponibilité</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {cars &&
            cars
              .filter((car) => car.brand.toLowerCase().includes(search))
              .map((car) => (
                <CarItem car={car} key={car.id} deleteCar={deleteCar} cars={cars} setcars={setcars} />
              ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default Cars