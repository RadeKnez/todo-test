import React from "react";
import { Layout, Container, TaskCard } from "./components";
import { useTaskStore } from "./hooks/useTaskStore";
import { CreateTaskCard } from "./components/CreateTaskCard/CreateTaskCard";

function App() {
  const { tasks } = useTaskStore();

  return (
    <Layout>
      <Container>
        <CreateTaskCard />
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </Container>
    </Layout>
  );
}

export default App;
