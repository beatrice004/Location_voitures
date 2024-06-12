import { useState } from "react";
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
  Select,
} from "@chakra-ui/react";

function EditCar({ isOpen, setisOpen, car, update }) {


  const [carData, setCarData] = useState(car);

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
    // Perform the necessary logic to update the car using carData
    update(carData);
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
                placeholder="Entrer la marque"
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Modèle</FormLabel>
              <Input
                type="text"
                name="model"
                value={carData.model}
                onChange={handleChange}
                placeholder="Entrer le modèle"
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Type</FormLabel>
              <Select
                name="fuel_type"
                value={carData.fuelType}
                onChange={handleChange}
                placeholder="Selectionner un type"
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
                placeholder="Entrer prix"
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Transmission</FormLabel>
              <Input
                type="text"
                name="gearbox"
                value={carData.gearbox}
                onChange={handleChange}
                placeholder="Entrer la transmission"
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Disponibilité</FormLabel>
              <Select
                name="available"
                value={carData.available}
                onChange={handleChange}
                placeholder="Selectionner la disponibilité"
              >
                <option value={true}>Disponible</option>
                <option value={false}>Non disponible</option>
              </Select>
            </FormControl>

            {/* <FormControl mb={4}>
              <FormLabel>Front Photo</FormLabel>
              <Input
                type="file"
                name="photo1"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "photo1")}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Back Photo</FormLabel>
              <Input
                type="file"
                name="photo2"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "photo2")}
              />
            </FormControl> */}

          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={handleClose}>
              Annuler
            </Button>
            <Button colorScheme="blue" onClick={handleAddCar}>
              Enregistrer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}



export default EditCar;
