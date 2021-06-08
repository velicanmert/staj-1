import React from 'react';

const CheckboxList = ({ itemsArr, onItemClicked }) => {
  const onCheck = (event, itemId) => {
    onItemClicked(itemId, event.target.checked);
  };

  return itemsArr.map(({ itemId, itemName, isChecked }) => {
    return (
      <div key={itemId} style={{ marginRight: '20px' }}>
        <input
          type='checkbox'
          id={itemId}
          checked={isChecked}
          name={itemName}
          // value={itemId}
          onChange={e => onCheck(e, itemId)}
        />
        {/* <label for={itemId}>{itemName}</label> */}
        <label style={{ marginLeft: '2px' }}>{itemName}</label>
        <br />
      </div>
    );
  });
};

export default CheckboxList;
