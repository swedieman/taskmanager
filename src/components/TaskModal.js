import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { DateTime } from 'luxon';
import { Modal, Form } from 'semantic-ui-react';
import './TaskModal.css';

const statusOptions = [
  { key: 'todo', text: 'Todo', value: 'todo' },
  { key: 'doing', text: 'Doing', value: 'doing' },
  { key: 'done', text: 'Done', value: 'done' },
];

const categoryOptions = [
  { key: 'household', text: 'Household', value: 'Household' },
  { key: 'food', text: 'Food', value: 'Food' },
  { key: 'excercise', text: 'Excercise', value: 'Excercise' },
  { key: 'services', text: 'Services', value: 'Services' },
  { key: 'research', text: 'Research', value: 'Research' },
  { key: 'other', text: 'Other', value: 'Other' },
];

const TaskModal = ({ open, onClose, onSave, task, header, existingCatOpts, saveBtnText = 'Update' }) => {
  const today = new Date(task.dueDate);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [name, setName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [catOpts, setCatOpts] = useState([]);

  useEffect(() => {
    if (!open) {
      return;
    }

    // We need to re-init the state when component is displayed again after the first time since the initial
    // values will only be used when the component is created.
    setSelectedStatus(task.status);
    setName(task.name);
    setSelectedCategory(task.category);
    setDueDate(task.dueDate instanceof Date ? task.dueDate : today);
    setCatOpts(existingCatOpts ? [ ...categoryOptions, ...existingCatOpts] : categoryOptions);
  }, [open]);

  const content = (
    <Form className="taskForm">
      <Form.Group widths="equal">
        <Form.Dropdown
          label="Status"
          placeholder="Status"
          selection
          options={statusOptions}
          value={selectedStatus}
          onChange={(_, { value }) => setSelectedStatus(value)}
        />
        <Form.Input label="Name" value={name} onChange={(_, { value }) => setName(value)} />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Dropdown
          label="Category"
          placeholder="Category"
          allowAdditions
          search
          selection
          options={catOpts}
          value={selectedCategory}
          onChange={(_, { value }) => setSelectedCategory(value)}
          onAddItem={(_, { value }) => setCatOpts([{ text: value, value }, ...catOpts])}
        />
        <Form.Field className="datePickerContainer">
          <label>Due Date</label>
          <DatePicker showIcon selected={dueDate} onChange={(date) => setDueDate(date)} minDate={today} />
        </Form.Field>
      </Form.Group>
    </Form>
  );

  const saveTask = () => {
    const taskToSave = {
      status: selectedStatus,
      name,
      category: selectedCategory,
      dueDate: DateTime.fromJSDate(dueDate).toISODate(),
      id: task.id || -1
    };
    onSave(taskToSave);
  };

  return (
    <Modal
      closeIcon
      open={open}
      header={header}
      content={content}
      actions={[{ key: 'save', content: saveBtnText, positive: true }]}
      onClose={onClose}
      onActionClick={saveTask}
    />
  );
};

export default TaskModal;
