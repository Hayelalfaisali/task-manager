import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Task } from '../types';
import { FaTimes } from 'react-icons/fa';

interface TaskModalProps {
  task: Task | null;
  onClose: () => void;
  onSave: (task: Task) => void;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  max-width: 600px;
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  animation: slideIn 0.3s ease;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  background: var(--bg-secondary);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  padding: 0.5rem;
  color: var(--text-secondary);
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--border-color);
    color: var(--text-primary);
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }

  svg {
    width: 1.25em;
    height: 1.25em;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 0.9rem;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 2px solid var(--border-color);
  border-radius: 10px;
  font-size: 0.95rem;
  width: 100%;
  background: white;
  color: var(--text-primary);
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #cbd5e1;
  }
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem 1rem;
  border: 2px solid var(--border-color);
  border-radius: 10px;
  font-size: 0.95rem;
  width: 100%;
  min-height: 120px;
  resize: vertical;
  background: white;
  color: var(--text-primary);
  font-family: inherit;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #cbd5e1;
  }
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

const Select = styled.select`
  padding: 0.75rem 1rem;
  border: 2px solid var(--border-color);
  border-radius: 10px;
  font-size: 0.95rem;
  width: 100%;
  background: white;
  color: var(--text-primary);
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #cbd5e1;
  }
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${({ variant }) =>
    variant === 'primary'
      ? `
    background: var(--primary-color);
    color: white;
    border: none;
    
    &:hover {
      background: var(--primary-hover);
      transform: translateY(-1px);
    }
    
    &:active {
      transform: translateY(0);
    }
  `
      : `
    background: white;
    color: var(--text-secondary);
    border: 2px solid var(--border-color);
    
    &:hover {
      background: var(--bg-secondary);
      color: var(--text-primary);
      transform: translateY(-1px);
    }
    
    &:active {
      transform: translateY(0);
    }
  `}
`;

export const TaskModal = ({ task, onClose, onSave }: TaskModalProps) => {
  const [formData, setFormData] = useState<Task | null>(null);

  useEffect(() => {
    if (task) {
      setFormData(task);
    }
  }, [task]);

  if (!task || !formData) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      onSave(formData);
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <FaTimes />
        </CloseButton>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="title">Task Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label htmlFor="description">Description</Label>
            <TextArea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label htmlFor="status">Status</Label>
            <Select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as Task['status'] })}
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </Select>
          </InputGroup>

          <InputGroup>
            <Label htmlFor="priority">Priority</Label>
            <Select
              id="priority"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value as Task['priority'] })}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Select>
          </InputGroup>

          <ButtonGroup>
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </ButtonGroup>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};
