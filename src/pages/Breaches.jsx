import { useContext, useEffect } from "react";
import { MainContext } from "../contexts/MainContext";
import { Center, Loader } from "@mantine/core";
import { fetchBreaches } from "../data/DataBreaches";
export default function Breaches() {
  const { state, setState } = useContext(MainContext);

  useEffect(() => {
    const getData = async () => {
      setState({ ...state, status: "loading" });
      const data = await fetchBreaches();
      if (!data)
        setState({ ...state, error: "Breaches Not found", status: "error" });
      setState({ ...state, data, status: "finished" });
    };

    getData();
  }, [state, setState]);

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
