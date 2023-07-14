import React from 'react';
import { Modal } from 'semantic-ui-react';

const DeleteTaskModal = ({ open, onClose, onDelete, taskName }) => (
  <Modal
    closeIcon
    open={open}
    header='Delete Task?'
    content={`Do you really want to delete the task "${taskName}"?`}
    actions={[{ key: 'delete', content: 'Delete', positive: true }]}
    onClose={onClose}
    onActionClick={onDelete}
  />
);

export default DeleteTaskModal;
