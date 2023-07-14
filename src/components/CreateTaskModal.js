import React from 'react';
import TaskModal from './TaskModal.js';

const CreateTaskModal = ({ open, onClose, onCreate, existingCatOpts }) => (
  <TaskModal
    open={open}
    onClose={onClose}
    onSave={onCreate}
    task={{ "name": "", "category": "", "dueDate": Date.now(), "status": "todo" }}
    header="Create New Task"
    saveBtnText="Create"
    existingCatOpts={existingCatOpts}
  />
);

export default CreateTaskModal;
