import React, { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";

export default function QuestionRound() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({ name: "", drink: "", weed: "", comment: "" });
  const resultRef = useRef();

  const handleNext = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setStep((prev) => prev + 1);
  };

  const generateImage = () => {
    if (resultRef.current) {
      toPng(resultRef.current).then((dataUrl) => {
        saveAs(dataUrl, "room_unlucky_13_receipt.png");
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-r from-blue-400 to-purple-500">
      <header className="text-4xl font-bold mb-6 text-white">Room Unlucky 13</header>
      <div className="w-full max-w-md p-6 bg-white shadow-2xl rounded-2xl">
        {step === 1 && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Enter Your Name</h2>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Name"
              value={answers.name}
              onChange={(e) => setAnswers({ ...answers, name: e.target.value })}
            />
            <button
              className="w-full p-3 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={() => handleNext("name", answers.name)}
            >
              Start
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">What do you prefer?</h2>
            <button className="w-full p-3 my-2 bg-blue-500 text-white rounded-lg" onClick={() => handleNext("drink", "Beer")}>
              Beer
            </button>
            <button className="w-full p-3 my-2 bg-yellow-500 text-white rounded-lg" onClick={() => handleNext("drink", "Whiskey")}>
              Whiskey
            </button>
            <button className="w-full p-3 my-2 bg-green-500 text-white rounded-lg" onClick={() => handleNext("drink", "Both")}>
              Both
            </button>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Do you smoke weed?</h2>
            <button className="w-full p-3 my-2 bg-green-500 text-white rounded-lg" onClick={() => handleNext("weed", "Yes")}>
              Yes
            </button>
            <button className="w-full p-3 my-2 bg-red-500 text-white rounded-lg" onClick={() => handleNext("weed", "No")}>
              No
            </button>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Any additional comments?</h2>
            <input
              type="text"
              className="w-full p-3 border rounded-lg"
              placeholder="Enter your comment"
              value={answers.comment}
              onChange={(e) => setAnswers({ ...answers, comment: e.target.value })}
            />
            <button className="w-full p-3 mt-4 bg-blue-600 text-white rounded-lg" onClick={() => setStep(5)}>
              Submit
            </button>
          </div>
        )}

        {step === 5 && (
          <div ref={resultRef} className="p-6 text-center bg-gray-100 border border-gray-300 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">🎟️ Your Receipt 🎟️</h2>
            <p className="text-lg mb-2"><strong>Name:</strong> {answers.name}</p>
            <p className="text-lg mb-2"><strong>Drink:</strong> {answers.drink}</p>
            <p className="text-lg mb-2"><strong>Weed:</strong> {answers.weed}</p>
            <p className="text-lg mb-2"><strong>Comment:</strong> {answers.comment || "No comment"}</p>
            <p className="text-gray-600 mt-4">Thank you for visiting Room Unlucky 13! 🍻</p>
            <button className="w-full p-3 mt-4 bg-green-600 text-white rounded-lg hover:bg-green-700" onClick={generateImage}>
              Download as Image
            </button>
            <button className="w-full p-3 mt-2 bg-gray-500 text-white rounded-lg" onClick={() => setStep(1)}>
              Restart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
