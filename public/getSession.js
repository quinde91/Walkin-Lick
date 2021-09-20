let stage = 'dev'
const host = stage === 'dev' ? 'http://localhost:5000' : 'http://www.walkinglickco.com'

const localStorageSession = localStorage.getItem('sessionId')

if(!localStorageSession){
    window.location.replace(host)
}

async function getSession() {
    const response = await axios.get(`${host}/checkout/session/${localStorageSession}`)

    if(response.data.success) {
        console.log("clearing localstortage")
        localStorage.clear()
    }else {
        window.location.replace(host) 
    }
}

getSession()