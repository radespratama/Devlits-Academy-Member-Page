import axios from 'configs/axios';

const APImedia = {
    upload: (image) => axios.post(`/media`, { image }),
}

export default APImedia