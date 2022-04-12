import { types } from "../types/types"

// el error
// el err es el error que estoy recibiendo, seria el payload
export const setError = (err) => ({
    type: types.uiSetError,
    payload: err
})

// remover el error

export const removeError = () => ({
    type: types.uiRemoveError,
})

// vamos a poner un loagin
export const startLoading = () => ({
    type: types.uiStartLoading
})

export const finishLoading = () => ({
    type: types.uiFinishLoading
})
