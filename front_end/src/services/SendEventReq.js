const axios = require('axios')

export default async function SendEventReq(url, event_req) {
  console.log("Sending Request")

  try{
    const resp = await axios.post(url, event_req)
    return resp.data
  }
  catch(error){
    return error
  }  
}