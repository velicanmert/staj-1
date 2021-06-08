import React from 'react';
import ReactDOM from 'react-dom';
// import history from '../history';

// React Portals diye bir concept var. Modal component'i normal bizim
// component'lerin altinda bir hiyerarsiye koymuyoruz. Onun yerine,
// html tag'in icindeki en yukardaki body tag'inde bizim root element'i
// ile ayni seviyede bir yere koyuyoruz. 'index.html'deki id'si modal
// olan div'e bknz.
//
// NOT: Asagidaki Modal'da kullanici gri renkteki kisma tiklarsa modal
// kapansin (liste sayfasina yonlendirdik burda) istiyoruz. Fakat modal
// icindeki beyaz kisimda bir yere tiklandiginda, event'in parent component'lere
// bubble up yapip modal'in kapanmamasi icin, beyaz kisimdaki div'e de
// onClick icin stopPropagation() metodunu cagiriyoruz. Yani click event'inin
// parent component'lere propagation'inini (bubble up) durduruyoruz.
const Modal = props => {
  return ReactDOM.createPortal(
    <div
      // onClick={() => history.push('/')}
      onClick={props.onDismiss}
      className="ui dimmer modals visible active"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="ui standard modal visible active"
      >
        <div className="header">{props.title}</div>
        <div className="content">{props.content}</div>
        <div className="actions">
          {/* <button className="ui primary button">Delete</button>
          <button className="ui button">Cancel</button> */}
          {props.actions}
        </div>
      </div>
    </div>,
    document.querySelector('#modal')
  );
};

export default Modal;
