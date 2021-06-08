import { useState, useEffect } from 'react';

// Bu dosya aslinda bir custom hook.
// Daha once withErrorHandler ile yaptigimiz logic'i buraya aldik.
// Buradaki httpClient parametresi aslinda bildigimiz axios.
export default httpClient => {
  const [error, setError] = useState(null);

  const reqInterceptor = httpClient.interceptors.request.use(req => {
    setError(null);
    return req;
  });

  const resInterceptor = httpClient.interceptors.response.use(
    res => res,
    err => {
      setError(err);
    }
  );

  // withErrorHandler hoc ile 1'den fazla component'i wrap edecegiz sonucta. O nedenle her seferinde bu class'in bir instance'i olusturuluyor. O component'ler UnMount oldugunda bu interceptor'larin da temizlenmesi gerekir. Diger turlu memory leak olur, ve ayrica hatalara sebep olabilir.
  // Daha once bu class-based component iken, componentWillUnmount() ile yapmistik bu kismi. useEffect kullanarak componentWillUnmount yapmak icin, useEffect'in bir function return etmesi yeterli. Bu return edilen function bu component icin cleanup fonksiyonu oluyor.
  // Fakat burda dependency olarka [reqInterceptor, resInterceptor] eklemek durumundayiz. Bu durumda bu interceptor'lar degisirse eger, bizim cleanup fonksiyonu da degismis olacak, yani reset olacak.
  useEffect(() => {
    return () => {
      // This is cleanup work just before component unmounts:
      httpClient.interceptors.request.eject(reqInterceptor);
      httpClient.interceptors.response.eject(resInterceptor);
    };
  }, [
    httpClient.interceptors.request,
    httpClient.interceptors.response,
    reqInterceptor,
    resInterceptor
  ]);

  const errorConfirmedHandler = () => {
    setError(null);
  };

  return [error, errorConfirmedHandler];
};
