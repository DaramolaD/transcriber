import Image from "next/image";
import { useState, useEffect } from "react"
import LoadingDots from "./LoadingDots";
import languages from '@/utils/language'
import { Toaster, toast } from "react-hot-toast"


const AudioTranslate = () => {
    const [loading, setLoading] = useState(false);
    const [language, setLanguage] = useState<string>(languages[0].value);
    const [generatedTranslation, setGeneratedTranslation] = useState<string>("");
    const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);

    const url = "https://api.openai.com/v1/audio/transcriptions"

    const transcribe = async () => {
        const formData = new FormData();
        if (selectedFile) {
            formData.append('file', selectedFile)
        }
        formData.append("model", "whisper-1")
        formData.append("response_type", "verbose_json")
        if (language) {
            formData.append("language", language);
        }
        const headers = new Headers();
        headers.append("Authorization", "Bearer " + `"${process.env.OPENAI_API_KEY}"`);
        return fetch(url, {
            method: "POST",
            body: formData,
            headers: headers,
        })
            .then((response) => response.json())
            .catch((error) => {
                console.error(error);
            })
    }
    console.log("cjeckinh:, ", process.env.OPENAI_API_KEY);
    
    const translateAudio = async () => {
        setGeneratedTranslation('');
        setLoading(true);
        const transcribed = await transcribe()
        setGeneratedTranslation(transcribed.text)
        setLoading(false)

    }
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0]
        if (file) {
            setSelectedFile(file);
        }
    };
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        const selectedLabel = languages.find((language) => language.value === selectedValue)?.value;
        if (selectedLabel) {
            setLanguage(selectedLabel)
        }
    }
    return (
        <div>
            <div className="max-w-xl w-full">
                <div className="flex flex-row mt-10 items-center space-x-3">
                    <Image src="/1-black.PNG" width={50} height={50} alt="1 icon" className="mb-5 sm:mb-0" />
                    <div className="">
                        <p className="text-left font-medium">
                            Upload Your Audio File {""}
                            <span className="text-slate-500"></span>
                        </p>
                    </div>
                </div>
                <label htmlFor="" className="black mb-2 text-sm text-left font-medium text-gray-900 dark:text">
                    Upload file:
                </label>
                <input type="file"
                    className="black mb-2 w-full text-sm text-gray-900 border border-gray-300 rounded-lg"
                    accept="/audio/*"
                    onChange={handleFileChange}
                />
                <p className="my-2 text-sm text-gray-500 dark:text-gray-300">
                    The following file formats are accepted: mp4, mp3, webm, mp4, mpga, wav, and npeg
                </p>
                <div className="flex mb-5 items-center space-x-1">
                    <Image src="/1-black.PNG" width={30} height={30} alt="i icon" />
                    <p className="text-left font-medium">Choose your language.</p>
                </div>
                <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
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
                        className="bg-black rounded-xl text-white fonr-medium px-4 py-2 sm:mt-10 mt-a"
                        onClick={translateAudio}
                    >
                        Traslate &rarr;
                    </button>
                )}
                {loading && (
                    <button
                        className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10"
                        disabled>
                        <LoadingDots color="white" style="large" />
                    </button>
                )}
                {generatedTranslation && (
                    <>
                        <label
                            className="p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg"
                        >
                            Translation:
                        </label>
                        <div
                            className="p-2.5 w-full text-sm text-gray-900 rounded-lg border"
                            onClick={() => {
                                navigator.clipboard.writeText(generatedTranslation);
                                toast("Translation copied to clipboard", {
                                    icon: "✂"
                                    // icon: "U+1F4CB"
                                })
                            }}
                        >
                            <p>{generatedTranslation}</p>
                        </div>
                        <p className="my-1 text-sm text-gray-500 dark:text-gray-300">
                            Click on transition to copy on clipboard
                        </p>
                        <div className="mb-[-80px]" />
                    </>
                )}
            </div>
        </div>
    )
}


export default AudioTranslate