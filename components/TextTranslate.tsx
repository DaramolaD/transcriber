import Image from "next/image";
import React, { useState, useEffect } from "react"
import LoadingDots from "../components/LoadingDots";
import languages from "@/utils/language";
import { Toaster, toast } from "react-hot-toast";


const TextTranslate = () => {
    const [loading, setLoading] = useState(false)
    const [language, setLanguage] = useState<string>(languages[0].value)
    const [generatedTranslation, setGeneratedTranslation] = useState<string>("")
    const [text, setText] = useState<string>("")
    const currentModel = "text-davinci-003"

    const prompt = `Please translate the following text into ${language}. The translation should always be in ${language} and should be grammatically correct. \n\n Original text:\n"${text}"\n\n Please provide your translation below:`

    const translateText = async () => {
        setGeneratedTranslation("")
        setLoading(true)
        const response = await fetch("/api/generate", {
            method: "Post",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                prompt,
                currentModel
            })
        })
        const data = await response.json();

        setGeneratedTranslation(data.data)
        setLoading(false)
    }
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        // const selectedLabel = languages.find(
        //     (language) => language.value === selectedValue
        // )?.value;
        const selectedLabel = languages.find(
            (language) => language.value === selectedValue
        )?.value;
        if (selectedLabel) {
            setLanguage(selectedLabel)
        }
    };

    return (
        <div className="max-w-xl w-full">
            <div className="flex my-10 items-center space-x-3">
                {/* <Image src="/1-black.PNG" width={30} height={30} alt="i icon" className="rounded-full"/> */}
                <div className="w-[30px] h-[30px] rounded-full text-white bg-black flex items-center justify-center">
                    <h2 className="text-xl">1</h2>
                </div>
                <p className="text-left text-lg font-bold underline">
                    To Translate: Enter Your Text
                </p>
            </div>
            <textarea
                className="block p-2.5 my-3 w-full h-[80px] text-sm text-black rounded-lg bg-gray-300 outline-none"
                placeholder="Write your text here."
                onChange={(e) => setText(e.target.value)}>
            </textarea>
            <div className="flex my-5 items-center space-x-3">
                {/* <Image src="/1-black.png" width={30} height={30} alt="i icon" className="rounded-full" /> */}
                <div className="w-[30px] h-[30px] rounded-full text-white bg-black flex items-center justify-center">
                    <h2 className="text-xl">2</h2>
                </div>
                <p className="text-left text-lg font-bold underline">Choose your language.</p>
            </div>
            <div className="flex">
                <select
                    className="p-2 mr-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-block"
                    onChange={handleChange}
                    value={language}
                >
                    {languages.map((language) => (
                        <option key={language.value} value={language.value}>
                            {language.label}
                        </option>
                    ))}

                </select>

                {!loading && (
                    <button
                        className="bg-black rounded-xl text-white font-medium px-4 py-2"
                        onClick={translateText}
                    >
                        Translate &rarr;
                    </button>
                )}
            </div>

            {loading && (
                <button
                    className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8"
                    disabled
                >
                    <LoadingDots color="white" style="large" />
                </button>
            )}
            {generatedTranslation && (
                <>
                    <label
                        className="block my-2 text-md text-left font-medium text-gray-900">
                        Translation:
                    </label>
                    <div className="p-2 5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border"
                        onClick={() => {
                            navigator.clipboard.writeText(generatedTranslation)
                            toast("Translation copied to clipboard", {
                                icon: "✂",
                            })
                        }}>
                        <p>{generatedTranslation}</p>
                    </div>
                    <p className="my-1 text-sm text-gray-500 dark:text-gray-300">
                        Click on translation to copy on clipboard
                    </p>
                </>
            )
            }
        </div >
    )
}

export default TextTranslate;
