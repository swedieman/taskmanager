import React from 'react';
import TaskModal from './TaskModal.js';

const EditTaskModal = ({ open, onClose, onSave, task, existingCatOpts, saveBtnText = 'Update' }) => {
  if (!task) {
    return null;
  }

  return (
    <TaskModal
      open={open}
      onClose={onClose}
      onSave={onSave}
      task={task}
      header="Edit Task"
      saveBtnText={saveBtnText}
      existingCatOpts={existingCatOpts}
    />
  );
};

export default EditTaskModal;
