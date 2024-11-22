import React, { useState } from "react";
import { Layout, Container, TaskCard } from "./components";
import { useTaskStore } from "./hooks/useTaskStore";
import { CreateTaskCard } from "./components/CreateTaskCard/CreateTaskCard";
import { FilterCard } from "./components/FilterCard/FilterCard";

function App() {
  const [filterComplete, setfilterComplete] = useState(false);
  const { tasks } = useTaskStore();

  return (
    <Layout>
      <Container>
        <FilterCard
          filterCompleted={filterComplete}
          setFilterCompleted={setfilterComplete}
        />
        <CreateTaskCard />
        {tasks
          .filter((task) => {
            if (filterComplete) return !task.completed;
            return true;
          })
          .map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
      </Container>
    </Layout>
  );
}

export default App;
