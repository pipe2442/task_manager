export type Task = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  created_at?: string;
  updated_at?: string;
};

export type TaskFormValues = {
  title: string;
  description: string;
};

export type UseTaskFormOptions = {
  onCreate?: (task: Task) => void;
};

export type CreateTaskInput = {
  title: string;
  description: string;
};

export type TaskFormProps = {
  onCreate?: (task: Task) => void;
};
