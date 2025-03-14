import React from "react";
import { useState } from "react";


export default function QuestionRound() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({ drink: "", weed: "", comment: "" });

  const handleNext = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setStep((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
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
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Choices:</h2>
            <p><strong>Drink:</strong> {answers.drink}</p>
            <p><strong>Weed:</strong> {answers.weed}</p>
            <p><strong>Comment:</strong> {answers.comment || "No comment"}</p>
            <button className="w-full p-2 mt-4 bg-gray-500 text-white rounded-lg" onClick={() => setStep(1)}>
              Restart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
