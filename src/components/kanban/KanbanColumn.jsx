import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { cn } from "@/lib/utils";
import { KanbanCard } from "./KanbanCard.jsx";

const KanbanColumn = ({ status, tasks, onDelete, onUpdate }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex flex-col gap-4 p-4 bg-muted/60 rounded-lg min-h-[500px]",
        isOver && "ring-2 ring-primary/20"
      )}
    >
      <SortableContext
        items={tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        {tasks.map((task) => (
          <KanbanCard
            key={task.id}
            task={task}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </SortableContext>
    </div>
  );
};

export { KanbanColumn };
