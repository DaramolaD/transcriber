import { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import styles from "@/styles/Home.module.css"
import TextTranslate from "@/components/TextTranslate"
import AudioTranslate from "@/components/AudioTranslate"
import { useState, useEffect } from "react"
import { Toaster, toast } from "react-hot-toast"
import Header from "@/components/Header"


const Home: NextPage = () => {
  const [mode, setMode] = useState<boolean>(true)
  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center min-h-screen">
      <Header />
      <main className="flex max-w-5xl mx-auto flex-col items-center justify-center text-center px-4 mb-[100px] mt-14">
        <h1 className="sm:text-7xl text-4xl max-w-2xl font-bold text-slate-900">
          Let&apos;s Translate
        </h1>

        <p className="sm:text-xl max-w-md text-slate-900 mt-1.5 text-base">
          Break Down Language Barriers with Let&apos;s Translate
        </p>
        <p className="sm:text-xl text-lg max-w-md font-bold text-slate-900 mt-5">
          Your All&ndash;in&ndash;One Translation and Transcription App
        </p>
        <div className="flex mt-5 mb-[-5px] gap-4">
          <button
            className={`px-4 py-2 font-semibold rounded-md ${mode ? "bg-black text-white" : "bg-gray-300 text-black"}`}
            onClick={() => setMode(!mode)}
            >
            Translate Text
          </button>
          <button
            className={`px-4 py-2 font-semibold rounded-md ${!mode ? "bg-black text-white" : "bg-gray-300 tetxt-black"}`}
            onClick={() => setMode(!mode)}>
            Transcribe Audio
          </button>
        </div>
        {mode ? <TextTranslate /> : <AudioTranslate />}
        <Toaster position="top-center" reverseOrder={false} toastOptions={{ duration: 2000 }} />
        <hr className="h-px bg-gray-700 border-1 dask:bg-gray-700" />
      </main>
      <footer className="w-full">
        <p className="border-t-z flex justify-center font-semibold py-2">
          Learn any language with Lets&ndash;Transalate
        </p>
      </footer>
    </div>
  )
}

export default Home
