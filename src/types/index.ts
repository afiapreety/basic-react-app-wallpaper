
export interface Todo {
  id: number;
  text: string;
  done: boolean;
}


export interface ThemeToggleProps {
  dark: boolean;
  onToggle: () => void;
}

export interface TodoStatsProps {
  doneCount: number;
  totalCount: number;
}

export interface TodoInputProps {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
}

export interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onUpdate: (id: number, text: string) => void;
  onDelete: (id: number) => void;
}

export interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onUpdate: (id: number, text: string) => void;
  onDelete: (id: number) => void;
}
