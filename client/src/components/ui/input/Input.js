import React from 'react';

import './Input.css';

const input = props => {
  let inputElement = null;
  const { changed, elementType, elementConfig, value } = props;

  const inputClasses = ['InputElement'];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push('Invalid');
  }

  // let validationError = null;
  // if (props.invalid && props.touched) {
  //   validationError = <p>Please enter a valid value!</p>;
  //   // validationError = <p className={ValidationError}>{props.errorMessage}</p>;
  // }

  // NOT: Ornegin bir parent div var, bir de onun icinde child div var. Her ikisinin click event'ine ayni metodu cagiracak sekilde kod ekledik diyelim. Normalde distaki div'e tiklandiginda diyelim ki child olan component'lerin hepsini kapatmak istiyorsun (akordiyon). Fakat tek tek akordiyonlara tikladinda diger akordiyonlari kapatmak ve sadece tiklanan akordiyonu acmak istiyorsun. Akordiyon disinda bir yere (ama parent div icinde) tiklaninca butun akordiyon nesnelerinin kapanmasini istiyorsun. Bu durumlarda child'dan parent'a dogru bubbling oluyormus. Bunu engellemek icin burada sunu ekleyebiliriz (Ama yan etkileri oluyor, onlara bakmak lazim):
  //onClick={event => event.stopPropagation()}

  switch (elementType) {
    case 'input':
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          value={value}
          onChange={changed}
        >
          {elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...elementConfig}
          value={value}
        />
      );
      break;
  }

  // console.log('[Input] props: ', props);

  return (
    <div className={'Input'}>
      {props.label ? <label className="InputLabel">{props.label}</label> : null}
      {inputElement}
      {/* {validationError} */}
    </div>
  );
};

export default input;
