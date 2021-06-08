import React from 'react';
import { Link } from 'react-router-dom';
import LabelIcon from '@material-ui/icons/Label';

import './DynamicRow.css';

const DynamicRow = props => {
  const {
    routePath,
    id,
    itemKey,
    enValue,
    trValue,
    itemUserId,
    signedInUserId,
    deleteButtonClickedHandler
  } = props;

  const renderAdmin = (routePath, id, itemKey) => {
    return (
      <div className='DynamicRowListItemRightButtons'>
        {/* <button className="ui button primary">Edit</button> */}
        {/* <button className="ui button negative">Delete</button> */}

        {/* <Link to={`${routePath}/edit/${id}`}>
          <i className="large middle aligned icon edit" />
        </Link> */}

        {/* <Link to={`${routePath}/delete/${id}`}>
          <i className="large middle aligned red icon trash" />
        </Link> */}

        <Link
          to={`${routePath}/edit/${id}`}
          className='DynamicRowButtonClickEffect'
        >
          <span
            // onClick={() => console.log(`path: ${routePath}/edit/${id}`)}
            style={{
              border: 'none ',
              background: 'none',
              cursor: 'pointer'
            }}
          >
            {editButtonSvg}
          </span>
        </Link>

        <span
          className='DynamicRowButtonClickEffect'
          onClick={() => deleteButtonClickedHandler(id, itemKey)}
          style={{
            paddingLeft: '8px',
            border: 'none ',
            background: 'none',
            cursor: 'pointer'
          }}
        >
          {deleteButtonSvg}
        </span>
        {/*
        <button onClick={() => deleteButtonClickedHandler(id, itemKey)}>
          <span>{deleteButton}</span>
        </button> */}

        {/* <button
          onClick={() => deleteButtonClickedHandler(id, itemKey)}
          style={{ border: 'none ', background: 'none', cursor: 'pointer' }}
        >
          <span>{deleteButton}</span>
        </button> */}

        {/* <button
          className="ToolbarButton Danger"
          onClick={() => deleteButtonClickedHandler(id, itemKey)}
        >
          Delete
        </button> */}
      </div>
    );
  };

  return (
    <li className='DynamicRowListItem '>
      <div className='DynamicRowListItemLeft'>
        {/* <LabelIcon style={{ marginRight: '10px' }} /> */}

        {/* <Link
          to={`${routePath}/edit/${id}`}
          className="DynamicRowListItemLink DynamicRowButtonClickEffect"
        > */}
        <div className='content'>
          {/* <Link to={`${routePath}/${id}`}>
            <span className="DynamicRowHeader">{itemKey}</span>
          </Link> */}
          <Link to={`${routePath}/edit/${id}`}>
            <span className='DynamicRowHeader'>{itemKey}</span>
          </Link>
          <div className='DynamicRowValue'>
            <span className='DynamicRowTitle'>EN</span>
            {enValue}
          </div>
          <div className='DynamicRowValue'>
            <span className='DynamicRowTitle'>TR</span>
            {trValue}
          </div>
        </div>
        {/* </Link> */}
      </div>

      {itemUserId === signedInUserId
        ? renderAdmin(routePath, id, itemKey)
        : null}
    </li>
  );
};

export default DynamicRow;

const deleteButtonSvg = (
  <svg
    width='20'
    height='20'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M1.5 4.5H22.5'
      stroke='red'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M14.25 1.5H9.75C8.92157 1.5 8.25 2.17157 8.25 3V4.5H15.75V3C15.75 2.17157 15.0784 1.5 14.25 1.5Z'
      stroke='red'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M9.75 17.25V9.75'
      stroke='red'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M14.25 17.25V9.75'
      stroke='red'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M18.865 21.124C18.8005 21.9017 18.1504 22.5001 17.37 22.5H6.631C5.8506 22.5001 5.20051 21.9017 5.136 21.124L3.75 4.5H20.25L18.865 21.124Z'
      stroke='red'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const editButtonSvg = (
  <svg
    width='18'
    height='18'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M22.19 1.81001C21.5021 1.12496 20.569 0.743251 19.5982 0.749824C18.6274 0.756397 17.6995 1.1507 17.021 1.84501L2.521 16.345L0.75 23.25L7.655 21.479L22.155 6.97901C22.8493 6.30047 23.2436 5.37259 23.2502 4.4018C23.2568 3.43102 22.8751 2.49788 22.19 1.81001Z'
      stroke='darkblue'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M16.606 2.26001L21.74 7.39401'
      stroke='darkblue'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M14.512 4.354L19.646 9.488'
      stroke='darkblue'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M2.521 16.345L7.66 21.474'
      stroke='darkblue'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
