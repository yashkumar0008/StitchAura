const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEN_AI);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });


//--------------------------------------------------------

const delay = (ms) => new Promise(res => setTimeout(res, ms));

async function safeGenAi(input, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            return await genAi(input);
        } catch (err) {
            if (err.status === 503 && i < retries - 1) {
                console.log(`Retrying... ${i + 1}`);
                await delay(10000 * (i + 1)); // wait 2s, 4s, 6s
            } else {
                throw err;
            }
        }
    }
}

async function genAi(imgurl)
{
const myprompt = "Read the text on picture and tell all the information in adhaar card and give output STRICTLY in JSON format {aadharno:'', name:'', dob: '', address: '', city: ''}. Dont give output as string."   
    const imageResp = await fetch(imgurl)
        .then((response) => response.arrayBuffer());

    const result = await model.generateContent([
        {
            inlineData: {
                data: Buffer.from(imageResp).toString("base64"),
                mimeType: "image/jpeg",
            },
        },
        myprompt,
    ]);
    console.log(result.response.text())
            
            const cleaned = result.response.text().replace(/```json|```/g, '').trim();
            const jsonData = JSON.parse(cleaned);
            console.log(jsonData);

    return jsonData

}

   module.exports={genAi,safeGenAi} //sending fx by wrapping in object