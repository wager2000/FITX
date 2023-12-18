// Import af Axios-biblioteket for at foretage HTTP-anmodninger
import axios from "axios";

// En funktion, der sender en besked til OpenAI's GPT-3.5-model gennem RapidAPI
export default async function SendMessage(message) {
  // Indstil de nødvendige indstillinger for Axios-anmodningen
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
    // Sender anmodningen til OpenAI's API og venter på svaret
    const response = await axios.request(options);
    console.log(response.data.result); // Udskriv resultatet til konsollen
    response = response.data.result; // Gem svaret i variablen "response"
    return response; // Returner svaret
  } catch (error) {
    // Håndter eventuelle fejl, der måtte opstå under anmodningen
    console.error(error);
  }
}