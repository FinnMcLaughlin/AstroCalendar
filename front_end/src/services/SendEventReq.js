const axios = require('axios')

export default async function SendEventReq(LOCALHOST, event_req) {
  console.log("Sending Request")

  try{
    const resp = await axios.post(LOCALHOST + '/reminder', event_req)
    return resp.data
  }
  catch(error){
    return error
  }  
}