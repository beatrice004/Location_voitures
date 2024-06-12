import { useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Select
} from '@chakra-ui/react';
import axiosClient from "../../context/axiosClient"


function AddCar({isOpen , setisOpen,cars, setcars}) {

    

  const [carData, setCarData] = useState({
    brand: "",
    model: "",
    fuelType: "",
    price: "",
    gearbox: "",
    available: false,
    frontPhoto: null,
    backPhoto: null,
  });


  const handleClose = () => {
    setisOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    setCarData((prevData) => ({ ...prevData, [type]: file }));
  };

  const handleAddCar = async () => {
    // Perform the necessary logic to add the car using carData

    console.log("car:", carData);

    if(!carData){
      console.log('required fields')
      return
    }

    try{
      const { data } = await axiosClient.post(
        "http://127.0.0.1:8000/api/cars",
        carData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data)
      setcars([...cars,data])
    
    }catch(e){
      alert('error happen')
      // console.error(e)

    }

    setisOpen(false);
    
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ajouter une voiture</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Marque</FormLabel>
              <Input
                type="text"
                name="brand"
                value={carData.brand}
                onChange={handleChange}
                placeholder="Entrer Marque"
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Modèle</FormLabel>
              <Input
                type="text"
                name="model"
                value={carData.model}
                onChange={handleChange}
                placeholder="Entrer Modèle"
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Type</FormLabel>
              <Select
                name="fuelType"
                value={carData.fuelType}
                onChange={handleChange}
                placeholder="Selectionner Type"
              >
                <option value="gas">Essence</option>
                <option value="diesel">Diesel</option>
                <option value="electric">Electrique</option>
              </Select>
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Prix</FormLabel>
              <Input
                type="number"
                name="price"
                value={carData.price}
                onChange={handleChange}
                placeholder="Entrer Prix"
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Transmission</FormLabel>
              <Input
                type="text"
                name="gearbox"
                value={carData.gearbox}
                onChange={handleChange}
                placeholder="Entrer Transmission"
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Disponibilité</FormLabel>
              <Select
                name="available"
                value={carData.available}
                onChange={handleChange}
                placeholder="Selectionner une disponibilité"
              >
                <option value={true}>Disponible</option>
                <option value={false}>Non Disponible</option>
              </Select>
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Photo de face</FormLabel>
              <Input
                type="file"
                name="frontPhoto"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "frontPhoto")}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Photo de profil</FormLabel>
              <Input
                type="file"
                name="backPhoto"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "backPhoto")}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={handleClose}>
              Annuler
            </Button>
            <Button colorScheme="blue" onClick={handleAddCar}>
              Enregister 
            </Button>
          </ModalFooter>
           
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddCar;

