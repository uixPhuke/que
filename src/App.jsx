import React, { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";

export default function QuestionRound() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({ drink: "", weed: "", comment: "" });
  const resultRef = useRef();

  const handleNext = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setStep((prev) => prev + 1);
  };

  // Function to generate & download PDF (as an image)
  const generatePDF = () => {
    if (resultRef.current) {
      toPng(resultRef.current).then((dataUrl) => {
        saveAs(dataUrl, "room_unlucky_13.png");
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      {/* HEADER */}
      <header className="text-3xl font-bold mb-6 text-red-600">Room Unlucky 13</header>

      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-2xl">
        {step === 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">What do you prefer?</h2>
            <button className="w-full p-2 my-2 bg-blue-500 text-white rounded-lg" onClick={() => handleNext("drink", "Beer")}>
              Beer
            </button>
            <button className="w-full p-2 my-2 bg-yellow-500 text-white rounded-lg" onClick={() => handleNext("drink", "Whiskey")}>
              Whiskey
            </button>
            <button className="w-full p-2 my-2 bg-green-500 text-white rounded-lg" onClick={() => handleNext("drink", "Both")}>
              Both
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Do you smoke weed?</h2>
            <button className="w-full p-2 my-2 bg-green-500 text-white rounded-lg" onClick={() => handleNext("weed", "Yes")}>
              Yes
            </button>
            <button className="w-full p-2 my-2 bg-red-500 text-white rounded-lg" onClick={() => handleNext("weed", "No")}>
              No
            </button>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Any additional comments?</h2>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              placeholder="Enter your comment"
              value={answers.comment}
              onChange={(e) => setAnswers({ ...answers, comment: e.target.value })}
            />
            <button className="w-full p-2 mt-4 bg-blue-500 text-white rounded-lg" onClick={() => setStep(4)}>
              Submit
            </button>
          </div>
        )}

        {step === 4 && (
          <div ref={resultRef} className="p-4">
            <h2 className="text-xl font-semibold mb-4">Your Choices:</h2>
            <p><strong>Drink:</strong> {answers.drink}</p>
            <p><strong>Weed:</strong> {answers.weed}</p>
            <p><strong>Comment:</strong> {answers.comment || "No comment"}</p>

            {/* PDF Generation Button */}
            <button className="w-full p-2 mt-4 bg-green-500 text-white rounded-lg" onClick={generatePDF}>
              Download as Image
            </button>

            {/* Restart Button */}
            <button className="w-full p-2 mt-2 bg-gray-500 text-white rounded-lg" onClick={() => setStep(1)}>
              Restart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}