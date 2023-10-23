import type { NextApiRequest, NextApiResponse } from "next";

import OpenAI from "openai";
import fs from "fs"

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
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
    const { prompt, currentModel, language, file } = req.body;
    try {
        const response = await openai.audio.transcriptions.create({
            model: `${currentModel}`,
            file: fs.createReadStream(`${file}`),
            prompt: `${prompt}`,
            temperature: 0.5,
            language: `${language}`
        });
        res.status(200).json({
            sucess: true,
            data: response.text,
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

