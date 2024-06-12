import {
  Tr,
  Td,
  IconButton,
  Image
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useState } from "react";
import EditCar from "./EditCar";
import axiosClient from "../../context/axiosClient";

const CarItem = ({ car, deleteCar, cars, setcars }) => {

  const [isOpen, setisOpen] = useState(false)

  const update = async (updatedData) =>{
    // console.log(updatedData);
    try{
      const { data } = await axiosClient.put(
        `http://127.0.0.1:8000/api/cars/${updatedData.id}`,
        updatedData
      );
      console.log('updated : ',data)
       setcars(cars => cars.map(car => {
          if (car.id === updatedData.id) {
            return data; // Replace the whole object with the new one
          }
          return car; // Return unchanged objects
        }))

    }catch(e){
      console.error(e)
    }
  }

  return (
    <Tr>
      <Td>{car.id}</Td>
      <Td>
        <Image
          className="first"
          objectFit="cover"
          h={"60px"}
          w={"60px"}
          src={`http://localhost:8000/images/${car.photo1}`}
          loading="lazy"
          borderRadius="10px"
        ></Image>
      </Td>
      <Td>{car.brand}</Td>
      <Td>{car.model}</Td>
      <Td>{car.gearbox}</Td>
      <Td>{car.fuel_type}</Td>
      <Td>{car.price} MAD</Td>

      {car.available === 1 ? (
        <Td className="text-success text-center">Oui</Td>
      ) : (
        <Td className="text-danger text-center">Non</Td>
      )}

      <Td>
        <IconButton
          bg={""}
          _hover={{ bg: "blue.400", color: "white" }}
          mr={1}
          aria-label="Edit"
          icon={<EditIcon />}
          onClick={()=>setisOpen(true)}
        />

        <IconButton
          bg={""}
          _hover={{ bg: "red", color: "white" }}
          ml={1}
          aria-label="Delete"
          icon={<DeleteIcon />}
          onClick={()=>deleteCar(car.id)}
        />
      </Td>

      <EditCar isOpen={isOpen} setisOpen={setisOpen} car={car} update={update} />

    </Tr>
  );
};

export default CarItem;
