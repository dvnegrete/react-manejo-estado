import { useEffect, useState } from "react";

const SECURITY_CODE = 'paradigma';

// eslint-disable-next-line react/prop-types
export const UseState = ({ name }) => {
    const [state, setState] = useState({
        value: '',
        error: false,
        loading: false
    });

    // const [error, setError] = useState(false);
    // const [value, setValue] = useState("");
    // const [loading, setLoading] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            if (state.loading) {
                if (state.value === SECURITY_CODE) {
                    setState({
                        ...state,
                        error: false,
                        loading: false
                    })
                    //setError(true);
                } else{
                    setState({...state, loading: false , error: true});
                }
                //setLoading(false);
            }
        }, 1500);
    }, [state.loading]);

    const handlerClick = () => {
        setState({...state, error: false, loading: true })
        // setError(false);
        // setLoading(true);
    }


    return (
        (
            <div>
                <h2>Eliminar {name}</h2>
                <p>Por favor escribe el código de seguridad</p>
                {
                    state.error && (
                        <p>Error: El codigo es incorrecto</p>
                    )
                }

                {
                    state.loading && (
                        <p>Cargando...</p>
                    )
                }

                <input
                    type="text"
                    placeholder="Código de seguridad"
                    value={state.value}
                    onChange={(event) => {
                        setState({...state, value: event.target.value })
                        //setValue(event.target.value)
                    }}
                />
                <button onClick={handlerClick}>
                    Comprobar
                </button>
            </div>
        )
    )
}