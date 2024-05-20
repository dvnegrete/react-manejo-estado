import { useEffect, useReducer } from "react";

const SECURITY_CODE = 'paradigma';

const initialState = {
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false
};

const actionTypes = {
    CONFIRM: "CONFIRM",
    ERROR: "ERROR",
    WRITE: "WRITE",
    CHECK: "CHECK",
    DELETE: "DELETE",
    RESET: "RESET",
};

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.CONFIRM:
            return {
                ...state,
                error: false,
                loading: false,
                confirmed: true
            }
        case actionTypes.ERROR:
            return {
                ...state,
                error: true,
                loading: false
            }
        case actionTypes.WRITE:
            return {
                ...state,
                error: false,
                value: action.payload
            }
        case actionTypes.CHECK:
            return {
                ...state,
                loading: true
            }
        case actionTypes.DELETE:
            return {
                ...state,
                deleted: true,
                value: '',
            }
        case actionTypes.RESET:
            return {
                ...state,
                confirmed: false,
                deleted: false,
                value: '',
            }
        default:
            return {
                ...state
            }
    }
}


// eslint-disable-next-line react/prop-types
export const UseReducer = ({ name }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const onConfirm = () => dispatch({ type: actionTypes.CONFIRM });
    const onError = () => dispatch({ type: actionTypes.ERROR });
    const onCheck = () => dispatch({ type: actionTypes.CHECK });
    const onDelete = () => dispatch({ type: actionTypes.DELETE });
    const onReset = () => dispatch({ type: actionTypes.RESET });

    const onWrite = ({ target: { value } }) => {
        dispatch({ type: actionTypes.WRITE, payload: value })
    };

    useEffect(() => {
        setTimeout(() => {
            if (state.loading) {
                if (state.value === SECURITY_CODE) {
                    onConfirm();
                } else {
                    onError();
                }
            }
        }, 1500);
    }, [state.loading]);

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
                        onChange={onWrite}
                    />
                    <button onClick={onCheck}>
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
                    <button onClick={onDelete}>
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