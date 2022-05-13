import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { TaskList } from '../../components/TaskList';

describe('App Page', () => {
  it('should be able to add a task', async () => {
    render(<TaskList />);

    const taskInput = screen.getByPlaceholderText('Adicionar novo todo');
    const addTaskButton = screen.getByTestId('add-task-button');

    fireEvent.change(taskInput, {
      target: {
        value: 'Desafio ReactJS Ignite',
        id: 1,
        isCompleted: false
      }
    });
    fireEvent.click(addTaskButton);

    const addedFirstTaskTitle = screen.getByText('Desafio ReactJS Ignite');

    expect(addedFirstTaskTitle).toHaveTextContent('Desafio ReactJS Ignite');
    expect(addedFirstTaskTitle.parentElement).not.toHaveClass('completed')

    fireEvent.change(taskInput, {
      target: {
        value: 'Beber água'
      }
    });
    fireEvent.click(addTaskButton);

    const addedSecondTaskTitle = screen.getByText('Beber água');

    expect(addedFirstTaskTitle).toBeInTheDocument();
    expect(addedFirstTaskTitle).toHaveTextContent('Desafio ReactJS Ignite');
    expect(addedFirstTaskTitle.parentElement).not.toHaveClass('completed')

    expect(addedSecondTaskTitle).toHaveTextContent('Beber água');
    expect(addedSecondTaskTitle.parentElement).not.toHaveClass('completed')
  })

  it('should not be able to add a task with a empty title', () => {
    render(<TaskList />);

    const taskInput = screen.getByPlaceholderText('Adicionar novo todo');
    const addTaskButton = screen.getByTestId('add-task-button');

    fireEvent.change(taskInput, {
      target: {
        value: 'Desafio ReactJS Ignite'
      }
    });
    
    fireEvent.click(addTaskButton);

    const addedFirstTaskTitle = screen.getByText('Desafio ReactJS Ignite');

    expect(addedFirstTaskTitle).not.toHaveTextContent('');
    expect(screen.queryByTestId('task')).toBeInTheDocument();
  })

  it('should be able to remove a task', async () => {
    render(<TaskList />);

    const taskInput = screen.getByPlaceholderText('Adicionar novo todo');
    const addTaskButton = screen.getByTestId('add-task-button');

    fireEvent.change(taskInput, {
      target: {
        value: 'Desafio ReactJS Ignite'
      }
    });
    fireEvent.click(addTaskButton);

    fireEvent.change(taskInput, {
      target: {
        value: 'Beber água'
      }
    });
    fireEvent.click(addTaskButton);

    const addedFirstTaskTitle = screen.getByText('Desafio ReactJS Ignite');
    const addedSecondTaskTitle = screen.getByText('Beber água');

    expect(addedFirstTaskTitle).toBeInTheDocument()
    expect(addedSecondTaskTitle).toBeInTheDocument();

    const [addedFirstTaskRemoveButton] = screen.getAllByTestId('remove-task-button');

    fireEvent.click(addedFirstTaskRemoveButton);

    expect(addedFirstTaskTitle).not.toBeInTheDocument();
    expect(addedSecondTaskTitle).toBeInTheDocument();
  })

  it('should be able to check a task', () => {
    render(<TaskList />);

    const taskInput = screen.getByPlaceholderText('Adicionar novo todo');
    const addTaskButton = screen.getByTestId('add-task-button');

    fireEvent.change(taskInput, {
      target: {
        value: 'Desafio ReactJS Ignite',
        isCompleted: false
      }
    });
    fireEvent.click(addTaskButton);

    fireEvent.change(taskInput, {
      target: {
        value: 'Beber água',
        isCompleted: false
      }
    });
    fireEvent.click(addTaskButton);

    const [addedFirstTask, addedSecondTask] = screen.getAllByTestId('task');

    if (addedFirstTask.firstChild) {
      fireEvent.click(addedFirstTask.firstChild)
    }

    expect(addedFirstTask).toBeInTheDocument();
    expect(addedFirstTask).toHaveClass('completed');

    expect(addedSecondTask).toBeInTheDocument();
    expect(addedSecondTask).not.toHaveClass('completed');
  })
})
