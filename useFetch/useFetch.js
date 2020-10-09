import  { useState, useEffect, useRef } from 'react';

export const useFetch = (url) => {
// agrego useRef cambio ref por isMounted
    const isMounted = useRef(true)
    const [state, setState] = useState({data: null, loading: true, error: null})
    useEffect(() => {
// no pido hacer nada especial uso el clean
        return () => {
// cuando se desmonta lo paso a false
            isMounted.current = false;
        }
    }, []);
    
    useEffect(() => {
//para que salga loading cada vez que presiona el boton agrego
        setState({data:null, loading: true, error: null})
        
        fetch(url)
        .then(resp => resp.json() )
        .then(data => {
// ahora corro el setState seguro para evitar error!
            if(isMounted) {
                setState({
                    loading: false,
                    error: null,
                    data
                })
            }
        }).catch(() => {
            setState({
                data: null,
                loading: false,
                error: 'no se pudo cargar la info'
            })
        })
    }, [url])

    return state;
}
