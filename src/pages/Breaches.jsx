import cx from "clsx";
import { useState, useEffect, useContext } from "react";
import { Table, ScrollArea, Stack, Center, Loader, Alert } from "@mantine/core";
import classes from "./TableScrollArea.module.css";

import { MainContext } from "../contexts/MainContext";
import { fetchBreaches } from "../data/DataBreaches";
import { IconInfoCircle } from "@tabler/icons-react/dist/esm/tabler-icons-react";

export default function Breaches() {
  const { state, setState } = useContext(MainContext);

  useEffect(() => {
    const getData = async () => {
      setState({ ...state, status: "loading" });
      try {
        const data = await fetchBreaches();
        if (!data) {
          throw new Error("API limit exceeded");
        }
        setState({ ...state, data, status: "finished" });
      } catch (error) {
        setState({ ...state, error: error.message, status: "error" });
      }
    };

    getData();
  }, []);

  const [scrolled, setScrolled] = useState(false);

  const rows =
    state.data?.map((row) => (
      <Table.Tr key={row.breachID}>
        <Table.Td>{row.breachID}</Table.Td>
        <Table.Td>{row.breachedDate}</Table.Td>
        <Table.Td>{row.domain}</Table.Td>
        <Table.Td>{row.exposedRecords}</Table.Td>
        <Table.Td>{row.exposureDescription}</Table.Td>
        <Table.Td>{row.industry}</Table.Td>
        <Table.Td>{row.passwordRisk}</Table.Td>
      </Table.Tr>
    )) || [];

  const icon = <IconInfoCircle />;
  return (
    <Center p={"md"}>
      <Stack>
        {state.status === "loading" && (
          <Center w={300} h={100} bg="var(--mantine-color-gray-light)">
            <Loader type="bars" />
          </Center>
        )}
        {state.status === "error" && (
          <Alert variant="light" color="red" title="Not Found" icon={icon}>
            The suggested breach not found please, maybe API limit exceeded.
          </Alert>
        )}
        {state.status === "finished" && (
          <ScrollArea
            h={1000}
            onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
          >
            <Table miw={100}>
              <Table.Thead
                className={cx(classes.header, { [classes.scrolled]: scrolled })}
              >
                <Table.Tr>
                  <Table.Th>Breach ID</Table.Th>
                  <Table.Th>Breached Date</Table.Th>
                  <Table.Th>Domain</Table.Th>
                  <Table.Th>Exposed Records</Table.Th>
                  <Table.Th>Exposure Description</Table.Th>
                  <Table.Th>Industry</Table.Th>
                  <Table.Th>Password Risk</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </ScrollArea>
        )}
      </Stack>
    </Center>
  );
}
