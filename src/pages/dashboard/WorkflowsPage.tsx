import React, { useState } from 'react';
import {
  Activity, AlertCircle, ArrowRight, Check, CheckCircle, ChevronDown,
  ChevronRight, Clock, FileText, FolderPlus, Grid, HelpCircle, List, MessageSquare,
  Play, Plus, RefreshCw, Settings, User
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// UI Preview Component
const D8taAppsPlatformWorkflowPreview = () => {
  const [selectedWorkflows, setSelectedWorkflows] = useState([101, 104]);
  const [showNewAppModal, setShowNewAppModal] = useState(false);
  const [showUserInputModal, setShowUserInputModal] = useState(false);
  const navigate = useNavigate()
  // Enhanced mock data with user_input status
  const mockWorkflows = [
    {
      id: 101,
      name: "Sales Q3 Analysis",
      description: "Extract insights from quarterly sales data",
      status: "in_progress",
      progress: 65,
      agents: 3,
      lastUpdated: "2 hours ago",
      selected: true
    },
    {
      id: 102,
      name: "User Segmentation",
      description: "Group customers by behavior patterns",
      status: "completed",
      progress: 100,
      agents: 2,
      lastUpdated: "Yesterday",
      selected: false
    },
    {
      id: 103,
      name: "Inventory Forecasting",
      description: "Predict inventory needs for next quarter",
      status: "pending",
      progress: 0,
      agents: 4,
      lastUpdated: "Not started",
      selected: false
    },
    {
      id: 104,
      name: "Marketing Campaign",
      description: "Evaluate targeting for upcoming campaign",
      status: "user_input", // New status for workflows waiting for input
      progress: 48,
      agents: 3,
      inputRequest: "Approval needed for audience segments",
      lastUpdated: "30 minutes ago",
      selected: true
    },
    {
      id: 105,
      name: "Price Optimization",
      description: "Analyze competitive pricing models",
      status: "user_input",
      progress: 72,
      agents: 2,
      inputRequest: "Decision required on discount strategy",
      lastUpdated: "1 hour ago",
      selected: false
    }
  ];

  return (
    <div className="flex flex-col w-full gap-8">
      <h1 className="text-2xl font-bold text-center text-gray-800">D8taApps Platform Workflow UI with User Input Status</h1>

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

          {/* Main Content */}
          <div className="flex-1 bg-gray-50 overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-xl font-bold text-gray-800 flex items-center">
                    <span className="mr-3 p-2 rounded-lg bg-blue-100 text-blue-700"><Activity size={16} /></span>
                    Data Intelligence
                  </h1>
                  <p className="text-gray-600 text-xs mt-1">Manage and monitor instances of this D8taApp</p>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-xs">
                    <Play size={14} />
                    <span>Start 2 Selected</span>
                  </button>
                  <button onClick={()=>navigate('/dashboard/new-workflow')} className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-xs">
                    <Plus size={14} />
                    <span>New Instance</span>
                  </button>
                </div>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-6 gap-3 mb-5">
                {[
                  { title: "Total Instances", value: mockWorkflows.length, icon: <List size={14} />, color: "bg-blue-500" },
                  { title: "Completed", value: mockWorkflows.filter(w => w.status === 'completed').length, icon: <CheckCircle size={14} />, color: "bg-green-500" },
                  { title: "In Progress", value: mockWorkflows.filter(w => w.status === 'in_progress').length, icon: <RefreshCw size={14} />, color: "bg-blue-400" },
                  { title: "Waiting Input", value: mockWorkflows.filter(w => w.status === 'user_input').length, icon: <MessageSquare size={14} />, color: "bg-yellow-500" },
                  { title: "Errors", value: mockWorkflows.filter(w => w.status === 'error').length, icon: <AlertCircle size={14} />, color: "bg-red-500" },
                  { title: "Pending", value: mockWorkflows.filter(w => w.status === 'pending').length, icon: <Clock size={14} />, color: "bg-gray-500" }
                ].map((stat, index) => (
                  <div key={index} className="bg-white rounded-md shadow-sm p-3">
                    <div className="flex items-center mb-2">
                      <div className={`${stat.color} text-white p-1 rounded-md`}>
                        {stat.icon}
                      </div>
                      <h3 className="ml-2 text-gray-600 text-xs font-medium">{stat.title}</h3>
                    </div>
                    <div className="text-xl font-bold text-gray-800">{stat.value}</div>
                  </div>
                ))}
              </div>

              {/* Overall Progress */}
              <div className="bg-white rounded-md shadow-sm p-4 mb-5">
                <h2 className="text-sm font-semibold text-gray-800 mb-3">Overall Progress</h2>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="font-medium text-gray-600">Completion Rate</span>
                  <span className="text-blue-600 font-medium">57%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: "57%" }}></div>
                </div>
              </div>

              {/* Workflows Requiring Input - New Section */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-5">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-sm font-semibold text-yellow-800 flex items-center">
                    <HelpCircle size={16} className="mr-2" />
                    Waiting for Your Input
                  </h2>
                  <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">
                    {mockWorkflows.filter(w => w.status === 'user_input').length} items
                  </span>
                </div>

                <div className="space-y-2">
                  {mockWorkflows.filter(w => w.status === 'user_input').map(workflow => (
                    <div
                      key={workflow.id}
                      className="bg-white rounded-md shadow-sm p-3 border border-yellow-200 hover:border-yellow-400 cursor-pointer"
                      onClick={() => setShowUserInputModal(true)}
                    >
                      <div className="flex justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-800">{workflow.name}</h3>
                        <span className="text-xs text-yellow-600">{workflow.lastUpdated}</span>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{workflow.inputRequest}</p>
                      <div className="flex justify-end">
                        <button className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-3 py-1 rounded">
                          Provide Input
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* All Instances */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-sm font-semibold text-gray-800">All D8taApp Instances</h2>
                  <div className="text-xs text-gray-500">
                    2 selected of {mockWorkflows.length} instances
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {mockWorkflows.map((workflow) => (
                    <div
                      onClick={() => navigate(`/dashboard/workflow/${workflow.id}`)}
                      key={workflow.id}
                      className={`bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer border ${workflow.selected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-100'}`}
                    >
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center">
                            <div className={`mr-2 w-4 h-4 rounded border flex items-center justify-center ${workflow.selected ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`}>
                              {workflow.selected && <Check size={12} className="text-white" />}
                            </div>
                            <h2 className="text-sm font-semibold text-gray-800">{workflow.name}</h2>
                          </div>
                          <div className={`flex items-center gap-1 ${workflow.status === 'error' ? 'text-red-600' :
                              workflow.status === 'completed' ? 'text-green-600' :
                                workflow.status === 'in_progress' ? 'text-blue-600' :
                                  workflow.status === 'user_input' ? 'text-yellow-600' :
                                    'text-gray-500'
                            }`}>
                            {workflow.status === 'pending' && <Clock size={14} />}
                            {workflow.status === 'in_progress' && <RefreshCw size={14} className="animate-spin" />}
                            {workflow.status === 'completed' && <CheckCircle size={14} />}
                            {workflow.status === 'error' && <AlertCircle size={14} />}
                            {workflow.status === 'user_input' && <MessageSquare size={14} />}
                            <span className="text-xs">
                              {workflow.status === 'pending' ? 'Pending' :
                                workflow.status === 'in_progress' ? 'In Progress' :
                                  workflow.status === 'completed' ? 'Completed' :
                                    workflow.status === 'user_input' ? 'Awaiting Input' :
                                      'Error'}
                            </span>
                          </div>
                        </div>

                        <p className="text-gray-600 text-xs mb-2">{workflow.description}</p>

                        {workflow.status === 'user_input' && (
                          <div className="bg-yellow-50 border border-yellow-200 rounded p-2 mb-2 text-xs text-yellow-800">
                            <span className="font-medium">Input needed:</span> {workflow.inputRequest}
                          </div>
                        )}

                        <div className="mb-2">
                          <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>{workflow.progress}%</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${workflow.status === 'completed' ? 'bg-green-500' :
                                  workflow.status === 'error' ? 'bg-red-500' :
                                    workflow.status === 'in_progress' ? 'bg-blue-500' :
                                      workflow.status === 'user_input' ? 'bg-yellow-500' :
                                        'bg-gray-300'
                                }`}
                              style={{ width: `${workflow.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex justify-between text-xs">
                          <div className="flex items-center gap-1 text-gray-600">
                            <User size={12} />
                            <span>{workflow.agents} Agents</span>
                          </div>
                          <div className="text-gray-500">
                            {workflow.lastUpdated}
                          </div>
                        </div>
                      </div>

                      <div className="px-4 py-2 bg-gray-50 flex justify-between items-center">
                        <div className="flex items-center text-blue-600 hover:text-blue-800">
                          <span className="text-xs font-medium">View Details</span>
                          <ArrowRight size={12} className="ml-1" />
                        </div>

                        {workflow.status === 'pending' && (
                          <button className="text-green-600 hover:text-green-800 p-1 rounded-full hover:bg-green-50">
                            <Play size={14} />
                          </button>
                        )}

                        {workflow.status === 'user_input' && (
                          <button
                            className="text-yellow-600 hover:text-yellow-800 p-1 rounded-full hover:bg-yellow-50"
                            onClick={() => setShowUserInputModal(true)}
                          >
                            <MessageSquare size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
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

      {/* Legend */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
          <h2 className="font-medium text-gray-700">Workflow Status Types</h2>
        </div>
        <div className="p-4 bg-white">
          <div className="grid grid-cols-5 gap-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-sm text-gray-700">Completed</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span className="text-sm text-gray-700">In Progress</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <span className="text-sm text-gray-700">Awaiting Input</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <span className="text-sm text-gray-700">Error</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-gray-400 mr-2"></div>
              <span className="text-sm text-gray-700">Pending</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default D8taAppsPlatformWorkflowPreview;