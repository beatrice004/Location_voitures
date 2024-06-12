import React, { useState } from 'react';
import { Tr, Td, IconButton,Image } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import EditRent from '../form/EditRent';

const RentItem = ({ rent, cars, update, deleteRent }) => {

    
  const [showModal, setShowModal] = useState(false);

  const handleEditClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  console.log(rent)
  return (
    <Tr key={rent.id}>
      <Td>
        <Image
          className="first"
          objectFit="cover"
          h={"60px"}
          w={"60px"}
          borderRadius="10px"
          src={`http://localhost:8000/images/${rent.photo}`}
        ></Image>
      </Td>
      <Td>{rent.brand}</Td>
      <Td>{rent.model}</Td>
      <Td>{rent.fuel_type}</Td>
      <Td>{rent.price}</Td>
      <Td>{rent.rental_date}</Td>
      <Td>{rent.return_date}</Td>
      <Td>
        <IconButton
          onClick={handleEditClick}
          bg={""}
          _hover={{ bg: "blue.400", color: "white" }}
          mr={1}
          aria-label="Edit"
          icon={<EditIcon />}
        />
      </Td>
      <Td>
        <IconButton
          onClick={() => deleteRent(rent.id)}
          bg={""}
          _hover={{ bg: "red", color: "white" }}
          ml={1}
          aria-label="Delete"
          icon={<DeleteIcon />}
        />
      </Td>
      <EditRent
        showModal={showModal}
        setShowModal={setShowModal}
        rent={rent}
        onUpdateRent={update}
        cars={cars}
        onClose={handleCloseModal}
      />
    </Tr>
  );
};

export default RentItem;
