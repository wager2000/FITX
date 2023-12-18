// Sample import fra https://rapidapi.com/rphrp1985/api/open-ai21
// Hunsk at indsætte den sample de giver ind i en function som jeg har gjort. Husk også at filføje en return response
import axios from "axios";

export default async function SendMessage(message) {
  const options = {
    method: 'POST',
    url: 'https://open-ai21.p.rapidapi.com/conversationgpt35',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '24def70ed0mshc5c837085f61c19p11d3c9jsn3840ff236127',
      'X-RapidAPI-Host': 'open-ai21.p.rapidapi.com'
    },
    /*data: {
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      web_access: false,
      stream: false,
    }*/
    data: {
      messages: message,
      web_access: false,
      stream: false,
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data.result);
    response = response.data.result
    return response
  } catch (error) {
    console.error(error);
  }
}