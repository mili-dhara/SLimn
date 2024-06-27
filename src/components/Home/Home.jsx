import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

// Define the query function
async function query(data) {
    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/Melonie/text_to_image_finetuned",
            {
                headers: {
                    Authorization: "Bearer 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",
                    'Content-Type': 'application/json' // Ensure the Content-Type header is set
                },
                method: "POST",
                body: JSON.stringify(data), // Ensure the body format is correct
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API request failed with status ${response.status}: ${errorData.error || errorData.message}`);
        }

        const result = await response.blob();
        return result;
    } catch (error) {
        console.error('Error querying API:', error);
        throw error;
    }
}

export default function Home() {
    const { isAuthenticated } = useAuth0();
    const [prompt, setPrompt] = useState('');
    const [output, setOutput] = useState(null);
    const [listening, setListening] = useState(false);
    const [error, setError] = useState(null);
    const prePrompt = "by use pen pencil, no color, full, sketch, edges of object or outline ";

    // Speech recognition setup
    const recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const speechRecognition = recognition ? new recognition() : null;

    useEffect(() => {
        if (speechRecognition) {
            speechRecognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setPrompt(transcript);
            };
            speechRecognition.onend = () => setListening(false);
        }
    }, [speechRecognition]);

    // Function to process the input prompt and fetch the image
    const processPrompt = async () => {
        if (prompt.trim() === '') {
            setError('Prompt cannot be empty.');
            return;
        }

        try {
            setError(null);
            const combinedPrompt = prePrompt + prompt;
            const response = await query({ inputs: combinedPrompt });
            const imageURL = URL.createObjectURL(response);
            setOutput(imageURL);
        } catch (error) {
            console.error('Process Prompt Error:', error);
            setOutput(null);
            setError('An error occurred while processing your request. Please check the console for details.');
        }
    };

    const startListening = () => {
        if (speechRecognition && !listening) {
            setListening(true);
            speechRecognition.start();
        }
    };

    return (
        <>
            {isAuthenticated ? (
                <div className="app min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 p-6">
                    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
                        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                            Break the Imagination Power of Your Mind
                        </h1>

                        <div className="input-container flex flex-col items-center mb-6">
                            <input
                                className="w-full h-10 p-4 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your prompt here..."
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                            />
                            <div className="flex space-x-4 mt-4">
                                <button
                                    className="bg-black text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-800 transition duration-200"
                                    onClick={processPrompt}
                                >
                                    Process
                                </button>
                                <button
                                    className={`px-4 py-2 rounded-md shadow-md transition duration-200 ${
                                        listening ? 'bg-red-500 text-white' : 'bg-black text-white'
                                    }`}
                                    onClick={startListening}
                                >
                                    {listening ? 'Listening...' : 'Speak'}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="error-container mt-4 text-red-500">
                                <p>{error}</p>
                            </div>
                        )}

                        {output && (
                            <div className="output-container mt-8 bg-gray-100 p-4 rounded-md shadow-md">
                                <h2 className="text-xl font-semibold mb-4 text-center text-gray-700"></h2>
                                <div className="output flex justify-center">
                                    {typeof output === 'string' && output.startsWith('blob:') ? (
                                        <img src={output} alt="Generated Output" className="max-w-full h-auto rounded-md" />
                                    ) : (
                                        <p>{output}</p>
                                    )}
                                </div>
                                {typeof output === 'string' && output.startsWith('blob:') && (
                                    <div className="flex justify-center mt-4">
                                        <a
                                            href={output}
                                            download="output.jpg"
                                            className="bg-black text-white px-4 py-2 rounded-md shadow-md hover:bg-orange-700 transition duration-200"
                                        >
                                            Save Image
                                        </a>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="mx-auto w-full max-w-7xl">
                    <div className="flex flex-col items-center justify-center h-screen p-6">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center text-gray-800">
                            Welcome to Creative Space
                        </h1>
                        <p className="text-lg md:text-xl text-center text-gray-600 max-w-2xl">
                            This platform lets you unleash your creativity by drawing or creating something using voice input. Express yourself freely and bring your ideas to life with our intuitive interface. Whether you're an artist, designer, or someone passionate about creation, Creative Space is the perfect place to let your imagination soar.
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
