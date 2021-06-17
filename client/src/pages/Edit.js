import React from 'react';
import { editUser } from '../services/Services';

function Edit() {
  const editMethod = () => {
    editUser();
  };

  const handleEditButton = async () => {
    console.log('You have clicked the edit button!');
    this.editMethod();
    await this.delay(1000);
    console.log('edit is done!');
  };

  return (
    <div className='edit'>
      <h1>Edit!</h1>
    </div>
  );
}

export default Edit;
