import ai from "../configs/gemini.config.js";



const askAi=async (prompt)=>{
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: prompt,
      });
      if (response) {
        console.log(response.candidates[0].content.parts[0].text);
        return response.candidates[0].content.parts[0].text;
      }else{
        return null;
      }
};

export default askAi;