import { Button, Center, Input, Loader, Stack, Title } from "@mantine/core";
import { useContext, useState } from "react";
import { MainContext } from "../contexts/MainContext";
import PasswordBreachedComponent from "./PassBreachedComponent";
import { fetchData } from "../data/ExposedPassword";

export default function CheckPassHash() {
  const { state, setState } = useContext(MainContext);

  const [pass, setPass] = useState("");

  async function handlePassHash() {
    try {
      setState({ ...state, status: "loading" });
      const data = await fetchData(pass);
      console.log(data)
      setState({ ...state, data, status: "finished" });
    } catch (e) {
      setState({ ...state, status: "error", error: "Breach not Found!" });
      console.log(e);
    }
  }
  return (
    <Center p={"md"}>
      <Stack>
        <Title order={1}>Check Password Breaches</Title>
        <Input.Wrapper
          label="Password Breach"
          description="checking all the password breaches"
        >
          <Input
            onChange={(e) => setPass(e.currentTarget.value)}
            disabled={state.status == "loading" ? true : false}
            value={pass}
            variant="filled"
            size="xl"
            radius="md"
            placeholder="Enter Password"
          />
        </Input.Wrapper>

        <Button
          variant="filled"
          onClick={handlePassHash}
          color="violet"
          size="md"
          radius="md"
        >
          Search
        </Button>
        {state.status == "loading" && (
          <Center h={100} bg="var(--mantine-color-gray-light)">
            <Loader type="bars" />
          </Center>
        )}
        <PasswordBreachedComponent />
      </Stack>
    </Center>
  );
}
