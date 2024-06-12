import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useToast } from "@chakra-ui/react";
import {useStateContext} from "../../context/ContextProvider";



const EditRent = ({ rent, onUpdateRent, showModal, setShowModal, cars }) => {

  const { user } = useStateContext()

 
    const [selectedCar, setSelectedCar] = useState('');
    const [rentalDate, setRentalDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [isFormValid, setIsFormValid] = useState(true);


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


  useEffect(() => {
    setSelectedCar(rent.car_id);
    setRentalDate(rent.rental_date);
    setReturnDate(rent.return_date);
  }, [rent]);


 

  const handleCarChange = (event) => {
    setSelectedCar(event.target.value);
  };

  const handleRentalDateChange = (event) => {
    setRentalDate(event.target.value);
  };

  const handleReturnDateChange = (event) => {
    setReturnDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate form inputs
    if (!selectedCar || !rentalDate || !returnDate) {
      setIsFormValid(false);
      return;
    }

    const start = new Date(rentalDate);
    const end = new Date(returnDate);

    const differenceInMilliseconds = Math.abs(end - start);


    const rentDuration = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));

    if(rentDuration <= 0){
      toastMessage(
          `The number of days must be at least 1`,
          "error",
          "invalid number of days"
      );
      return
    }

     
    const targetCar = cars.filter((c)=> c.id == selectedCar)
    
    const price = rentDuration * targetCar[0].price

  
    // Prepare updated rent object
    const updatedRent = {
      id: rent.id,
      car_id: parseInt(selectedCar),
      rental_date: rentalDate,
      return_date: returnDate,
      user_id : user.id, // that should be dynamic
      price 
    };

    // Call the update rent function from the parent component
    onUpdateRent(updatedRent);

     toastMessage(
          `The rental is done, you are renting for ${rentDuration} days`,
          "success",
          "rent updated"
      ); 

    // Reset form state
    setSelectedCar('');
    setRentalDate('');
    setReturnDate('');
    setIsFormValid(true);

    // Close the modal
    setShowModal(false)

  };

  return (
    <Modal isOpen={showModal} onClose={()=>setShowModal(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modifier Location</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <FormControl id="car" isInvalid={!isFormValid} mb={4}>
              <FormLabel>Voiture</FormLabel>
              <Select onChange={handleCarChange}>
                <option value={selectedCar}>{rent.brand}</option>
                {selectedCar && 
                cars?.filter((car)=> car.id !== selectedCar)
                .map((car) => (
                  <option key={car.id} value={car.id}>
                    {car.brand}
                  </option>
                ))}
              </Select>
              {!isFormValid && <FormErrorMessage>Selectionner une voiture.</FormErrorMessage>}
            </FormControl>

            <FormControl id="rentalDate" isInvalid={!isFormValid} mb={4}>
              <FormLabel>Date de Location</FormLabel>
              <Input type="date" value={rentalDate} onChange={handleRentalDateChange} />
              {!isFormValid && <FormErrorMessage>Entrer une date de location.</FormErrorMessage>}
            </FormControl>

            <FormControl id="returnDate" isInvalid={!isFormValid} mb={4}>
              <FormLabel>Date de Retour</FormLabel>
              <Input type="date" value={returnDate} onChange={handleReturnDateChange} />
              {!isFormValid && <FormErrorMessage>Entrer une Date.</FormErrorMessage>}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button type="submit" mr={3}>
              Modifier
            </Button>
           
            <Button onClick={()=>setShowModal(false)}>Annuler</Button>
            </ModalFooter>
            </form>
            </ModalContent>
            </Modal>
);
};

export default EditRent