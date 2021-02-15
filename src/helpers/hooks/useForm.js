import {useState} from 'react';

const useForm = (initialValue) => {
    const [state, setState] = useState(initialValue)

    return [
        state,
        (e) => {
            setState({
                ...state,
                [e.target.name]: e.target.value,
            })
        },
        (newState) => {
            setState({
                ...state,
                ...newState,
            })
        }
    ]
}

export default useForm