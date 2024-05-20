import { useEffect, useState } from "react";

const SECURITY_CODE = 'paradigma';

// eslint-disable-next-line react/prop-types
export const UseState = ({ name }) => {
    const [state, setState] = useState({
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false
    });

    // const [error, setError] = useState(false);
    // const [value, setValue] = useState("");
    // const [loading, setLoading] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            if (state.loading) {
                if (state.value === SECURITY_CODE) {
                    onConfirm();
                    //setError(true);
                } else {
                    onError();
                }
                //setLoading(false);
            }
        }, 1500);
    }, [state.loading]);

    const onConfirm = () => {
        setState({
            ...state,
            error: false,
            loading: false,
            confirmed: true
        })
    }

    const onError = () => {
        setState({
            ...state,
            loading: false,
            error: true
        });
    }

    const onWrite = (payload) => {
        setState({
            ...state,
            value: payload
        })
    }

    const handlerClick = () => {
        setState({
            ...state,
            error: false,
            loading: true
        })
    }

    const handlerDelete = () => {
        setState({
            ...state,
            deleted: true,
            value: '',
        })
    }

    const onReset = () => {
        setState({
            ...state,
            confirmed: false,
            deleted: false,
            value: '',
        })
    }

    if (!state.deleted && !state.confirmed) {
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
                        onChange={(event) => onWrite(event.target.value)}
                    />
                    <button onClick={handlerClick}>
                        Comprobar
                    </button>
                </div>
            )
        )
    } else if (state.confirmed && !state.deleted) {
        return (
            <>
                <div>
                    <p>Confirma, ¿Quieres Eliminar?</p>
                    <button onClick={handlerDelete}>
                        Si, confirmo
                    </button>
                    <button onClick={onReset}>
                        No,me equivoque
                    </button>
                </div>
            </>
        )
    } else {
        return (
            <>
                <p>Estado de Eliminación</p>
                <button onClick={onReset}>
                    Reset funcion
                </button>
            </>
        )
    }

}