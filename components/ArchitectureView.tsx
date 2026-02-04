import React, { useState } from 'react';
import { MODEL_CODE, API_CODE, PIPELINE_CODE } from '../utils/pythonCode';
import { Icons } from '../constants';

const ArchitectureView: React.FC = () => {
    const [activeFile, setActiveFile] = useState<'model' | 'api' | 'pipeline'>('model');

    const files = {
        model: { name: 'model.py', content: MODEL_CODE, desc: 'PyTorch Architecture (CNN + Transformer)' },
        api: { name: 'main.py', content: API_CODE, desc: 'FastAPI Backend & Security' },
        pipeline: { name: 'pipeline.py', content: PIPELINE_CODE, desc: 'Forensic Feature Extraction' }
    };

    return (
        <div className="flex flex-col h-full bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
            <div className="flex items-center border-b border-slate-800 bg-slate-950">
                {Object.entries(files).map(([key, file]) => (
                    <button
                        key={key}
                        onClick={() => setActiveFile(key as any)}
                        className={`px-4 py-3 text-sm font-mono border-r border-slate-800 transition-colors flex items-center gap-2
                            ${activeFile === key ? 'bg-slate-900 text-blue-400' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900/50'}
                        `}
                    >
                        <Icons.FileCode className="w-4 h-4" />
                        {file.name}
                    </button>
                ))}
            </div>
            
            <div className="p-4 bg-slate-900 border-b border-slate-800">
                <p className="text-sm text-slate-400">
                    <span className="text-blue-500 font-mono font-semibold">DESCRIPTION: </span>
                    {files[activeFile].desc}
                </p>
            </div>

            <div className="flex-1 overflow-auto custom-scrollbar bg-[#0d1117] p-4">
                <pre className="font-mono text-xs md:text-sm text-slate-300">
                    <code>{files[activeFile].content}</code>
                </pre>
            </div>
        </div>
    );
};

export default ArchitectureView;