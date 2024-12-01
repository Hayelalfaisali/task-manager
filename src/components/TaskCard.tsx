import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { Task } from '../types';
import { FaTrash, FaEdit, FaClock } from 'react-icons/fa';

interface TaskCardProps {
  task: Task;
  index: number;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const Card = styled.div<{ isDragging: boolean }>`
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: ${props => 
    props.isDragging
      ? '0 8px 16px rgba(0, 0, 0, 0.1)'
      : '0 2px 4px rgba(0, 0, 0, 0.05)'};
  transition: all 0.2s ease;
  border: 2px solid transparent;
  
  &:hover {
    border-color: #e2e8f0;
    transform: translateY(-2px);
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  flex: 1;
`;

const Description = styled.p`
  margin: 0 0 12px 0;
  color: #64748b;
  font-size: 0.875rem;
  line-height: 1.5;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MetaData = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const Priority = styled.span<{ priority: string }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: ${({ priority }) => {
    switch (priority) {
      case 'high':
        return '#fee2e2';
      case 'medium':
        return '#fef3c7';
      default:
        return '#dcfce7';
    }
  }};
  color: ${({ priority }) => {
    switch (priority) {
      case 'high':
        return '#991b1b';
      case 'medium':
        return '#92400e';
      default:
        return '#166534';
    }
  }};
`;

const TimeStamp = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #94a3b8;
  font-size: 0.75rem;
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #64748b;
  transition: all 0.2s ease;
  border-radius: 4px;
  
  &:hover {
    color: #1e293b;
    background: #f1f5f9;
  }
`;

export const TaskCard = ({ task, index, onDelete, onEdit }: TaskCardProps) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Header>
            <Title>{task.title}</Title>
          </Header>
          <Description>{task.description}</Description>
          <Footer>
            <MetaData>
              <Priority priority={task.priority}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </Priority>
              <TimeStamp>
                <FaClock size={12} />
                {formatDate(task.createdAt)}
              </TimeStamp>
            </MetaData>
            <Actions>
              <IconButton onClick={() => onEdit(task)} title="Edit task">
                <FaEdit />
              </IconButton>
              <IconButton onClick={() => onDelete(task.id)} title="Delete task">
                <FaTrash />
              </IconButton>
            </Actions>
          </Footer>
        </Card>
      )}
    </Draggable>
  );
};
