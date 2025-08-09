import React, { useState } from 'react';
import {
  Activity, AlertCircle, ArrowRight, Bell, Check, CheckCircle, ChevronDown,
  ChevronRight, Clock, FileText, FolderPlus, Grid, List, LogOut, MessageSquare,
  Play, Plus, RefreshCw, Info, CircleEllipsis, Search, Settings, User, X,
  Upload, File, Trash2
} from 'lucide-react';

// Mock data for agents - now with agentType
const mockAgents = [
  {
    id: 1,
    name: "DataCollectorBot",
    description: "Specialized in gathering and organizing data from various sources",
    status: "completed",
    image: "/api/placeholder/40/40",
    agentType: "fileUpload",
    logs: [
      { time: "09:15:23", message: "Started data collection process" },
      { time: "09:17:45", message: "Connected to primary data source" },
      { time: "09:25:12", message: "Retrieved 1,240 records from source" },
      { time: "09:32:05", message: "Data validation complete" },
      { time: "09:35:30", message: "Collection process completed successfully" }
    ]
  },
  {
    id: 2,
    name: "AnalystBot",
    description: "Performs statistical analysis and generates insights",
    status: "in_progress",
    image: "/api/placeholder/40/40",
    agentType: "chatBot",
    logs: [
      { time: "09:36:10", message: "Starting analysis of collected data" },
      { time: "09:38:25", message: "Preprocessing data for statistical evaluation" },
      { time: "09:45:18", message: "Running clustering algorithms" },
      { time: "09:52:36", message: "Processing segment 2 of 5..." },
      { time: "10:02:15", message: "Analysis ongoing - 45% complete" }
    ]
  },
  {
    id: 3,
    name: "ReportBot",
    description: "Creates formatted reports and visualizations",
    status: "idle",
    image: "/api/placeholder/40/40",
    agentType: "fileUpload",
    logs: []
  },
  {
    id: 4,
    name: "DecisionBot",
    description: "Makes recommendations based on analyzed data",
    status: "idle",
    image: "/api/placeholder/40/40",
    agentType: "chatBot",
    logs: []
  }
];

// Mock data for agent communications
const mockAgentComms = [
  {
    from: "DataCollectorBot",
    to: "AnalystBot",
    time: "09:35:45",
    message: "Data collection complete. Transferring dataset for analysis."
  },
  {
    from: "AnalystBot",
    to: "DataCollectorBot",
    time: "09:36:02",
    message: "Acknowledged. Starting analysis process."
  },
  {
    from: "AnalystBot",
    to: "System",
    time: "09:48:33",
    message: "Identified potential anomaly in dataset section B. Applying correction algorithm."
  }
];

// Mock artifacts
const mockArtifacts = [
  {
    id: 101,
    name: "raw_sales_data.csv",
    type: "csv",
    creator: "DataCollectorBot",
    size: "2.4 MB",
    time: "09:35:28"
  },
  {
    id: 102,
    name: "data_validation_report.json",
    type: "json",
    creator: "DataCollectorBot",
    size: "156 KB",
    time: "09:35:29"
  },
  {
    id: 103,
    name: "interim_analysis.json",
    type: "json",
    creator: "AnalystBot",
    size: "890 KB",
    time: "09:52:10"
  }
];

// Mock chat messages
const mockChatMessages = [
  {
    id: 1,
    sender: "AnalystBot",
    content: "I'm currently analyzing the sales data from Q3. I've processed about 45% of the data so far. Initial findings show a 12% increase in conversion rates for the new product line.",
    timestamp: "10:02:30"
  },
  {
    id: 2,
    sender: "User",
    content: "That's interesting. Can you tell me more about which specific products are driving that increase?",
    timestamp: "10:03:45"
  },
  {
    id: 3,
    sender: "AnalystBot",
    content: "Based on the current analysis, the top performing products are:\n\n1. Smart Home Hub Pro (28% increase)\n2. Security Sensor Package (17% increase)\n3. Voice Assistant Premium (14% increase)\n\nAll three products were part of the new integrated home ecosystem campaign. I'll have more detailed regional breakdown once the analysis completes.",
    timestamp: "10:05:12"
  }
];

// File Upload Component
const FileUploadInterface = ({ agent }: any) => {
  const [uploadedFiles, setUploadedFiles] = useState<any>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = (files: any) => {
    const newFiles = Array.from(files).map((file: any, index) => ({
      id: Date.now() + index,
      name: file.name,
      size: formatFileSize(file.size),
      type: file.type,
      uploadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      status: 'uploaded'
    }));

    setUploadedFiles((prev: any) => [...prev, ...newFiles]);
  };

  const formatFileSize = (bytes: any) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDrag = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files);
    }
  };

  const removeFile = (fileId: any) => {
    setUploadedFiles((prev: any) => prev.filter((file: any) => file.id !== fileId));
  };

  const processFiles = () => {
    // Simulate file processing
    setUploadedFiles((prev: any) => prev.map((file: any) => ({
      ...file,
      status: 'processing'
    })));

    setTimeout(() => {
      setUploadedFiles((prev: any) => prev.map((file: any) => ({
        ...file,
        status: 'completed'
      })));
    }, 2000);
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Upload Area */}
      <div className="flex-1 p-6">
        <div className="h-full flex flex-col">
          {/* Instructions */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Upload Files for {agent.name}
            </h3>
            <p className="text-gray-600">
              {agent.name === "DataCollectorBot"
                ? "Upload data files (CSV, JSON, XML) for processing and analysis."
                : "Upload files that need to be processed or converted into reports."
              }
            </p>
          </div>

          {/* Drag and Drop Zone */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 bg-gray-50 hover:border-gray-400'
              }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-700 mb-2">
              Drop files here or click to browse
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Supports: CSV, JSON, XML, TXT, PDF (Max 10MB per file)
            </p>
            <input
              type="file"
              multiple
              onChange={handleFileInput}
              className="hidden"
              id="file-upload"
              accept=".csv,.json,.xml,.txt,.pdf"
            />
            <label
              htmlFor="file-upload"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg cursor-pointer inline-block transition-colors"
            >
              Choose Files
            </label>
          </div>

          {/* Uploaded Files List */}
          {uploadedFiles.length > 0 && (
            <div className="mt-6 flex-1">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-md font-semibold text-gray-800">
                  Uploaded Files ({uploadedFiles.length})
                </h4>
                {uploadedFiles.some((file: any) => file.status === 'uploaded') && (
                  <button
                    onClick={processFiles}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center"
                  >
                    <Play size={16} className="mr-1" />
                    Process Files
                  </button>
                )}
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {uploadedFiles.map((file: any) => (
                  <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center flex-1">
                      <File size={24} className="text-gray-400 mr-3" />
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">{file.name}</div>
                        <div className="text-sm text-gray-500">
                          {file.size} • Uploaded at {file.uploadedAt}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {file.status === 'processing' && (
                        <div className="flex items-center text-blue-600">
                          <RefreshCw size={16} className="animate-spin mr-1" />
                          <span className="text-sm">Processing...</span>
                        </div>
                      )}
                      {file.status === 'completed' && (
                        <div className="flex items-center text-green-600">
                          <CheckCircle size={16} className="mr-1" />
                          <span className="text-sm">Completed</span>
                        </div>
                      )}
                      {file.status === 'uploaded' && (
                        <div className="flex items-center text-gray-500">
                          <Clock size={16} className="mr-1" />
                          <span className="text-sm">Ready</span>
                        </div>
                      )}

                      <button
                        onClick={() => removeFile(file.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Chat Interface Component
const ChatInterface = ({ agent, chatMessages, chatInput, setChatInput, handleSendMessage }: any) => {
  return (
    <>
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 bg-white">
        <div className="space-y-6">
          {chatMessages.map((message: any) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'User' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-3/4 ${message.sender === 'User' ?
                'bg-blue-600 text-white rounded-tl-lg rounded-tr-lg rounded-bl-lg' :
                'bg-gray-100 text-gray-800 rounded-tl-lg rounded-tr-lg rounded-br-lg'}`}
              >
                {message.sender !== 'User' && (
                  <div className="px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-tl-lg rounded-tr-lg">
                    {message.sender}
                  </div>
                )}
                <div className="px-4 py-3 whitespace-pre-wrap">
                  {message.content}
                </div>
                <div className={`px-4 py-1 text-xs ${message.sender === 'User' ? 'text-blue-200' : 'text-gray-500'}`}>
                  {message.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={`Message ${agent.name}...`}
            className="flex-1 py-2 px-4 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-r-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

// Main Agent Interaction Component
const AgentInteractionUI = () => {
  const [selectedAgent, setSelectedAgent] = useState(mockAgents[1].id);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<any>(mockChatMessages);
  const [activeTab, setActiveTab] = useState('logs');

  const currentAgent = mockAgents.find(agent => agent.id === selectedAgent);

  const handleSendMessage = () => {
    if (chatInput.trim() === "") return;

    const newMessage = {
      id: chatMessages.length + 1,
      sender: "User",
      content: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };

    setChatMessages([...chatMessages, newMessage]);
    setChatInput("");

    // Simulate agent response after a short delay
    setTimeout(() => {
      const agentResponse = {
        id: chatMessages.length + 2,
        sender: currentAgent?.name,
        content: `I'm processing your request about "${chatInput.substring(0, 30)}${chatInput.length > 30 ? '...' : ''}".\n\nI'll provide more information once I've analyzed this aspect of the data.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      };

      setChatMessages((prev: any) => [...prev, agentResponse]);
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Panel */}
      <div className="w-64 bg-blue-700 text-white flex flex-col h-full">
        {/* Header */}
        <div className="px-4 py-6 border-b border-blue-600">
          <h1 className="!text-[18px] font-bold flex items-center">
            <Grid className="mr-2" size={24} />
            D8taApps Platform
          </h1>
          <div className="mt-4 flex items-center">
            <span className="text-sm text-blue-200">Active Agent:</span>
            <span className="ml-2 font-medium">{currentAgent?.name}</span>
          </div>
        </div>

        {/* Agent List */}
        <div className="flex-1 overflow-auto py-4">
          <div className="px-4 mb-2">
            <span className="text-blue-200 text-sm font-medium">AGENTS</span>
          </div>

          <ul className="space-y-1">
            {mockAgents.map(agent => (
              <li key={agent.id}>
                <button
                  className={`flex items-center w-full px-4 py-3 ${selectedAgent === agent.id ? 'bg-blue-800' : 'hover:bg-blue-600'}`}
                  onClick={() => setSelectedAgent(agent.id)}
                >
                  <div className="relative">
                    <CircleEllipsis size={32} className="mr-3 w-8 h-8 block text-gray-400 rotate-90" />

                    <div className={`absolute bottom-0 right-2 w-3 h-3 rounded-full border-2 border-blue-700 ${agent.status === 'completed' ? 'bg-green-400' :
                      agent.status === 'in_progress' ? 'bg-blue-400' :
                        agent.status === 'error' ? 'bg-red-400' :
                          'bg-gray-400'
                      }`}></div>
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-medium text-sm leading-tight">{agent.name}</div>
                    <div className="text-xs text-blue-300 capitalize flex items-center justify-between">
                      <span>{agent.status.replace('_', ' ')}</span>
                      <span className="text-xs bg-blue-600 px-2 py-0.5 rounded">
                        {agent.agentType === 'chatBot' ? 'Chat' : 'Upload'}
                      </span>
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Agent Details */}
        <div className="p-4 border-t border-blue-600">
          <div className="text-sm">
            <div className="font-medium mb-1">{currentAgent?.name}</div>
            <p className="text-blue-200 text-xs leading-tight">
              {currentAgent?.description}
            </p>
            <div className="mt-2 text-xs">
              <span className="text-blue-200">Type: </span>
              <span className="font-medium">
                {currentAgent?.agentType === 'chatBot' ? 'Chat Bot' : 'File Upload'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Panel - Chat Interface or File Upload */}
      <div className="flex-1 flex flex-col">
        {/* Agent Header */}
        <div className="bg-white px-6 py-4 border-b border-gray-200 flex items-center">
          <div className="relative mr-3">
            <CircleEllipsis size={32} className="mr-1 block text-gray-400 rotate-90" />

            <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${currentAgent?.status === 'completed' ? 'bg-green-400' :
              currentAgent?.status === 'in_progress' ? 'bg-blue-400' :
                currentAgent?.status === 'error' ? 'bg-red-400' :
                  'bg-gray-400'
              }`}></div>
          </div>
          <div>
            <h2 className="font-bold text-gray-800 flex items-center">
              {currentAgent?.name}
              <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                {currentAgent?.agentType === 'chatBot' ? 'Chat Bot' : 'File Upload'}
              </span>
            </h2>
            <div className="flex items-center text-sm text-gray-500">
              {currentAgent?.status === 'in_progress' && (
                <>
                  <RefreshCw size={14} className="mr-1 animate-spin" />
                  <span>Currently working...</span>
                </>
              )}
              {currentAgent?.status === 'completed' && (
                <>
                  <CheckCircle size={14} className="mr-1" />
                  <span>Task completed</span>
                </>
              )}
              {currentAgent?.status === 'idle' && (
                <>
                  <Clock size={14} className="mr-1" />
                  <span>Waiting to start</span>
                </>
              )}
              {currentAgent?.status === 'error' && (
                <>
                  <AlertCircle size={14} className="mr-1" />
                  <span>Error encountered</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Conditional Content Based on Agent Type */}
        {currentAgent?.agentType === 'chatBot' ? (
          <ChatInterface
            agent={currentAgent}
            chatMessages={chatMessages}
            chatInput={chatInput}
            setChatInput={setChatInput}
            handleSendMessage={handleSendMessage}
          />
        ) : (
          <FileUploadInterface agent={currentAgent} />
        )}
      </div>

      {/* Right Panel - Logs and Artifacts */}
      <div className="w-80 bg-blue-700 text-white flex flex-col h-full">
        {/* Tabs */}
        <div className="flex border-b border-blue-600">
          <button
            className={`flex-1 py-4 px-4 text-center ${activeTab === 'logs' ? 'bg-blue-800 text-white' : 'text-blue-200 hover:bg-blue-600'} font-medium`}
            onClick={() => setActiveTab('logs')}
          >
            <MessageSquare size={16} className="inline-block mr-2" />
            Agent Logs
          </button>
          <button
            className={`flex-1 py-4 px-4 text-center ${activeTab === 'artifacts' ? 'bg-blue-800 text-white' : 'text-blue-200 hover:bg-blue-600'} font-medium`}
            onClick={() => setActiveTab('artifacts')}
          >
            <FileText size={16} className="inline-block mr-2" />
            Artifacts
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4">
          {activeTab === 'logs' ? (
            <div>
              {/* Agent Communications */}
              <h3 className="text-lg font-medium mb-2">Agent Communications</h3>
              <div className="space-y-2 mb-6">
                {mockAgentComms.map((comm, index) => (
                  <div key={index} className="bg-white rounded-lg p-3 text-gray-800 text-sm">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>{comm.from} → {comm.to}</span>
                      <span>{comm.time}</span>
                    </div>
                    <p>{comm.message}</p>
                  </div>
                ))}
              </div>

              {/* Activity Log */}
              <h3 className="text-lg font-medium mb-2">Activity Log</h3>
              <div className="space-y-2">
                {currentAgent?.logs.map((log, index) => (
                  <div key={index} className="bg-white rounded-lg p-3 text-gray-800 text-sm">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>{currentAgent?.name}</span>
                      <span>{log.time}</span>
                    </div>
                    <p>{log.message}</p>
                  </div>
                ))}
                {currentAgent?.logs.length === 0 && (
                  <div className="text-blue-200 text-sm italic">
                    No activity logs available for this agent.
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-medium mb-2">Artifacts</h3>
              <div className="space-y-2">
                {mockArtifacts.map(artifact => (
                  <div key={artifact.id} className="bg-white rounded-lg p-3 text-gray-800 flex items-start">
                    <div className="mr-3 p-2 bg-blue-100 rounded-md text-blue-700">
                      <FileText size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{artifact.name}</div>
                      <div className="text-xs text-gray-500 flex justify-between">
                        <span>{artifact.creator}</span>
                        <span>{artifact.size}</span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {artifact.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentInteractionUI;