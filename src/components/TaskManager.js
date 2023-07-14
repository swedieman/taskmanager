import React, { useState, useEffect } from 'react';
import { Button, Icon, Dropdown } from 'semantic-ui-react';
import CreateTaskModal from './CreateTaskModal.js';
import EditTaskModal from './EditTaskModal.js';
import DeleteTaskModal from './DeleteTaskModal.js';
import { getTasks, createTask, updateTask, deleteTask } from '../utils/taskApi.js';
import { uniqueArray } from '../utils/misc.js';
import './TaskManager.css';

const TaskManager = () => {
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState(null);
  const [sortDir, setSortDir] = useState('desc');
  const [filterCategory, setFilterCategory] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [filterCatOpts, setFilterCatOpts] = useState(null);

  const reloadTasks = async () => {
    const latestTasks = await getTasks(filterCategory, sortBy, sortBy ? sortDir : null);

    if (filterCategory === null) {
      // Get categories from the loaded tasks, but only set available categories when a category filter is not in use.
      const uniqueCategories = uniqueArray(latestTasks.map(task => task.category));
      const uniqueCatOpts = uniqueCategories.map(cat => ({ text: cat, value: cat }));
      setFilterCatOpts(uniqueCatOpts);
    }

    setTasks(latestTasks);
  };

  useEffect(() => {
    reloadTasks();
  }, [sortBy, sortDir, filterCategory]);

  const removeTask = async () => {
    await deleteTask(taskToDelete.id);
    await reloadTasks();
  };

  const saveTask = async (data) => {
    await updateTask(data);
    setFilterCategory(null);
    await reloadTasks();
  };

  const createNewTask = async (data) => {
    await createTask(data);
    setFilterCategory(null);
    await reloadTasks();
  };

  const getSortArrow = (sortVar) => {
    if (sortBy !== sortVar) {
      return '';
    }

    return sortDir === 'desc' ? <Icon name="arrow down" /> : <Icon name="arrow up" />;
  };

  const setSorting = (sortVar) => {
    if (sortBy === sortVar) {
      setSortDir('asc');
      sortDir === 'desc' ? setSortDir('asc') : setSortDir('desc');
    } else {
      setSortBy(sortVar);
      setSortDir('desc');
    }
  };

  return (
    <>
      <DeleteTaskModal
        open={taskToDelete !== null}
        onClose={() => setTaskToDelete(null)}
        onDelete={removeTask}
        taskName={taskToDelete && taskToDelete.name}
      />
      <EditTaskModal
        open={taskToEdit !== null}
        onClose={() => setTaskToEdit(null)}
        onSave={saveTask}
        task={taskToEdit}
        existingCatOpts={filterCatOpts}
      />
      <CreateTaskModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreate={createNewTask}
        existingCatOpts={filterCatOpts}
      />
      <div className="topButtons">
        <Button onClick={() => setCreateModalOpen(true)}>
          <Icon name="add" /><span className="addBtnText">Create Task</span>
        </Button>
        <Dropdown
          placeholder="Filter by Category"
          clearable
          search
          selection
          options={filterCatOpts}
          value={filterCategory}
          onChange={(_, { value }) => setFilterCategory(value)}
        />
      </div>
      <div className="TaskManager">
        <div className="task taskHeader">
          <div className="status" onClick={() => setSorting('status')}>
            Status&nbsp;{getSortArrow('status')}
          </div>
          <div className="name" onClick={() => setSorting('name')}>
            Name&nbsp;{getSortArrow('name')}
          </div>
          <div className="category" onClick={() => setSorting('category')}>
            Category&nbsp;{getSortArrow('category')}
          </div>
          <div className="dueDateTitle" onClick={() => setSorting('dueDate')}>
            Due Date&nbsp;{getSortArrow('dueDate')}
          </div>
        </div>
        {tasks
          ? (
            tasks.map((task, i) => (
              <div className="task" key={i}>
                <div className="status">{task.status}</div>
                <div className="name">{task.name}</div>
                <div className="category">{task.category}</div>
                <div>{task.dueDate}</div>
                <div className="btnContainer">
                  <Button icon="edit" onClick={() => setTaskToEdit(task)} title="Edit Task" />
                  <Button icon="trash" onClick={() => setTaskToDelete(task)} title="Delete Task" />
                </div>
              </div>
            ))
          )
          : 'Loading tasks...'
        }
      </div>
    </>
  );
};

export default TaskManager;
