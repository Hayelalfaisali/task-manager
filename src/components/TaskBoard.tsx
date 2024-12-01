import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import { TaskColumn } from './TaskColumn';
import { TaskForm } from './TaskForm';
import { TaskModal } from './TaskModal';
import { Task } from '../types';

const BoardContainer = styled.div`
  height: 100%;
  max-height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const FormSection = styled.div`
  padding: 1.5rem 1.5rem 0;
  background: #f0f2f5;
`;

const BoardSection = styled.div`
  flex: 1;
  overflow-x: auto;
  padding: 1.5rem;
  min-height: 0;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f5f9;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
`;

const Board = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 300px;
  gap: 1.5rem;
  height: 100%;
  
  @media (min-width: 1024px) {
    grid-auto-flow: row;
    grid-auto-columns: unset;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
`;

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Design User Interface',
    description: 'Create wireframes and mockups for the new dashboard layout using Figma',
    status: 'todo',
    priority: 'high',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    title: 'Implement Authentication',
    description: 'Set up JWT authentication with refresh tokens and secure password hashing',
    status: 'in-progress',
    priority: 'high',
    createdAt: new Date('2024-01-16'),
  },
  {
    id: '3',
    title: 'API Documentation',
    description: 'Write comprehensive API documentation using Swagger/OpenAPI specification',
    status: 'todo',
    priority: 'medium',
    createdAt: new Date('2024-01-17'),
  },
  {
    id: '4',
    title: 'Database Optimization',
    description: 'Optimize database queries and add appropriate indexes for better performance',
    status: 'done',
    priority: 'medium',
    createdAt: new Date('2024-01-14'),
  },
  {
    id: '5',
    title: 'Unit Testing',
    description: 'Write unit tests for core business logic components using Jest',
    status: 'in-progress',
    priority: 'medium',
    createdAt: new Date('2024-01-18'),
  },
  {
    id: '6',
    title: 'Mobile Responsiveness',
    description: 'Ensure all pages are fully responsive on mobile devices',
    status: 'todo',
    priority: 'high',
    createdAt: new Date('2024-01-19'),
  },
];

export const TaskBoard = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (newTask: Omit<Task, 'id' | 'createdAt'>) => {
    const task: Task = {
      ...newTask,
      id: uuidv4(),
      createdAt: new Date(),
    };
    setTasks([...tasks, task]);
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const task = tasks.find((t) => t.id === draggableId);
    if (!task) return;

    const newTasks = tasks.filter((t) => t.id !== draggableId);
    const updatedTask = {
      ...task,
      status: destination.droppableId as Task['status'],
    };

    setTasks([...newTasks, updatedTask]);
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleSaveTask = (updatedTask: Task) => {
    setTasks(tasks.map((task) => 
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  const getColumnTasks = (status: Task['status']) => {
    return tasks.filter((task) => task.status === status);
  };

  return (
    <BoardContainer>
      <FormSection>
        <TaskForm onSubmit={handleAddTask} />
      </FormSection>
      <BoardSection>
        <DragDropContext onDragEnd={onDragEnd}>
          <Board>
            <TaskColumn
              id="todo"
              title="To Do"
              tasks={getColumnTasks('todo')}
              onDeleteTask={handleDeleteTask}
              onEditTask={handleEditTask}
            />
            <TaskColumn
              id="in-progress"
              title="In Progress"
              tasks={getColumnTasks('in-progress')}
              onDeleteTask={handleDeleteTask}
              onEditTask={handleEditTask}
            />
            <TaskColumn
              id="done"
              title="Done"
              tasks={getColumnTasks('done')}
              onDeleteTask={handleDeleteTask}
              onEditTask={handleEditTask}
            />
          </Board>
        </DragDropContext>
      </BoardSection>
      <TaskModal
        task={editingTask}
        onClose={() => setEditingTask(null)}
        onSave={handleSaveTask}
      />
    </BoardContainer>
  );
};
