import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

function Home() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md h-full">
        <nav className="p-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-800">Documentation</h2>
          <ul className="space-y-2">
            <li>
              <a
                href="#introduction"
                className="block text-gray-600 hover:text-blue-600 hover:font-semibold transition duration-200"
              >
                Introduction
              </a>
            </li>
            <li>
              <a
                href="#how-it-works"
                className="block text-gray-600 hover:text-blue-600 hover:font-semibold transition duration-200"
              >
                How It Works
              </a>
            </li>
            <li>
              <a
                href="#steps-to-use"
                className="block text-gray-600 hover:text-blue-600 hover:font-semibold transition duration-200"
              >
                Steps to Use
              </a>
            </li>
            <li>
              <a
                href="#deep-learning-model"
                className="block text-gray-600 hover:text-blue-600 hover:font-semibold transition duration-200"
              >
                Deep Learning Model
              </a>
            </li>
            <li>
              <a
                href="#get-started"
                className="block text-gray-600 hover:text-blue-600 hover:font-semibold transition duration-200"
              >
                Get Started
              </a>
            </li>
            <li>
              <Link to="/api-docs" className="block text-gray-600 hover:text-blue-600 hover:font-semibold transition duration-200">
              Go to API Docs
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Card className="w-full max-w-4xl mx-auto shadow-md mb-8 hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold">
              Profanity Image Detector API
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-600 text-lg">
              Detect NSFW and Offensive content in images with ease. This API helps you integrate profanity detection into your applications seamlessly.
            </p>
          </CardContent>
        </Card>

        {/* Documentation Sections */}
        <div id="introduction" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 hover:text-blue-600 transition duration-200">
            Introduction
          </h2>
          <p className="text-gray-600">
            The Profanity Image Detector API allows developers to analyze images for inappropriate content, including NSFW and offensive material. It's designed to be fast, reliable, and easy to integrate into your applications.
          </p>
        </div>

        <div id="how-it-works" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 hover:text-blue-600 transition duration-200">
            How It Works
          </h2>
          <ol className="list-decimal list-inside text-gray-600 space-y-2">
            <li className="hover:text-blue-600 transition duration-200">Upload an image to the API endpoint.</li>
            <li className="hover:text-blue-600 transition duration-200">The API processes the image and detects inappropriate content.</li>
            <li className="hover:text-blue-600 transition duration-200">Receive a detailed JSON response with the analysis results.</li>
          </ol>
        </div>

        <div id="steps-to-use" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 hover:text-blue-600 transition duration-200">
            Steps to Use
          </h2>
          <ol className="list-decimal list-inside text-gray-600 space-y-2">
            <li className="hover:text-blue-600 transition duration-200">
              <strong>Step 1:</strong> Sign up and get your API key.
            </li>
            <li className="hover:text-blue-600 transition duration-200">
              <strong>Step 2:</strong> Make a POST request to the API endpoint with the image file and your API key.
            </li>
            <li className="hover:text-blue-600 transition duration-200">
              <strong>Step 3:</strong> Parse the JSON response to get the analysis results.
            </li>
          </ol>
        </div>

        <div id="deep-learning-model" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 hover:text-blue-600 transition duration-200">
            Deep Learning Model Overview
          </h2>
          <p className="text-gray-600 mb-4">
            A Sequential model in deep learning is a straightforward way to build a neural network where layers are stacked one after another in a linear order. Each layer receives input from the previous layer and passes its output to the next, making it ideal for feed-forward architectures like CNNs and fully connected networks.
          </p>
          <h3 className="text-xl font-semibold mb-2 hover:text-blue-600 transition duration-200">
            Model Architecture
          </h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li className="hover:text-blue-600 transition duration-200">
              <strong>MobileNetV2 (Feature Extractor):</strong>
              <ul className="list-disc list-inside ml-6">
                <li>Type: mobilenetv2_1.00_224 (Functional)</li>
                <li>Output Shape: (None, 7, 7, 1280)</li>
                <li>Parameters: 2,257,984</li>
                <li>Significance: Pre-trained on large datasets, optimized for efficiency, and extracts features like edges, textures, and patterns.</li>
              </ul>
            </li>
            <li className="hover:text-blue-600 transition duration-200">
              <strong>Global Average Pooling Layer (Feature Compression):</strong>
              <ul className="list-disc list-inside ml-6">
                <li>Type: global_average_pooling2d (GlobalAveragePooling2D)</li>
                <li>Output Shape: (None, 1280)</li>
                <li>Parameters: 0</li>
                <li>Significance: Reduces spatial complexity by averaging feature maps into a single vector.</li>
              </ul>
            </li>
            <li className="hover:text-blue-600 transition duration-200">
              <strong>Dense Layer (Fully Connected Layer):</strong>
              <ul className="list-disc list-inside ml-6">
                <li>Type: dense (Dense)</li>
                <li>Output Shape: (None, 128)</li>
                <li>Parameters: 163,968</li>
                <li>Significance: Learns patterns from extracted features and reduces feature dimensions.</li>
              </ul>
            </li>
            <li className="hover:text-blue-600 transition duration-200">
              <strong>Dropout Layer (Regularization):</strong>
              <ul className="list-disc list-inside ml-6">
                <li>Type: dropout (Dropout)</li>
                <li>Output Shape: (None, 128)</li>
                <li>Parameters: 0</li>
                <li>Significance: Prevents overfitting by randomly setting neurons to zero during training.</li>
              </ul>
            </li>
            <li className="hover:text-blue-600 transition duration-200">
              <strong>Final Dense Layer (Output Layer):</strong>
              <ul className="list-disc list-inside ml-6">
                <li>Type: dense_1 (Dense)</li>
                <li>Output Shape: (None, 5)</li>
                <li>Parameters: 645</li>
                <li>Significance: Outputs probabilities for 5 classes using Softmax activation.</li>
              </ul>
            </li>
          </ul>
        </div>

        <div id="get-started" className="flex justify-center mt-6">
          <Link to="/login">
            <Button className="px-6 py-3 text-lg bg-blue-500 hover:bg-blue-600 text-white transition duration-200">
              Get Started
            </Button>
          </Link>
        </div>

        
      </main>
    </div>
  );
}

export default Home;