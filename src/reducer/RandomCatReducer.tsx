type RandomCatProviderState = {
    loading: boolean,
    text: string,
    fontcolor: string,
    fontsize: string,
    resultURL: string,
} 

type RandomCatAction = 
| { type: "RANDOM_CAT_UPDATE"; payload: string }
| { type: "SET_IS_LOADING"; payload: boolean }

export const RandomCatReducer = (state: RandomCatProviderState, action: RandomCatAction): RandomCatProviderState => {
    if (action.type === "RANDOM_CAT_UPDATE") {
        if (action.payload) {
            return {...state, resultURL: action.payload}
        }
    }
    if (action.type === "SET_IS_LOADING") {
        return {...state, loading: action.payload}
    }
    return state
}