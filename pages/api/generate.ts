import type { NextApiRequest, NextApiResponse } from "next";
// import { Configuration, OpenAIApi } from "openai";

import OpenAI from "openai";

// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY
// });
// const openai = new OpenAIApi(configuration)

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
    // dangerouslyAllowBrowser: true
});

type Data = {
    prompt?: string;
    sucess?: boolean,
    data?: string;
    error?: unknown;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { prompt, currentModel } = req.body;
    try {
        // const response = await openai.createCompletion({
        const response = await openai.completions.create({
            model: `${currentModel}`,
            prompt: `${prompt}`,
            max_tokens: 1000,
            temperature: 0.5
        });
        res.status(200).json({
            sucess: true,
            data: response.choices[0].text,
        });
    } catch (error) {
        if (error) {
            console.log(error)
        }
        res.status(400).json({
            sucess: false,
            error: "Failed to Translate"
        })
    }
}
