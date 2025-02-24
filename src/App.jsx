import { KanbanBoard } from "@/components/kanban/KanbanBoard";

const App = () => {
  return (
    <div className="h-screen w-full p-6 md:p-10 bg-muted/40">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Kanban Board</h1>
        <p className="text-muted-foreground">Manage your tasks efficiently</p>
      </div>
      <KanbanBoard />
    </div>
  );
};

export default App;
