import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardCopy, CheckCircle } from "lucide-react"; // Icons for copy and success

function ApiDocs() {
  const [activeSection, setActiveSection] = useState("sending-request"); // State to track the active section
  const [copied, setCopied] = useState(false); // State to track if the code is copied
  const token = localStorage.getItem("token"); // Check if the user is logged in

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md h-full">
        <nav className="p-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-800">API Documentation</h2>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveSection("sending-request")}
                className={`text-left w-full text-gray-600 hover:text-gray-800 ${
                  activeSection === "sending-request" ? "font-bold" : ""
                }`}
              >
                Sending Request
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("response-explanation")}
                className={`text-left w-full text-gray-600 hover:text-gray-800 ${
                  activeSection === "response-explanation" ? "font-bold" : ""
                }`}
              >
                Response Explanation
              </button>
            </li>
          </ul>
          <div className="mt-8">
            {token ? (
              <Link to="/dashboard">
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                  Back to Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                  Get Started
                </Button>
              </Link>
            )}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">📖 Profanity Image Detector API Documentation</h1>
        <p className="text-gray-600 mb-8 text-center">
          Welcome to the Profanity Image Detector API! This API helps developers detect NSFW and Offensive
          content in images.
        </p>

        {/* Sending Request Section */}
        {activeSection === "sending-request" && (
          <>
            <Card id="authentication" className="mb-6">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">🔑 Authentication</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  To use this API, you must pass your <strong>API Key</strong> in the request headers.
                </p>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                  {`api_key: USER_API_KEY`}
                </pre>
              </CardContent>
            </Card>

            <Card id="api-endpoint" className="mb-6">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">📌 API Endpoint</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Send a POST request to the following URL:</p>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                  {`POST http://44.207.96.137:5000/profanity-detect`}
                </pre>
              </CardContent>
            </Card>

            <Card id="request-example" className="mb-6">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">📥 Request Example</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  The request must be sent in <strong>multipart/form-data</strong> with the image.
                </p>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                  {`{
  "selectedFile": "C:\\path\\to\\image.png"
}`}
                </pre>
              </CardContent>
            </Card>

            {/* New Code Example Card */}
            <Card id="code-example" className="mb-6">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">💻 Code Example</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Here’s an example of how to send a request to the API using JavaScript and Axios:
                </p>
                <div className="relative">
                  <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                    {`const axios = require('axios');
const formData = new FormData();
formData.append('file', selectedFile);

axios.post('http://44.207.96.137:5000/profanity-detect', formData, {
  headers: {
    'api_key': 'YOUR_API_KEY',
    'Content-Type': 'multipart/form-data',
  },
})
  .then(response => {
    console.log('Response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });`}
                  </pre>
                  {/* Copy Button */}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`const axios = require('axios');
const formData = new FormData();
formData.append('file', selectedFile);

axios.post('http://44.207.96.137:5000/profanity-detect', formData, {
  headers: {
    'api_key': 'YOUR_API_KEY',
    'Content-Type': 'multipart/form-data',
  },
})
  .then(response => {
    console.log('Response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });`);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 5000); // Reset after 5 seconds
                    }}
                    className={`absolute top-2 right-2 flex items-center px-3 py-1 rounded-md text-white ${
                      copied ? "bg-green-500" : "bg-blue-500 hover:bg-blue-600"
                    } transition duration-200`}
                  >
                    {copied ? <CheckCircle className="w-4 h-4 mr-1" /> : <ClipboardCopy className="w-4 h-4 mr-1" />}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </CardContent>
            </Card>

            <Card id="response-example" className="mb-6">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">📤 Response Example</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  The API will return a JSON response indicating if the image contains profanity.
                </p>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                  {`"result": {
        "class_index": 1,
        "confidence": 0.9992800354957581,
        "label": "hentai"
    }`}
                </pre>
              </CardContent>
            </Card>

            <Card id="error-handling" className="mb-6">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">⚠️ Error Handling</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  If the request is invalid, the API will return an error response:
                </p>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                  {`{
  "status": "error",
  "message": "Invalid API Key"
}`}
                </pre>
              </CardContent>
            </Card>
          </>
        )}

        {/* Response Explanation Section */}
        {activeSection === "response-explanation" && (
          <>
            <Card id="response-fields" className="mb-6">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">🧠 Understanding the Response Fields</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>
                    <strong>label:</strong> The predicted class (e.g., <code>"drawings"</code>, <code>"hentai"</code>, <code>"neutral"</code>, <code>"porn"</code>, <code>"sexy"</code>).
                  </li>
                  <li>
                    <strong>confidence:</strong> How confident the model is about the prediction (a value between 0 and 1).
                  </li>
                  <li>
                    <strong>class_index:</strong> Numerical representation of the predicted class (useful for debugging). The mapping is as follows:
                    <ul className="list-disc list-inside ml-6">
                      <li><code>0</code>: <strong>drawings</strong></li>
                      <li><code>1</code>: <strong>hentai</strong></li>
                      <li><code>2</code>: <strong>neutral</strong></li>
                      <li><code>3</code>: <strong>porn</strong></li>
                      <li><code>4</code>: <strong>sexy</strong></li>
                    </ul>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card id="confidence-score" className="mb-6">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">📈 Confidence Score Meaning</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* High Confidence Example */}
                  <div className="p-4 bg-gray-50 rounded-md hover:bg-gray-100 transition">
                    <p className="text-gray-600 font-medium">✅ <strong>High Confidence Example</strong></p>
                    <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                      {`"label": "hentai",
"confidence": 0.9992800354957581`}
                    </pre>
                    <p className="text-gray-600 mt-2">
                      The model is 99.92% sure that this image belongs to the <strong>"hentai"</strong> category. This is a strong, reliable prediction.
                    </p>
                  </div>

                  {/* Low Confidence Example */}
                  <div className="p-4 bg-gray-50 rounded-md hover:bg-gray-100 transition">
                    <p className="text-gray-600 font-medium">⚠️ <strong>Low Confidence Example</strong></p>
                    <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                      {`"label": "sexy",
"confidence": 0.555`}
                    </pre>
                    <p className="text-gray-600 mt-2">
                      The model is only 55.5% sure it belongs to the <strong>"sexy"</strong> category. This is a low-confidence prediction; the image could be ambiguous or partially similar to other classes. You may want to manually review or set a threshold (e.g., only trust predictions with confidence <code>&gt; 0.8</code>).
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </div>
  );
}

export default ApiDocs;