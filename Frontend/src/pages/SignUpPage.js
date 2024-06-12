import { Center } from "@chakra-ui/react";
import Card from "../components/form/card";
import SubCard from "../components/form/sub-card";
import SignUpForm from "../components/form/signup-form";

function SignUp() {
  return (

      <Center flexGrow={1} p={4}>
        <Card>
          <SubCard
            textHoverColor="text-orange"
            bgColor="bg-secondary"
            route="/login"
            question="Vous avez déjà un compte"
            btnText="Connexion"
          />
          <SignUpForm />
        </Card>
      </Center>

  );
}

export default SignUp;
