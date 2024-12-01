import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import { TaskCard } from './TaskCard';
import { Task } from '../types';
import { FaTasks, FaSpinner, FaCheckCircle } from 'react-icons/fa';

interface TaskColumnProps {
  id: string;
  title: string;
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

const Column = styled.div`
  background: #f8fafc;
  border-radius: 12px;
  padding: 1rem;
  height: 100%;
  min-height: 500px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;

  @media (max-width: 1023px) {
    min-height: calc(100vh - 300px);
  }
`;

const ColumnHeader = styled.div`
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e2e8f0;
`;

const ColumnTitle = styled.h2`
  margin: 0;
  font-size: 1.2rem;
  color: #1e293b;
  font-weight: 600;
`;

const TaskCount = styled.span`
  display: inline-block;
  padding: 2px 8px;
  background: #e2e8f0;
  border-radius: 12px;
  font-size: 0.875rem;
  color: #475569;
  margin-left: 8px;
`;

const TaskList = styled.div<{ isDraggingOver: boolean }>`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  transition: background-color 0.2s ease;
  background-color: ${props => props.isDraggingOver ? '#e2e8f0' : 'transparent'};
  padding: 0.5rem;
  border-radius: 8px;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  color: #475569;
  background: white;
  border: 2px dashed #e2e8f0;
  border-radius: 12px;
  margin: 0.5rem;
  min-height: 200px;
  transition: all 0.2s ease;
`;

const EmptyStateIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
  opacity: 0.7;
`;

const EmptyStateMessage = styled.h3`
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0 0 0.5rem;
  color: #1e293b;
`;

const EmptyStateDescription = styled.p`
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.4;
`;

const getEmptyMessage = (columnId: string) => {
  switch (columnId) {
    case 'todo':
      return {
        icon: <FaTasks />,
        message: 'No tasks to do yet',
        description: 'Add a new task to get started'
      };
    case 'in-progress':
      return {
        icon: <FaSpinner />,
        message: 'No tasks in progress',
        description: 'Drag a task here to start working on it'
      };
    case 'done':
      return {
        icon: <FaCheckCircle />,
        message: 'No completed tasks',
        description: 'Complete a task to see it here'
      };
    default:
      return {
        icon: <FaTasks />,
        message: 'No tasks',
        description: 'Add tasks to this column'
      };
  }
};

export const TaskColumn = ({ id, title, tasks, onDeleteTask, onEditTask }: TaskColumnProps) => {
  const emptyState = getEmptyMessage(id);

  return (
    <Column>
      <ColumnHeader>
        <ColumnTitle>
          {title}
          <TaskCount>{tasks.length}</TaskCount>
        </ColumnTitle>
      </ColumnHeader>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
            {...provided.droppableProps}
          >
            {tasks.length === 0 ? (
              <EmptyState>
                <EmptyStateIcon>{emptyState.icon}</EmptyStateIcon>
                <EmptyStateMessage>{emptyState.message}</EmptyStateMessage>
                <EmptyStateDescription>
                  {emptyState.description}
                </EmptyStateDescription>
              </EmptyState>
            ) : (
              tasks.map((task, index) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  index={index}
                  onDelete={onDeleteTask}
                  onEdit={onEditTask}
                />
              ))
            )}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Column>
  );
};
