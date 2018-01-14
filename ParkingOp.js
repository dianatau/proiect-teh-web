import axios from 'axios'

const SERVER='https://proiect-web-dianatau.c9users.io'

class ParkingOp{
    constructor(ee){
        this.emitter=ee
        this.content=[]
        this.selected={}
    }
    getAll(){
        axios(SERVER + '/parkings')
        .then((response)=>
        {
            this.content=response.data
            this.emitter.emit('PARKING LIST LOADING..')
        })
    }
    getOne(id){
          axios(SERVER + '/parkings/' + id)
        .then((response) =>{
            this.selected=response.data
            this.emitter.emit('Get_single_parking')
        })
       
    }
    
     createOne(parking){
        
        axios.post(SERVER + '/parkings/',parking)
        .then((response) => {
            this.content=response.data
            this.emitter.emit("PARKING LOADING")
        })
        .then(() => this.getAll())
        .catch((error) => console.warn(error))
    }
    addOne(parking){
        axios({
            method :'post',
            url: SERVER + '/parkings',
            headers: {'Content-Type' : 'application/json'},
            data: parking
        })
        .then(() => this.getAll())
        .catch((error) => console.warn(error))
    }
   
    saveOne(id,parking){
        
        axios.put(SERVER + '/parkings/' + id,parking)
        .then(() => this.getAll())
        .catch((error) => console.warn(error))
    }
    deleteOne(id){
        axios.delete(SERVER + '/parkings/' + id)
        .then(() => this.getAll())
        .catch((error) => console.warn(error))
    }
}

export default ParkingOp





