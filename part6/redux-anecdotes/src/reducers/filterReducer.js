const reducer = (state='', action) => {
    if (action.type === 'FILTER_CHANGE') {
        return action.data.key
    }

    return state
}

export const filterChange = (key) => {
    return {
        type: 'FILTER_CHANGE',
        data: { key }
    }
}

export default reducer