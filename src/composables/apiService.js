import {toRefs, ref, reactive} from 'vue';

const API_BASE_URL = 'http://localhost:8100'

export function fetchDevices(){
    const deviceData = ref(null);
    const state = reactive ({
        error: null,
        loading: false
    });

    const fetchData = () => {
        state.loading = true;
        fetch(`${API_BASE_URL}/equipment`).then(response=>{
            if(response.status !== 200){
                state.error = `${response.status} ${response.statusText}`;
            } else {
                response.json().then((json)=>
                deviceData.value = json
               );
            }
          
        }).catch(error=> {
            console.log(error)
            state.error = error;
        }).finally(()=>{
            state.loading = false;
        })
    }
     fetchData();

    return {deviceData, ...toRefs(state)};
}