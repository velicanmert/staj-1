import React, { useState, useEffect } from 'react';

import Modal from '../../components/ui/modal/Modal';
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    // Bu asagidakilerin hepsi http-error-handler.js (custom hook) dosyasina gitti:
    //
    // const [error, setError] = useState(null);
    //
    // const reqInterceptor = axios.interceptors.request.use(req => {
    //   setError(null);
    //   return req;
    // });
    //
    // const resInterceptor = axios.interceptors.response.use(
    //   res => res,
    //   err => {
    //     setError(err);
    //   }
    // );
    //
    // // withErrorHandler hoc ile 1'den fazla component'i wrap edecegiz sonucta. O nedenle her seferinde bu class'in bir instance'i olusturuluyor. O component'ler UnMount oldugunda bu interceptor'larin da temizlenmesi gerekir. Diger turlu memory leak olur, ve ayrica hatalara sebep olabilir.
    // // Daha once bu class-based component iken, componentWillUnmount() ile yapmistik bu kismi. useEffect kullanarak componentWillUnmount yapmak icin, useEffect'in bir function return etmesi yeterli. Bu return edilen function bu component icin cleanup fonksiyonu oluyor.
    // // Fakat burda dependency olarka [reqInterceptor, resInterceptor] eklemek durumundayiz. Bu durumda bu interceptor'lar degisirse eger, bizim cleanup fonksiyonu da degismis olacak, yani reset olacak.
    // useEffect(() => {
    //   return () => {
    //     // This is cleanup work just before component unmounts:
    //     axios.interceptors.request.eject(reqInterceptor);
    //     axios.interceptors.response.eject(resInterceptor);
    //   };
    // }, [reqInterceptor, resInterceptor]);
    //
    // const errorConfirmedHandler = () => {
    //   setError(null);
    // };
    //
    // return (
    //   <>
    //     <Modal show={error} modalClosed={errorConfirmedHandler}>
    //       {error && error.message}
    //     </Modal>
    //     <WrappedComponent {...props} />
    //   </>
    // );

    const [error, clearError] = useHttpErrorHandler(axios);

    return (
      <Aux>
        <Modal show={error} modalClosed={clearError}>
          {error && error.message}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

export default withErrorHandler;
