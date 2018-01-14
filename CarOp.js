import axios from 'axios'

const SERVER='https://proiect-web-dianatau.c9users.io'

class CarOp{
    constructor(ee){
        this.emitter=ee
        this.content=[]
        this.selected={}
    }
    getAll(parkingId){
        axios(SERVER + '/parkings/' + parkingId + '/cars')
        .then((response)=>
        {
            this.content=response.data
            this.emitter.emit('CAR LOADING..')
        })
    }
    createOne(parkingId,car){
        
        axios.post(SERVER + '/parkings/'+ parkingId +'/cars', car)
        .then(() => this.getAll(parkingId))
        .catch((error) => console.warn(error))
    }
    saveOne(parkingId,carId,car){
        
        axios.put(SERVER + '/parkings/'+ parkingId + '/cars/' + carId,car)
        .then(() => this.getAll(parkingId))
        .catch((error) => console.warn(error))
    }
    deleteOne(parkingId,carId){
         axios.delete(SERVER + '/parkings/'+ parkingId + '/cars/' + carId)
        .then(() => this.getAll(parkingId))
        .catch((error) => console.warn(error))
    }
}

export default CarOp





