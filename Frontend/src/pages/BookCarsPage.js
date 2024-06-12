import { Button, GridItem, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar/Navbar";
import CarCard from "../components/ui/car-card";
import Footer from "../components/navbar/Footer";
import LoadingSpinner from "../components/ui/loading-spinner";
import { useStateContext } from "../context/ContextProvider";


function BookCars() {


  const navigate = useNavigate();

  const [cars, setCars] = useState();
  const [isLoading, setLoading] = useState(true);

  const { token } = useStateContext()

  useEffect(() => {
    const fetchCars = async ()=>{
      const {data} = await axios.get('http://127.0.0.1:8000/api/cars')
      console.log(data.data)
      setLoading(false)
      setCars(data.data)
    }

    fetchCars()
  }, []);

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <VStack>
        <SimpleGrid columns={[1, 1, 2, 2, 3]} rowGap={6} columnGap={8} py={10}>
          {cars.map((car) => {
            return (
              <GridItem key={car.id} colSpan={1}>
                <CarCard props={car} />
              </GridItem>
            );
          })}
        </SimpleGrid>
      </VStack>
      <Footer />
    </>
  );
}

export default BookCars;
