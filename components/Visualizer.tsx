import React, { useEffect, useRef } from 'react';

interface VisualizerProps {
    file: File | null;
    isAnalyzing: boolean;
}

const Visualizer: React.FC<VisualizerProps> = ({ file, isAnalyzing }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!file || !canvasRef.current || !containerRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Resize canvas to container
        canvas.width = containerRef.current.clientWidth;
        canvas.height = 200;

        let audioContext: AudioContext;

        const drawWaveform = (buffer: AudioBuffer) => {
            const width = canvas.width;
            const height = canvas.height;
            const data = buffer.getChannelData(0);
            const step = Math.ceil(data.length / width);
            const amp = height / 2;

            ctx.clearRect(0, 0, width, height);
            ctx.beginPath();
            ctx.moveTo(0, amp);
            
            // Draw baseline
            ctx.strokeStyle = '#334155';
            ctx.lineWidth = 1;
            ctx.lineTo(width, amp);
            ctx.stroke();

            // Draw Wave
            ctx.beginPath();
            ctx.strokeStyle = '#3b82f6'; // primary-500
            ctx.lineWidth = 2;

            for (let i = 0; i < width; i++) {
                let min = 1.0;
                let max = -1.0;
                
                for (let j = 0; j < step; j++) {
                    const datum = data[(i * step) + j];
                    if (datum < min) min = datum;
                    if (datum > max) max = datum;
                }
                
                ctx.moveTo(i, (1 + min) * amp);
                ctx.lineTo(i, (1 + max) * amp);
            }
            ctx.stroke();
        };

        const reader = new FileReader();
        reader.onload = async (e) => {
            const arrayBuffer = e.target?.result as ArrayBuffer;
            // DecodeAudioData is unavoidable for a waveform, but we only do it once per file
            audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            try {
                const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
                drawWaveform(audioBuffer);
            } catch (err) {
                console.error("Error decoding audio for visualizer", err);
            }
        };
        
        // Ensure we don't block the UI if the file is massive
        reader.readAsArrayBuffer(file);

        return () => {
            if (audioContext) audioContext.close();
        };
    }, [file]);

    return (
        <div ref={containerRef} className="w-full h-[200px] bg-slate-900/50 rounded-lg border border-slate-800 overflow-hidden relative group">
            {!file && (
                <div className="absolute inset-0 flex items-center justify-center text-slate-500 text-sm">
                    No Audio Loaded
                </div>
            )}
            <canvas ref={canvasRef} className="w-full h-full" />
            
            {/* Optimized CSS-based scanline - No JS thread overhead */}
            {isAnalyzing && (
                 <div className="absolute inset-y-0 w-1 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)] scan-line-active" 
                      style={{ left: 0 }} />
            )}
            {/* Static overlay gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent pointer-events-none" />
        </div>
    );
};

export default Visualizer;