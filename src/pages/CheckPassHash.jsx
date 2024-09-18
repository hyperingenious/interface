import { Center, Input, Loader, Stack, Title } from "@mantine/core";
import { useContext } from "react";
import { MainContext } from "../contexts/MainContext";

export default function CheckPassHash() {
  const {state, data, error} = useContext(MainContext)
  return (
    <Center p={"md"}>
      <Stack>
        <Title order={1}>Check Password Breaches</Title>
        <Input.Wrapper
          label="Password Breach"
          description="checking all the password breaches"
        >
          <Input
            variant="filled"
            size="xl"
            radius="md"
            placeholder="Enter Password"
          />
        </Input.Wrapper>
         <Center h={100} bg="var(--mantine-color-gray-light)">
          <Loader type="bars"/>
        </Center>
      </Stack>
    </Center>
  );
}
