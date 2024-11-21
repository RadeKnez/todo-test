import React from "react";
import "./App.css";
import { Layout, Container, TaskCard } from "./components";
import { useTaskStore } from "./hooks/useTaskStore";

function App() {
  const { tasks } = useTaskStore();

  return (
    <Layout>
      <Container>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </Container>
    </Layout>
  );
}

export default App;
