import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link for navigation
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Loader } from "lucide-react"; // For the tick icon and loader



const backendUrl = import.meta.env.VITE_BACKEND;

function Dashboard() {
  const [apiKey, setApiKey] = useState("");
  const [testResult, setTestResult] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // State for file upload
  const [copySuccess, setCopySuccess] = useState(false); // State to track copy success
  const [isLoading, setIsLoading] = useState(false); // State to track loading
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        const response = await axios.get(`http://${backendUrl}:5000/api-key`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setApiKey(response.data.api_key);
        localStorage.setItem("api-key", response.data.api_key); // Store the API key in localStorage
      } catch (error) {
        console.error("Error fetching API key:", error);
        alert("Failed to fetch API key. Please log in again.");
      }
    };

    fetchApiKey();
  }, []);

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiKey).then(() => {
      setCopySuccess(true); // Set copy success to true
      setTimeout(() => setCopySuccess(false), 5000); // Reset after 5 seconds
    });
  };

  const handleTestApi = async () => {
    try {
      setIsLoading(true); // Start loading
      const apiKey = localStorage.getItem("api-key"); // Retrieve the API key from localStorage
      if (!apiKey) {
        alert("API key not found. Please log in.");
        setIsLoading(false); // Stop loading
        return;
      }

      const formData = new FormData();

      if (selectedFile) {
        formData.append("file", selectedFile); // Append the uploaded image file
      } else {
        alert("Please upload an image file.");
        setIsLoading(false); // Stop loading
        return;
      }

      const response = await axios.post(`http://${backendUrl}:5000/profanity-detect`, formData, {
        headers: {
          "api-key": apiKey, // Send the API key in the headers
          "Content-Type": "multipart/form-data",
        },
      });

      // Display the response in the Textarea
      setTestResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error("Error testing the API:", error);
      setTestResult("Error testing the API. Please check the image or try again.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setSelectedFile(event.dataTransfer.files[0]);
    }
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear all stored data (token, API key, etc.)
    navigate("/login"); // Redirect to the login page
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md h-full">
        <nav className="p-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
          <ul className="space-y-2">
            <li>
              <a href="#api-details" className="text-gray-600 hover:text-gray-800">
                API Details
              </a>
            </li>
            <li>
              <a href="#test-api" className="text-gray-600 hover:text-gray-800">
                Test API
              </a>
            </li>
            <li>
              <Link to="/api-docs" className="text-gray-600 hover:text-gray-800">
                API Documentation
              </Link>
            </li>
          </ul>
          <div className="mt-8">
            <Button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 text-white"
            >
              Logout
            </Button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* API Details Section */}
        <Card id="api-details" className="w-full max-w-4xl mx-auto shadow-md mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">API Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-gray-600 font-medium">Your API Key:</p>
                <div className="flex items-center space-x-4">
                  <Input value={apiKey} readOnly className="flex-1" />
                  <Button
                    onClick={handleCopyApiKey}
                    className={`flex items-center justify-center space-x-2 ${
                      copySuccess ? "bg-green-500 hover:bg-green-600" : ""
                    }`}
                  >
                    {copySuccess ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <span>Copy</span>
                    )}
                  </Button>
                </div>
              </div>
              <div>
                <p className="text-gray-600 font-medium">API Endpoint:</p>
                <Input value="http://44.207.96.137:5000/profanity-detect" readOnly />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Test API Section */}
        <Card id="test-api" className="w-full max-w-4xl mx-auto shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Test API</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-gray-600 font-medium">Upload Image:</p>
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className="border-2 border-dashed border-gray-300 p-4 rounded-md text-center"
                >
                  <p className="text-gray-500">Drag and drop an image here, or click to upload</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer text-blue-500">
                    Browse Files
                  </label>
                </div>
                {selectedFile && (
                  <p className="text-gray-600 mt-2">Selected File: {selectedFile.name}</p>
                )}
              </div>
              <Button
                onClick={handleTestApi}
                className="w-full flex items-center justify-center"
                disabled={isLoading} // Disable button while loading
              >
                {isLoading ? (
                  <Loader className="animate-spin w-5 h-5 mr-2" /> // Loading spinner
                ) : (
                  "Test API"
                )}
              </Button>
              <div>
                <p className="text-gray-600 font-medium">Response:</p>
                <Textarea value={testResult} readOnly className="h-40" />
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default Dashboard;