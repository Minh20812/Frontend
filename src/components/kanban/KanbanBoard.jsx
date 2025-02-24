import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { KanbanColumn } from "./KanbanColumn.jsx";
import { KanbanCard } from "./KanbanCard.jsx";
import { createId } from "@/lib/utils";
import { defaultTasks, projects, users } from "@/lib/data";

const KanbanBoard = () => {
  const [tasks, setTasks] = useState(defaultTasks);
  const [activeTask, setActiveTask] = useState(null);
  const [selectedProject, setSelectedProject] = useState("all");
  const [selectedUser, setSelectedUser] = useState("all");

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const columns = [
    { title: "To Do", status: "todo" },
    { title: "In Progress", status: "in-progress" },
    { title: "Done", status: "done" },
  ];

  const filteredTasks = tasks.filter((task) => {
    if (selectedProject !== "all" && task.projectId !== selectedProject) {
      return false;
    }
    if (
      selectedUser !== "all" &&
      task.assignedToId !== selectedUser &&
      task.createdById !== selectedUser
    ) {
      return false;
    }
    return true;
  });

  function handleDragStart(event) {
    const task = tasks.find((task) => task.id === event.active.id);
    setActiveTask(task || null);
  }

  function handleDragEnd(event) {
    setActiveTask(null);
  }

  function handleDragOver(event) {
    const { active, over } = event;
    if (!over) return;

    const activeTask = tasks.find((task) => task.id === active.id);
    const overTask = tasks.find((task) => task.id === over.id);

    if (!activeTask) return;

    if (overTask) {
      const activeIndex = tasks.findIndex((task) => task.id === active.id);
      const overIndex = tasks.findIndex((task) => task.id === over.id);

      if (activeTask.status !== overTask.status) {
        setTasks((tasks) => {
          const newTasks = [...tasks];
          newTasks[activeIndex].status = overTask.status;
          return arrayMove(newTasks, activeIndex, overIndex);
        });
      } else {
        setTasks((tasks) => arrayMove(tasks, activeIndex, overIndex));
      }
    } else {
      const overStatus = over.id;
      if (activeTask.status !== overStatus) {
        setTasks((tasks) => {
          const newTasks = [...tasks];
          const activeIndex = tasks.findIndex((task) => task.id === active.id);
          newTasks[activeIndex].status = overStatus;
          return newTasks;
        });
      }
    }
  }

  function addTask(status) {
    const newTask = {
      id: createId(),
      title: "New Task",
      description: "Add a description",
      status,
      priority: "medium",
      projectId: selectedProject === "all" ? projects[0].id : selectedProject,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdById: users[0].id, // In a real app, this would be the current user
      labels: [],
    };
    setTasks([...tasks, newTask]);
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function updateTask(id, updates) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, ...updates, updatedAt: new Date() } : task
      )
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Project:</span>
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  <div className="flex items-center gap-2">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: project.color }}
                    />
                    {project.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">User:</span>
          <Select value={selectedUser} onValueChange={setSelectedUser}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              {users.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  <div className="flex items-center gap-2">
                    <img
                      src={user.avatarUrl || "/placeholder.svg"}
                      alt={user.name}
                      className="h-5 w-5 rounded-full"
                    />
                    {user.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <div className="flex gap-4 overflow-x-auto pb-4">
          {columns.map((column) => (
            <div
              key={column.status}
              className="flex flex-col gap-4 min-w-[350px]"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">{column.title}</h2>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => addTask(column.status)}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Add task</span>
                </Button>
              </div>
              <KanbanColumn
                status={column.status}
                tasks={filteredTasks.filter(
                  (task) => task.status === column.status
                )}
                onDelete={deleteTask}
                onUpdate={updateTask}
              />
            </div>
          ))}
        </div>
        <DragOverlay>
          {activeTask && (
            <div className="w-[350px]">
              <KanbanCard
                task={activeTask}
                onDelete={deleteTask}
                onUpdate={updateTask}
              />
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export { KanbanBoard };
