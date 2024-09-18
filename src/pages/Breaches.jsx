import { useContext, useEffect } from "react";
import { MainContext } from "../contexts/MainContext";
import { Center, Loader } from "@mantine/core";

export default function Breaches() {
  const { state, setState } = useContext(MainContext);

  useEffect(() => {
    const getData = async () => {
     
    };

    getData();
  }, []);

  return (
    <Center p={"md"}>
     
      {state.status == "loading" && (
        <Center h={100} bg="var(--mantine-color-gray-light)">
          <Loader type="bars" />
        </Center>
      )}
    </Center>
  );
}
