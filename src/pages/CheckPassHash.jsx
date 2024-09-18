import {
  Alert,
  Button,
  Center,
  Input,
  Loader,
  Stack,
  Title,
} from "@mantine/core";
import { useContext, useState } from "react";
import { MainContext } from "../contexts/MainContext";
import { fetchData } from "../data/ExposedPassword";
import { IconInfoCircle } from "@tabler/icons-react/dist/esm/tabler-icons-react";

export default function CheckPassHash() {
  const { state, setState } = useContext(MainContext);
  const icon = <IconInfoCircle />;

  const [pass, setPass] = useState("");

  async function handlePassHash() {
    try {
      setState({ ...state, status: "loading" });
      const data = await fetchData(pass);
      if (data == null) {
        setState({ ...state, status: "error" });
        return;
      }
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
        {state.status == "error" && (
          <Alert variant="light" color="red" title="Not Found" icon={icon}>
            The suggested breach not found please, maybe API limit exceeded.
          </Alert>
        )}
      </Stack>
    </Center>
  );
}
