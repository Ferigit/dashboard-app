import React, { useState } from 'react';
import {
  Activity, AlertCircle, ArrowRight, ArrowUpCircle, Check, CheckCircle, ChevronDown,
  ChevronRight, Clock, FileText, FolderPlus, Grid, HelpCircle, List, MessageSquare,
  Play, Plus, RefreshCw, Settings, UploadCloud, User, X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// UI Preview Component
const D8taAppsPlatformDynamicUI = () => {
  const [selectedWorkflows, setSelectedWorkflows] = useState([101, 104]);
  const [showUserInputModal, setShowUserInputModal] = useState(false);
  const [showFileUploadModal, setShowFileUploadModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate()
  // Enhanced mock data with agent progress details
  const mockWorkflows = [
    {
      id: 101,
      name: "Sales Q3 Analysis",
      description: "Extract insights from quarterly sales data",
      status: "in_progress",
      progress: 65,
      activeAgent: {
        name: "AnalystBot",
        status: "processing",
        progress: 45,
        nextAgent: "ReportBot",
        type: "chat",
        eta: "~20 minutes"
      },
      agents: [
        { name: "DataBot", status: "completed", type: "chat" },
        { name: "CleanerBot", status: "completed", type: "chat" },
        { name: "AnalystBot", status: "in_progress", type: "chat" },
        { name: "ReportBot", status: "pending", type: "chat" }
      ],
      lastUpdated: "2 hours ago",
      selected: true
    },
    {
      id: 102,
      name: "User Segmentation",
      description: "Group customers by behavior patterns",
      status: "completed",
      progress: 100,
      agents: [
        { name: "DataBot", status: "completed", type: "chat" },
        { name: "SegmentBot", status: "completed", type: "chat" },
        { name: "ReportBot", status: "completed", type: "chat" }
      ],
      lastUpdated: "Yesterday",
      selected: false
    },
    {
      id: 103,
      name: "Inventory Forecasting",
      description: "Predict inventory needs for next quarter",
      status: "pending",
      progress: 0,
      activeAgent: null,
      agents: [
        { name: "DataBot", status: "pending", type: "upload" },
        { name: "SeasonBot", status: "pending", type: "chat" },
        { name: "TrendBot", status: "pending", type: "chat" },
        { name: "ForecastBot", status: "pending", type: "chat" }
      ],
      lastUpdated: "Not started",
      selected: false
    },
    {
      id: 104,
      name: "Marketing Campaign",
      description: "Evaluate targeting for upcoming campaign",
      status: "user_input",
      progress: 48,
      activeAgent: {
        name: "SegmentBot",
        status: "waiting_input",
        progress: 75,
        type: "chat",
        inputRequest: "Approval needed for audience segments"
      },
      agents: [
        { name: "DataBot", status: "completed", type: "upload" },
        { name: "SegmentBot", status: "user_input", type: "chat" },
        { name: "CreativeBot", status: "pending", type: "chat" },
        { name: "ScheduleBot", status: "pending", type: "chat" }
      ],
      inputRequest: "Approval needed for audience segments",
      lastUpdated: "30 minutes ago",
      selected: true
    },
    {
      id: 105,
      name: "Data Upload Required",
      description: "Upload sales data for processing",
      status: "user_input",
      progress: 5,
      activeAgent: {
        name: "DataBot",
        status: "waiting_upload",
        progress: 10,
        type: "upload",
        inputRequest: "Please upload Q3 sales data CSV file"
      },
      agents: [
        { name: "DataBot", status: "user_input", type: "upload" },
        { name: "AnalystBot", status: "pending", type: "chat" },
        { name: "ReportBot", status: "pending", type: "chat" }
      ],
      inputRequest: "Please upload Q3 sales data CSV file",
      lastUpdated: "1 hour ago",
      selected: false
    }
  ];

  return (
    <div className="flex flex-col w-full gap-8">
      <h1 className="text-2xl font-bold text-center text-gray-800">D8taApps Platform Dynamic UI with Agent Progress</h1>

      {/* Main App UI Preview */}
      <div className="border border-gray-200 rounded-lg overflow-hidden" style={{ height: "680px" }}>
        <div className="flex h-full">
          {/* Left Panel */}
          <div className="w-64 bg-blue-700 text-white flex flex-col h-full">
            {/* Header */}
            <div className="px-4 py-4 border-b border-blue-600">
              <h1 className="text-lg font-bold flex items-center">
                <Grid className="mr-2" size={20} />
                D8taApps Platform
              </h1>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-auto py-3">
              <div className="px-4 mb-2 flex justify-between items-center">
                <span className="text-blue-200 text-xs font-medium">D8TAAPPS</span>
                <button className="text-blue-200 hover:text-white p-1 rounded-full hover:bg-blue-600">
                  <FolderPlus size={14} />
                </button>
              </div>

              <ul className="space-y-1">
                {[
                  {
                    id: 1,
                    name: "Data Intelligence",
                    icon: <Activity size={18} />,
                    active: true,
                    expanded: true,
                    workflows: mockWorkflows.map(wf => ({
                      id: wf.id,
                      name: wf.name,
                      status: wf.status,
                      selected: wf.selected
                    }))
                  },
                  {
                    id: 2,
                    name: "Content Management",
                    icon: <FileText size={18} />,
                    active: false,
                    expanded: false,
                    workflows: []
                  }
                ].map((app) => (
                  <li key={app.id}>
                    <div className={`flex items-center px-4 py-2 cursor-pointer ${app.active ? 'bg-blue-800' : 'hover:bg-blue-600'}`}>
                      <button className="mr-2 text-blue-300 hover:text-white">
                        {app.expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      </button>
                      <span className="mr-3 text-blue-200">{app.icon}</span>
                      <span>{app.name}</span>
                      <span className="ml-auto bg-blue-600 text-xs py-1 px-2 rounded-full">
                        {app.workflows.length}
                      </span>
                    </div>

                    {app.expanded && (
                      <ul className="pl-10 pr-4 py-1 bg-blue-800 text-blue-100 text-xs">
                        {app.workflows.map((workflow) => (
                          <li key={workflow.id}>
                            <div className={`flex items-center py-2 px-2 rounded cursor-pointer ${workflow.selected ? 'bg-blue-900 text-white' : 'hover:bg-blue-700'}`}>
                              <div className={`w-2 h-2 rounded-full mr-2 flex-shrink-0 ${workflow.status === 'completed' ? 'bg-green-400' :
                                workflow.status === 'in_progress' ? 'bg-blue-400' :
                                  workflow.status === 'error' ? 'bg-red-400' :
                                    workflow.status === 'user_input' ? 'bg-yellow-400' :
                                      'bg-gray-400'
                                }`}></div>
                              <span className="truncate">{workflow.name}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* User Profile Link in Footer */}
            <div className="p-4 border-t border-blue-600">
              <button className="flex items-center w-full hover:bg-blue-600 p-2 rounded-lg transition-colors">
                <div className="relative mr-3">
                  <img
                    src="/api/placeholder/32/32"
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full border-2 border-blue-700"></div>
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium">Alex Morgan</div>
                  <div className="text-xs text-blue-300">Administrator</div>
                </div>
              </button>
            </div>
          </div>

          {/* Main Content - Workflow Detail View */}
          <div className="flex-1 bg-gray-50 overflow-auto">
            <div className="p-6">
              <button className="flex items-center text-blue-600 hover:text-blue-800 mb-6" onClick={() => navigate('/dashboard/workflows')}>
                <ArrowRight size={18} className="transform rotate-180 mr-1" />
                <span className="text-sm">Back to Workflows</span>
              </button>

              {/* Workflow Header */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800">Sales Q3 Analysis</h1>
                    <p className="text-gray-600 mt-1">Extract insights from quarterly sales data</p>
                  </div>
                  <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center">
                    <RefreshCw size={14} className="mr-1 animate-spin" />
                    <span>In Progress</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">Overall Progress</span>
                    <span className="text-blue-700 font-medium">65%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: "65%" }}></div>
                  </div>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span>Started: 3 hours ago</span>
                    <span className="px-1">•</span>
                    <span>Last activity: 20 minutes ago</span>
                  </div>
                  <div>
                    <button className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md">
                      Pause Workflow
                    </button>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-200 mb-6">
                <button
                  className={`px-4 py-2 font-medium text-sm ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                </button>
                <button
                  className={`px-4 py-2 font-medium text-sm ${activeTab === 'agents' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                  onClick={() => setActiveTab('agents')}
                >
                  Agents
                </button>
                <button
                  className={`px-4 py-2 font-medium text-sm ${activeTab === 'history' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                  onClick={() => setActiveTab('history')}
                >
                  History
                </button>
                <button
                  className={`px-4 py-2 font-medium text-sm ${activeTab === 'artifacts' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                  onClick={() => setActiveTab('artifacts')}
                >
                  Artifacts
                </button>
              </div>

              {/* Current Agent Status (Always visible) */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h2 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                  <Activity size={20} className="mr-2" />
                  Current Agent Activity
                </h2>

                <div className="flex items-start">
                  <div className="mr-4 bg-white p-3 rounded-full">
                    <img src="/api/placeholder/48/48" alt="AnalystBot" className="w-12 h-12 rounded-full" />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <h3 className="text-md font-medium text-gray-800">AnalystBot</h3>
                      <span className="text-sm text-blue-600">ETA: ~20 minutes</span>
                    </div>

                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Agent Progress</span>
                        <span className="text-blue-700">45%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: "45%" }}></div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600">Currently performing statistical analysis on the sales data. Identifying trends and calculating key performance indicators.</p>

                    <div className="mt-3 flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        <span className="font-medium">Next agent:</span> ReportBot
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Chat with Agent
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Agents Tab Content */}
              {activeTab === 'agents' && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Workflow Agent Pipeline</h2>

                  <div className="space-y-6">
                    {mockWorkflows[0].agents.map((agent, index) => (
                      <div key={index} className="flex">
                        {/* Connector Line */}
                        {index > 0 && (
                          <div className="w-8 flex justify-center -mt-3">
                            <div className="h-16 w-0.5 bg-gray-300"></div>
                          </div>
                        )}

                        <div className={`flex-1 border rounded-lg ${agent.status === 'completed' ? 'border-green-200 bg-green-50' :
                          agent.status === 'in_progress' ? 'border-blue-200 bg-blue-50' :
                            'border-gray-200 bg-white'
                          }`}>
                          <div className="p-4 flex items-start">
                            <div className={`mr-4 p-2 rounded-full ${agent.status === 'completed' ? 'bg-green-100' :
                              agent.status === 'in_progress' ? 'bg-blue-100' :
                                'bg-gray-100'
                              }`}>
                              <img src="/api/placeholder/32/32" alt={agent.name} className="w-8 h-8 rounded-full" />
                            </div>

                            <div className="flex-1">
                              <div className="flex justify-between mb-1">
                                <h3 className="font-medium">{agent.name}</h3>
                                <div className={`flex items-center text-sm ${agent.status === 'completed' ? 'text-green-600' :
                                  agent.status === 'in_progress' ? 'text-blue-600' :
                                    'text-gray-500'
                                  }`}>
                                  {agent.status === 'completed' && (
                                    <>
                                      <CheckCircle size={14} className="mr-1" />
                                      <span>Completed</span>
                                    </>
                                  )}
                                  {agent.status === 'in_progress' && (
                                    <>
                                      <RefreshCw size={14} className="mr-1 animate-spin" />
                                      <span>In Progress</span>
                                    </>
                                  )}
                                  {agent.status === 'pending' && (
                                    <>
                                      <Clock size={14} className="mr-1" />
                                      <span>Pending</span>
                                    </>
                                  )}
                                </div>
                              </div>

                              <p className="text-sm text-gray-600 mb-2">
                                {agent.status === 'completed' ? 'This agent has completed its tasks successfully.' :
                                  agent.status === 'in_progress' ? 'This agent is currently processing data.' :
                                    'This agent is waiting for previous agents to complete.'}
                              </p>

                              <div className="flex items-center">
                                <span className="text-xs text-gray-500 mr-2">Interaction type:</span>
                                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full flex items-center">
                                  {agent.type === 'chat' ?
                                    <><MessageSquare size={10} className="mr-1" /> Chat</> :
                                    <><UploadCloud size={10} className="mr-1" /> Data Upload</>}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Overview Tab Content */}
              {activeTab === 'overview' && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Workflow Overview</h2>

                  <div className="mb-6">
                    <h3 className="text-md font-medium text-gray-700 mb-2">Description</h3>
                    <p className="text-sm text-gray-600">
                      This workflow analyzes quarterly sales data to extract insights and identify trends.
                      It processes raw sales data, cleans and normalizes it, performs statistical analysis,
                      and generates a comprehensive report with visualizations.
                    </p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-md font-medium text-gray-700 mb-2">Agent Pipeline</h3>
                    <div className="flex items-center border border-gray-200 rounded-lg p-3 overflow-auto">
                      <div className="flex items-center">
                        <div className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-sm flex items-center">
                          <span>DataBot</span>
                          <CheckCircle size={14} className="ml-1" />
                        </div>
                        <ArrowRight size={16} className="mx-2 text-gray-400" />
                        <div className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-sm flex items-center">
                          <span>CleanerBot</span>
                          <CheckCircle size={14} className="ml-1" />
                        </div>
                        <ArrowRight size={16} className="mx-2 text-gray-400" />
                        <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-sm flex items-center">
                          <span>AnalystBot</span>
                          <RefreshCw size={14} className="ml-1 animate-spin" />
                        </div>
                        <ArrowRight size={16} className="mx-2 text-gray-400" />
                        <div className="bg-gray-100 text-gray-500 px-2 py-1 rounded-md text-sm flex items-center">
                          <span>ReportBot</span>
                          <Clock size={14} className="ml-1" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-md font-medium text-gray-700 mb-2">Analytics</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="border border-gray-200 rounded-lg p-3">
                        <div className="text-sm text-gray-500 mb-1">Time Elapsed</div>
                        <div className="text-lg font-semibold">3h 12m</div>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-3">
                        <div className="text-sm text-gray-500 mb-1">Est. Completion</div>
                        <div className="text-lg font-semibold">~45 minutes</div>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-3">
                        <div className="text-sm text-gray-500 mb-1">Data Processed</div>
                        <div className="text-lg font-semibold">1.4 GB</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* User Input Modal */}
      {showUserInputModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="bg-yellow-50 px-5 py-4 rounded-t-xl border-b border-yellow-200">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-800 flex items-center">
                  <MessageSquare size={18} className="text-yellow-500 mr-2" />
                  User Input Required
                </h2>
                <button
                  onClick={() => setShowUserInputModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-5">
              <div className="mb-4">
                <h3 className="text-md font-semibold text-gray-800 mb-1">Marketing Campaign</h3>
                <p className="text-sm text-gray-600">Current progress: 48%</p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4">
                <h4 className="text-sm font-medium text-yellow-800 mb-2">Input Requested:</h4>
                <p className="text-sm text-gray-700">Approval needed for audience segments. The workflow has identified 3 potential audience segments for the upcoming campaign. Please review and approve which segments to target.</p>
              </div>

              <div className="space-y-3 mb-4">
                <div className="bg-white border border-gray-200 rounded-md p-3">
                  <div className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-3" id="segment1" />
                    <div>
                      <label htmlFor="segment1" className="block text-sm font-medium text-gray-800">Segment 1: New Customers</label>
                      <p className="text-xs text-gray-600">Users who made their first purchase in the last 30 days</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-md p-3">
                  <div className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-3" id="segment2" checked />
                    <div>
                      <label htmlFor="segment2" className="block text-sm font-medium text-gray-800">Segment 2: High Value</label>
                      <p className="text-xs text-gray-600">Customers with average order value  $100</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-md p-3">
                  <div className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-3" id="segment3" checked />
                    <div>
                      <label htmlFor="segment3" className="block text-sm font-medium text-gray-800">Segment 3: Inactive</label>
                      <p className="text-xs text-gray-600">Customers without purchases in the last 60 days</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Additional Notes (optional)</label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  rows={2}
                  placeholder="Add any additional instructions..."
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end p-5 border-t border-gray-200 gap-2">
              <button
                onClick={() => setShowUserInputModal(false)}
                className="px-3 py-1 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowUserInputModal(false)}
                className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 text-sm"
              >
                Submit Input
              </button>
            </div>
          </div>
        </div>
      )}

      {/* File Upload Modal */}
      {showFileUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="bg-blue-50 px-5 py-4 rounded-t-xl border-b border-blue-200">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-800 flex items-center">
                  <UploadCloud size={18} className="text-blue-500 mr-2" />
                  Data Upload Required
                </h2>
                <button
                  onClick={() => setShowFileUploadModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-5">
              <div className="mb-4">
                <h3 className="text-md font-semibold text-gray-800 mb-1">Data Upload Required</h3>
                <p className="text-sm text-gray-600">Current progress: 5%</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4">
                <h4 className="text-sm font-medium text-blue-800 mb-2">Upload Request:</h4>
                <p className="text-sm text-gray-700">Please upload Q3 sales data CSV file to continue with the analysis. The file should contain sales transactions from July to September.</p>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4">
                <div className="text-center">
                  <ArrowUpCircle size={36} className="mx-auto mb-2 text-gray-400" />
                  <h4 className="text-md font-medium text-gray-700 mb-1">Drop your file here</h4>
                  <p className="text-sm text-gray-500 mb-4">or click to browse</p>
                  <input type="file" className="hidden" id="fileUpload" />
                  <button
                    // onClick={() => document.getElementById('fileUpload').click()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Select File
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <FileText size={16} className="text-gray-500 mr-2" />
                    <span className="text-sm text-gray-700">q3_sales_data.csv</span>
                  </div>
                  <button className="text-red-500 hover:text-red-700">
                    <X size={16} />
                  </button>
                </div>
                <div className="h-1 w-full bg-gray-200 rounded-full">
                  <div className="h-1 bg-blue-500 rounded-full" style={{ width: "60%" }}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>2.4 MB</span>
                  <span>60% uploaded</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="text-sm font-medium text-gray-700 mb-2">File Requirements:</h4>
                <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
                  <li>CSV format with headers in the first row</li>
                  <li>Required columns: Date, Product, Quantity, Price, Customer ID</li>
                  <li>Date format should be YYYY-MM-DD</li>
                  <li>Maximum file size: 50MB</li>
                </ul>
              </div>
            </div>

            <div className="flex justify-end p-5 border-t border-gray-200 gap-2">
              <button
                onClick={() => setShowFileUploadModal(false)}
                className="px-3 py-1 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowFileUploadModal(false)}
                className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
              >
                Upload & Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FastAPI Data Structure Documentation */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
          <h2 className="font-medium text-gray-700">FastAPI Data Structure for UI</h2>
        </div>
        <div className="p-4 bg-white">
          <p className="text-sm text-gray-600 mb-4">
            Below is the proposed FastAPI data structure that would provide all the necessary information for this UI:
          </p>

          <div className="font-mono text-xs bg-gray-50 p-4 rounded-lg overflow-auto">
            {`# FastAPI Data Model Structure

from enum import Enum
from typing import List, Optional, Union
from pydantic import BaseModel
from datetime import datetime

# Enums
class WorkflowStatus(str, Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    ERROR = "error"
    USER_INPUT = "user_input"

class AgentStatus(str, Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    ERROR = "error"
    USER_INPUT = "user_input"
    WAITING_UPLOAD = "waiting_upload"

class AgentType(str, Enum):
    CHAT = "chat"
    UPLOAD = "upload"

# Agent Models
class AgentInputRequest(BaseModel):
    request_type: str  # "form", "approval", "choice", "upload"
    title: str
    description: str
    input_fields: Optional[List[dict]] = None  # For form inputs
    options: Optional[List[dict]] = None      # For selection/approval inputs
    file_requirements: Optional[dict] = None  # For file uploads

class Agent(BaseModel):
    id: str
    name: str
    description: str
    type: AgentType
    status: AgentStatus
    progress: Optional[int] = None  # 0-100
    eta: Optional[str] = None
    input_request: Optional[AgentInputRequest] = None
    current_activity: Optional[str] = None
    logs: List[dict] = []
    
# Workflow Models
class WorkflowStep(BaseModel):
    name: str
    agent_id: str
    status: AgentStatus
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None

class Artifact(BaseModel):
    id: str
    name: str
    type: str  # "csv", "json", "report", etc.
    creator: str  # agent name
    created_at: datetime
    size: str
    url: str

class Workflow(BaseModel):
    id: str
    name: str
    description: str
    status: WorkflowStatus
    progress: int  # 0-100
    created_at: datetime
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    last_updated: datetime
    active_agent: Optional[str] = None  # agent_id of currently active agent
    steps: List[WorkflowStep]
    artifacts: List[Artifact] = []
    total_time_elapsed: Optional[str] = None
    estimated_completion: Optional[str] = None
    data_processed: Optional[str] = None
    input_request: Optional[str] = None  # Human-readable description of input needed

# D8taApp Model
class D8taApp(BaseModel):
    id: str
    name: str
    description: str
    icon: str
    created_by: str
    created_at: datetime
    last_modified: datetime
    workflows: List[str] = []  # IDs of associated workflows

# API Endpoints Response Models
class WorkflowListResponse(BaseModel):
    d8taapp_id: str
    total_workflows: int
    completed: int
    in_progress: int
    pending: int
    error: int
    user_input: int
    overall_progress: int
    workflows: List[Workflow]

class WorkflowDetailResponse(BaseModel):
    workflow: Workflow
    agents: List[Agent]
    active_agent_details: Optional[Agent] = None

class InputSubmissionResponse(BaseModel):
    success: bool
    workflow_id: str
    new_status: WorkflowStatus
    message: str

class FileUploadResponse(BaseModel):
    success: bool
    file_id: str
    workflow_id: str
    agent_id: str
    file_name: str
    file_size: str
    new_status: WorkflowStatus
    message: str`}
          </div>

          <h3 className="font-medium text-gray-700 mt-6 mb-2">FastAPI Endpoints</h3>
          <div className="font-mono text-xs bg-gray-50 p-4 rounded-lg overflow-auto">
            {`# FastAPI Endpoints

@app.get("/api/d8taapps")
async def get_d8taapps():
    """Get all D8taApps for the current user"""
    
@app.get("/api/d8taapp/{d8taapp_id}")
async def get_d8taapp(d8taapp_id: str):
    """Get detailed information about a specific D8taApp"""
    
@app.post("/api/d8taapp")
async def create_d8taapp(d8taapp: D8taAppCreate):
    """Create a new D8taApp"""
    
@app.get("/api/d8taapp/{d8taapp_id}/workflows")
async def get_workflows(d8taapp_id: str, status: Optional[WorkflowStatus] = None):
    """Get all workflows for a specific D8taApp, optionally filtered by status"""
    
@app.post("/api/d8taapp/{d8taapp_id}/workflow")
async def create_workflow(d8taapp_id: str, workflow: WorkflowCreate):
    """Create a new workflow instance for a D8taApp"""
    
@app.get("/api/workflow/{workflow_id}")
async def get_workflow_detail(workflow_id: str):
    """Get detailed information about a specific workflow"""
    
@app.post("/api/workflow/{workflow_id}/start")
async def start_workflow(workflow_id: str):
    """Start a pending workflow"""
    
@app.post("/api/workflow/{workflow_id}/pause")
async def pause_workflow(workflow_id: str):
    """Pause an in-progress workflow"""
    
@app.post("/api/workflow/{workflow_id}/resume")
async def resume_workflow(workflow_id: str):
    """Resume a paused workflow"""
    
@app.post("/api/workflow/batch-start")
async def batch_start_workflows(workflow_ids: List[str]):
    """Start multiple workflows at once"""
    
@app.post("/api/agent/{agent_id}/input")
async def submit_agent_input(agent_id: str, input_data: dict):
    """Submit user input for an agent that is waiting for input"""
    
@app.post("/api/agent/{agent_id}/upload")
async def upload_file(agent_id: str, file: UploadFile):
    """Upload a file for an agent that requires file input"""
    
@app.get("/api/agent/{agent_id}/logs")
async def get_agent_logs(agent_id: str):
    """Get logs for a specific agent"""
    
@app.get("/api/workflow/{workflow_id}/artifacts")
async def get_workflow_artifacts(workflow_id: str):
    """Get all artifacts generated by a workflow"""
    
@app.get("/api/artifact/{artifact_id}")
async def get_artifact(artifact_id: str):
    """Download a specific artifact"""
    
@app.get("/api/stats/user-input-required")
async def get_user_input_workflows():
    """Get all workflows waiting for user input"""

@app.post("/api/agent/{agent_id}/chat")
async def send_chat_message(agent_id: str, message: str):
    """Send a chat message to a specific agent"""
    
@app.get("/api/agent/{agent_id}/chat-history")
async def get_chat_history(agent_id: str):
    """Get chat history with a specific agent"""

@app.ws("/api/agent/{agent_id}/chat-ws")
async def websocket_endpoint(websocket: WebSocket, agent_id: str):
    """WebSocket for real-time chat with an agent"""

@app.ws("/api/workflow/{workflow_id}/status-ws")
async def workflow_status_websocket(websocket: WebSocket, workflow_id: str):
    """WebSocket for real-time workflow status updates"""
`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default D8taAppsPlatformDynamicUI;