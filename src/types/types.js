
// aqui vamos a definir nuestros tipos
export const types = {
    login: '[auth] login',
    logout: '[auth] logout',

    // para majenar los errores y el loagin
    uiSetError: '[UI] Set Error',
    uiRemoveError: '[UI] Remove Error',

    uiStartLoading: '[UI] Start loading',
    uiFinishLoading: '[UI] Finish loading',

    // typos para el crud
    notesAddNew: '[Notes] New notes',
    notesActive: '[Notes] Set active notes',
    notesLoad: '[Notes] Load notes',
    notesAddUpdate: '[Notes] Update note',
    notesFileUrl: '[Notes] Upload image url',
    notesDelete: '[Notes] Delete notes',
// cuando cierren sesion y se limpien todas las notas del usuario
    notesLogoutCleaning: '[Notes] Logout cleaning'

}