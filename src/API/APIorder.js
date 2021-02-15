import axios from 'configs/axios';

const APIorder = {
    all: (options = { params: {}}) => axios.get(`/orders`, options)
}
export default APIorder;