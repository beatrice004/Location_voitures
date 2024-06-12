import {
  TableContainer,
  Thead,
  Table,
  Tr,
  Th,
  Tbody,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { SearchIcon, UpDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import axiosClient from "../../context/axiosClient";
import LoadingSpinner from "../../components/ui/loading-spinner";
import RentItem from "./RentItem";


const Rents = () => {
  const [rents, setrents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [ascPrice , setAscPrice] = useState(false)
  const [ascReturnDate , setascReturnDate] = useState(false)

  useEffect(() => {
    const fetchrents = async () => {
      const { data } = await axiosClient.get("http://127.0.0.1:8000/api/rents");
      setLoading(false);
      setrents(data);
    };
    fetchrents();
  }, []);

  // Sort the data array in ascending/ descending order by total price
  useEffect(()=>{
       if (ascPrice) {
         const sortedData = [...rents].sort((a, b) => a.total - b.total);
         setrents(sortedData);
       } else {
         const sortedData = [...rents].sort((a, b) => b.total - a.total);
         setrents(sortedData);
       }
  },[ascPrice]) 
  
  // Sort the data array in ascending/ descending order by return date
  useEffect(() => {
    if (ascReturnDate) {
      const sortedData = [...rents].sort(
        (a, b) => new Date(a.return_date) - new Date(b.return_date)
      );
      setrents(sortedData);
    } else {
      const sortedData = [...rents].sort(
        (a, b) => new Date(b.return_date) - new Date(a.return_date)
      );
      setrents(sortedData);
    }
  }, [ascReturnDate]);

  if (loading) return <LoadingSpinner />;

  return (
    <TableContainer p={10}>
      <Flex justify="end" py={2} mb={4}>
        {/* <Button
          colorScheme="blue"
          leftIcon={<ArrowUpIcon />}
          onClick={() => console.log(true)}
        >
          Export Excel
        </Button> */}
        <InputGroup w="300px">
          <Input
            type="text"
            value={search}
            placeholder="Rechercher une location"
            onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
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
            <Th>photo</Th>
            <Th>marque</Th>
            <Th>Prix</Th>
            <Th>Prénom</Th>
            <Th>Téléphone</Th>
            <Th>Date Location</Th>
            <Th>
              Date Retour
              <IconButton
                ml={2}
                aria-label="order_price"
                icon={<UpDownIcon />}
                onClick={() => setascReturnDate(!ascReturnDate)}
              />
            </Th>
            <Th>
              total
              <IconButton
                ml={2}
                aria-label="order_price"
                icon={<UpDownIcon />}
                onClick={() => setAscPrice(!ascPrice)}
              />
            </Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {rents &&
            rents
              .filter(
                (rent) =>
                  rent.brand.toLowerCase().includes(search) ||
                  rent.firstname.toLowerCase().includes(search)
              )
              .map((rent) => (
                <RentItem
                  rent={rent}
                  key={rent.id}
                  rents={rents}
                  setrents={setrents}
                />
              ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default Rents;
