import React, { useState } from 'react';
import { Tab, Language, Classification, AnalysisResult } from './types';
import { APP_NAME, APP_VERSION, Icons } from './constants';
import { analyzeAudio } from './services/mockService';
import Visualizer from './components/Visualizer';
import ArchitectureView from './components/ArchitectureView';
import GeminiChat from './components/GeminiChat';

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('dashboard');
    const [selectedLang, setSelectedLang] = useState<Language>(Language.English);
    const [file, setFile] = useState<File | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            if (e.target.files[0].type === "audio/mpeg") {
                setFile(e.target.files[0]);
                setResult(null);
            } else {
                alert("Restricted: Only MP3 format is allowed by the security protocol.");
            }
        }
    };

    const runAnalysis = async () => {
        if (!file) return;
        setIsAnalyzing(true);
        setResult(null); // Clear previous result immediately
        try {
            const res = await analyzeAudio(file, selectedLang);
            setResult(res);
        } catch (err) {
            console.error(err);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const renderDashboard = () => (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full p-6">
            {/* Left Col: Controls & Visualizer */}
            <div className="lg:col-span-8 flex flex-col gap-6">
                
                {/* Visualizer Section */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-medium flex items-center gap-2">
                            <Icons.Cpu className="w-5 h-5 text-blue-500" />
                            Signal Processing Unit
                        </h2>
                        <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                            <span className={`w-2 h-2 rounded-full ${isAnalyzing ? 'bg-green-500 animate-pulse' : 'bg-slate-600'}`} />
                            {isAnalyzing ? 'PROCESSING STREAM' : 'IDLE'}
                        </div>
                    </div>
                    <Visualizer file={file} isAnalyzing={isAnalyzing} />
                </div>

                {/* Controls Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                            1. Select Regional Dialect
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {Object.values(Language).map((lang) => (
                                <button
                                    key={lang}
                                    onClick={() => setSelectedLang(lang)}
                                    className={`px-3 py-2 rounded text-xs font-medium transition-all ${
                                        selectedLang === lang 
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                    }`}
                                >
                                    {lang}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                            2. Input Source (MP3 Only)
                        </label>
                        <div className="flex gap-4 items-center">
                            <label className="flex-1 cursor-pointer group">
                                <input type="file" accept="audio/mpeg" className="hidden" onChange={handleFileChange} />
                                <div className="h-10 w-full bg-slate-800 rounded flex items-center justify-center border border-slate-700 group-hover:border-blue-500 transition-colors">
                                    <span className="text-xs text-slate-300 truncate px-2">
                                        {file ? file.name : "Select MP3 File..."}
                                    </span>
                                </div>
                            </label>
                            <button
                                onClick={runAnalysis}
                                disabled={!file || isAnalyzing}
                                className={`h-10 px-6 rounded font-semibold text-sm transition-all flex items-center gap-2 ${
                                    !file || isAnalyzing
                                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                                }`}
                            >
                                {isAnalyzing ? 'Scanning...' : 'Detect'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                {result && (
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 animate-in fade-in slide-in-from-bottom-4">
                        <h3 className="text-sm font-semibold text-slate-400 uppercase mb-4">Forensic Analysis Report</h3>
                        
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                            <div className={`p-6 rounded-lg border flex flex-col items-center justify-center min-w-[180px] ${
                                result.classification === Classification.AI_GENERATED
                                    ? 'bg-red-500/10 border-red-500/30 text-red-500'
                                    : 'bg-green-500/10 border-green-500/30 text-green-500'
                            }`}>
                                {result.classification === Classification.AI_GENERATED 
                                    ? <Icons.AlertTriangle className="w-10 h-10 mb-2" />
                                    : <Icons.CheckCircle className="w-10 h-10 mb-2" />
                                }
                                <span className="text-lg font-bold tracking-widest">{result.classification.replace('_', ' ')}</span>
                                <span className="text-xs mt-1 opacity-80">Confidence: {(result.confidenceScore * 100).toFixed(1)}%</span>
                            </div>

                            <div className="flex-1 space-y-4">
                                <div>
                                    <h4 className="text-xs font-mono text-slate-500 mb-1">TECHNICAL EXPLANATION</h4>
                                    <p className="text-sm text-slate-200 leading-relaxed border-l-2 border-slate-700 pl-3">
                                        {result.explanation}
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-slate-950 p-3 rounded border border-slate-800">
                                        <div className="text-[10px] text-slate-500 uppercase">Pitch Stability</div>
                                        <div className="text-lg font-mono text-blue-400">{result.features.pitchStability.toFixed(3)}</div>
                                    </div>
                                    <div className="bg-slate-950 p-3 rounded border border-slate-800">
                                        <div className="text-[10px] text-slate-500 uppercase">Spectral Jitter</div>
                                        <div className="text-lg font-mono text-purple-400">{result.features.jitter.toFixed(4)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Right Col: Chat Assistant */}
            <div className="lg:col-span-4 h-full min-h-[500px]">
                <GeminiChat />
            </div>
        </div>
    );

    return (
        <div className="flex flex-col h-screen bg-slate-950 text-slate-200 font-sans">
            {/* Header */}
            <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center shadow-lg shadow-blue-600/20">
                        <Icons.Shield className="text-white w-5 h-5" />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg tracking-tight text-white">{APP_NAME}</h1>
                        <div className="text-[10px] text-slate-500 font-mono leading-none">FORENSIC SUITE {APP_VERSION}</div>
                    </div>
                </div>
                
                <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                    <button 
                        onClick={() => setActiveTab('dashboard')}
                        className={`px-4 py-1.5 rounded text-xs font-medium transition-all ${activeTab === 'dashboard' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        Dashboard
                    </button>
                    <button 
                        onClick={() => setActiveTab('architecture')}
                        className={`px-4 py-1.5 rounded text-xs font-medium transition-all ${activeTab === 'architecture' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        System Source
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
                {activeTab === 'dashboard' ? renderDashboard() : (
                    <div className="h-full p-6">
                        <ArchitectureView />
                    </div>
                )}
            </main>
        </div>
    );
};

export default App;