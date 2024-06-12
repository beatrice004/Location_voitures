import {
  Button,
  Heading,
  HStack,
  Image,
  Text,
  Box,
  Divider,
  SimpleGrid,
  GridItem,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const CarCard = ({ props }) => {
  const navigate = useNavigate();
  // console.log(props)
  return (
    <div className="vehicle-card">
      <div className="details">
        <div className="thumb-gallery">
          <Box bg="gray.400" w="full" h="full">
            <Image
              className="first"
              objectFit="cover"
              h={"215px"}
              w={"full"}
              src={`http://localhost:8000/images/${props.photo2}`}
            ></Image>
            <Image
              className="second"
              objectFit="cover"
              h={"215px"}
              w={"full"}
              src={`http://localhost:8000/images/${props.photo1}`}
            ></Image>
          </Box>
        </div>

        <Box p={4}>
          <HStack alignItems="baseline" spacing={"auto"}>
            <Heading size={"md"} fontWeight="600">
              {props.brand}
            </Heading>
            <Heading size={"sm"} fontWeight="600">
              {props.model}
            </Heading>
          </HStack>
          <HStack py={3}>
            <Heading size={"md"} fontWeight="600" color="gray.600">
              {props.price} MAD
            </Heading>
            <Text color="gray.400">/jour</Text>
          </HStack>
          <Button w="full" onClick={() => navigate(`/cars/${props.id}`)}>
            Louer Maintenant
          </Button>
          <Divider borderColor="gray.300" py={3} />

          <SimpleGrid columns={3} py={4} textAlign="center">
            <GridItem>
              <Heading fontWeight="400" color="gray.400" size="xs">
                Transmission
              </Heading>
              <Text fontWeight="500" color="gray.600">
                {props.gearbox}
              </Text>
            </GridItem>
            <GridItem>
              <Heading fontWeight="400" color="gray.400" size="xs">
                Type
              </Heading>
              <Text fontWeight="500" color="gray.600">
                {props.fuel_type}
              </Text>
            </GridItem>
            <GridItem>
              <Heading fontWeight="400" color="gray.400" size="xs">
                Disponible
              </Heading>
              <Text fontWeight="500" color="gray.600">
                {props.available ? "Oui" : "Non"}
              </Text>
            </GridItem>
          </SimpleGrid>

          <Divider borderColor="gray.300" py={0} />
        </Box>
      </div>
    </div>
  );
};

export default CarCard;

CarCard.defaultProps = {
  img1: "",
  img2: "",
  brand: "Default brand",
  model: "0000",
  price: "000",
  gearbox: "---",
  type: "---",
  available: "---",
};
