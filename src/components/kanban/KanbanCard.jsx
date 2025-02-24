import { useEffect, useRef, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Calendar,
  Check,
  Clock,
  Grip,
  Pencil,
  Tags,
  Trash,
  User,
  X,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { labels, projects, users } from "@/lib/data";

const priorityColors = {
  low: "bg-green-500/10 text-green-500",
  medium: "bg-yellow-500/10 text-yellow-500",
  high: "bg-red-500/10 text-red-500",
};

const priorityOptions = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];

function EditableField({
  initialValue,
  onSave,
  inputComponent = "input",
  placeholder,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const inputRef = (useRef < HTMLInputElement) | (HTMLTextAreaElement > null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    onSave(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === "Escape") {
      setValue(initialValue);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    const InputComponent = inputComponent === "textarea" ? Textarea : Input;
    return (
      <div className="flex items-center gap-1">
        <InputComponent
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          placeholder={placeholder}
          className={cn(inputComponent === "textarea" && "min-h-[80px]")}
        />
        <div className="flex flex-col gap-1">
          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7"
            onClick={handleSave}
          >
            <Check className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7"
            onClick={() => {
              setValue(initialValue);
              setIsEditing(false);
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="group relative cursor-text rounded-md px-3 py-2 hover:bg-muted/50"
      onClick={() => setIsEditing(true)}
    >
      {value || <span className="text-muted-foreground">{placeholder}</span>}
      <Button
        size="icon"
        variant="ghost"
        className="absolute right-2 top-2 h-7 w-7 opacity-0 group-hover:opacity-100"
        onClick={(e) => {
          e.stopPropagation();
          setIsEditing(true);
        }}
      >
        <Pencil className="h-4 w-4" />
      </Button>
    </div>
  );
}

const KanbanCard = ({ task, onDelete, onUpdate }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const project = projects.find((p) => p.id === task.projectId);
  const assignedTo = users.find((u) => u.id === task.assignedToId);
  const creator = users.find((u) => u.id === task.createdById);
  const taskLabels = labels.filter((l) => task.labels.includes(l.id));

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn("relative touch-none", isDragging && "opacity-50")}
    >
      <CardHeader className="p-4 pb-2">
        <div className="flex items-start gap-2">
          <div {...attributes} {...listeners} className="mt-1 cursor-pointer">
            <Grip className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 font-medium">
                <EditableField
                  initialValue={task.title}
                  onSave={(value) => onUpdate(task.id, { title: value })}
                  placeholder="Enter task title..."
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                onClick={() => onDelete(task.id)}
              >
                <Trash className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-2 px-3">
              {project && (
                <Select
                  value={task.projectId}
                  onValueChange={(value) => {
                    onUpdate(task.id, { projectId: value });
                  }}
                >
                  <SelectTrigger className="h-7 w-[130px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
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
              )}
              <Select
                value={task.priority}
                onValueChange={(value) => {
                  onUpdate(task.id, { priority: value });
                }}
              >
                <SelectTrigger className="h-7 w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priorityOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <Badge
                        variant="secondary"
                        className={priorityColors[option.value]}
                      >
                        {option.label}
                      </Badge>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 p-4 pt-2">
        <EditableField
          initialValue={task.description || ""}
          onSave={(value) => onUpdate(task.id, { description: value })}
          inputComponent="textarea"
          placeholder="Add a description..."
        />
        <div className="flex flex-wrap items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-7">
                <Tags className="mr-2 h-3 w-3" />
                Labels
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-2" align="start">
              <div className="space-y-2">
                {labels.map((label) => (
                  <div key={label.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`label-${label.id}`}
                      checked={task.labels.includes(label.id)}
                      onCheckedChange={(checked) => {
                        onUpdate(task.id, {
                          labels: checked
                            ? [...task.labels, label.id]
                            : task.labels.filter((id) => id !== label.id),
                        });
                      }}
                    />
                    <label
                      htmlFor={`label-${label.id}`}
                      className="flex-1 cursor-pointer"
                    >
                      <Badge
                        variant="secondary"
                        className="w-fit"
                        style={{
                          backgroundColor: `${label.color}20`,
                          color: label.color,
                        }}
                      >
                        {label.name}
                      </Badge>
                    </label>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          {taskLabels.map((label) => (
            <Badge
              key={label.id}
              variant="secondary"
              className="h-6"
              style={{
                backgroundColor: `${label.color}20`,
                color: label.color,
              }}
            >
              {label.name}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <Select
            value={task.assignedToId || ""}
            onValueChange={(value) => {
              onUpdate(task.id, { assignedToId: value || undefined });
            }}
          >
            <SelectTrigger className="h-8 w-[140px]">
              <SelectValue placeholder="Assign to..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unassigned">Unassigned</SelectItem>
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
          {creator && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-3 w-3" />
              Created by {creator.name}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 text-xs text-muted-foreground">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            Created {formatDistanceToNow(task.createdAt)} ago
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Updated {formatDistanceToNow(task.updatedAt)} ago
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export { KanbanCard };
