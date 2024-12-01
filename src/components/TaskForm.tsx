import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import { Task } from '../types';
import { IoAdd } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';

interface TaskFormProps {
  onSubmit: (task: Omit<Task, 'id' | 'createdAt'>) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<Task['status']>('todo');
  const [priority, setPriority] = useState<Task['priority']>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      status,
      priority
    });
    setTitle('');
    setDescription('');
    setStatus('todo');
    setPriority('medium');
    setIsModalOpen(false);
  };

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as Task['status'];
    setStatus(value);
  };

  const handlePriorityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as Task['priority'];
    setPriority(value);
  };

  return (
    <>
      <AddButton onClick={() => setIsModalOpen(true)}>
        <IoAdd /> Add Task
      </AddButton>

      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <CloseButton onClick={() => setIsModalOpen(false)}>
              <IoMdClose />
            </CloseButton>
            <ModalTitle>Add New Task</ModalTitle>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter task title"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="description">Description</Label>
                <TextArea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter task description"
                  required
                />
              </FormGroup>

              <FormRow>
                <FormGroup>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    id="status"
                    value={status}
                    onChange={handleStatusChange}
                  >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    id="priority"
                    value={priority}
                    onChange={handlePriorityChange}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </Select>
                </FormGroup>
              </FormRow>

              <ButtonGroup>
                <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Add Task
                </Button>
              </ButtonGroup>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

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
  animation: fadeIn 0.2s ease;
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

const ModalTitle = styled.h2`
  margin: 0 0 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
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

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const AddButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--primary-hover);
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

const Label = styled.label`
  font-weight: 500;
  font-size: 0.9rem;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
  display: block;
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
