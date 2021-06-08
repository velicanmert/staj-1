import React from 'react';

import './YesNoModal.css';

const YesNoModal = React.memo(
  ({ header, onOkayClicked, onCancelClicked, children }) => {
    return (
      <React.Fragment>
        <div className="yes-no-modal-backdrop" onClick={onCancelClicked} />
        <div className="yes-no-modal">
          <h2>{header ? header : 'An Error Occurred!'}</h2>
          <p>{children}</p>
          <div className="yes-no-modal__actions">
            <button
              type="button"
              className="ToolbarButton Danger"
              onClick={onOkayClicked}
            >
              Okay
            </button>
            <button
              type="button"
              className="ToolbarButton Danger"
              onClick={onCancelClicked}
            >
              Cancel
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
);

export default YesNoModal;
