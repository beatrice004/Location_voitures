import { Tr, Td, IconButton, Image } from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
import axiosClient from "../../context/axiosClient"




const RentItem = ({ rent }) => {



    const downloadRent = async (id,firstname) => {
      try {
        const { data } = await axiosClient.get(`/rents/${id}/download-rent`, {
          responseType: "blob",
        });
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${firstname}_rent_facture.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (e) {
        console.error(e);
      }
    };



  return (
    <Tr>
      <Td>{rent.id}</Td>
      <Td>
        <Image
          className="first"
          objectFit="cover"
          h={"50px"}
          w={"80px"}
          src={`http://localhost:8000/images/${rent.photo}`}
          loading="lazy"
          borderRadius="10px"
        ></Image>
      </Td>
      <Td>{rent.brand}</Td>
      <Td>{rent.price}</Td>
      <Td>{rent.firstname}</Td>
      <Td>{rent.telephone}</Td>
      <Td>{rent.rental_date}</Td>
      <Td>{rent.return_date}</Td>
      <Td className="text-bold">{rent.total} MAD</Td>

      <Td>
        <IconButton
          bg={""}
          _hover={{ bg: "red", color: "white" }}
          ml={1}
          aria-label="download"
          icon={<DownloadIcon />}
          onClick={() => downloadRent(rent.id,rent.firstname)}
        />
      </Td>
    </Tr>
  );
};

export default RentItem;
