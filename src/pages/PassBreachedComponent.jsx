import { Progress, Text, Group, Badge, Paper } from '@mantine/core';
import classes from './PassBreach.module.css';

export default function PasswordBreachedComponent() {
  return (
    <Paper radius="md" p={'md'} withBorder className={classes.card} mt={20}>
      <Text ta="center" fw={700} className={classes.title}>
        Swimming challenge
      </Text>
      <Text c="dimmed" ta="center" fz="sm">
        32 km / week
      </Text>

      <Group justify="space-between" mt="xs">
        <Text fz="sm" c="dimmed">
          Progress
        </Text>
        <Text fz="sm" c="dimmed">
          62%
        </Text>
      </Group>

      <Progress value={62} mt={5} />

      <Group justify="space-between" mt="md">
        <Text fz="sm">20 / 36 km</Text>
        <Badge size="sm">4 days left</Badge>
      </Group>
    </Paper>
  );
}