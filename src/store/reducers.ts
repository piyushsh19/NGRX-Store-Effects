const _reducer = createReducer(
    initialState,
    on(nameOfAction, (state, action) => {
        return {
            ...state,
            someState: action.anyState
        }
    })
)