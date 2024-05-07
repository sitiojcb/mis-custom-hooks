import { useEffect, useState } from "react";

//video 129 cache
const localCache = {};
export const useFetch = (url) => {
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    hasError: false,
    error: null,
  });
  //el fetch siempre conviene dentro del useEffect
  useEffect(() => {
    const getFetch = async () => {
      if (localCache[url]) {
        console.log("usando el cache");
        setState({
          data: localCache[url],
          isLoading: false,
          hasError: false,
          error: null,
        });
        return;
      }
      //limpia antes de la peticion y vemos cargando...
      setLoadingState();
      const resp = await fetch(url);

      //sleep para probar que esta cargando con isLoading
      await new Promise((resolve) => setTimeout(resolve, 1500));
      //genera asi demora de 1,5 seg sin tener que cambiar conexion slow
      //si la resp falla
      if (!resp.ok) {
        setState({
          data: null,
          isLoading: false,
          hasError: true,
          error: {
            code: resp.status,
            message: resp.statusText,
          },
        });
        return; //lo coloco si hay error asi no ejecuta nada mas
      }

      const data = await resp.json();
      //si no hay error
      setState({
        data: data,
        isLoading: false,
        hasError: false,
        error: null,
      });
      //aca viene el manejo del cache
      localCache[url] = data;
    };

    getFetch(); //lo llama al inicio
  }, [url]);
  //necesito limpiar antes de una nueva peticion
  const setLoadingState = () => {
    setState({
      data: null,
      isLoading: true,
      hasError: false,
      error: null,
    });
  };

  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError,
  };
};
