import React from 'react';

export const APP_NAME = "Veritas Voice";
export const APP_VERSION = "v2.1-robust";

export const MOCK_API_DELAY = 800; // Optimized: Reduced to 800ms for high efficiency

export const SAMPLE_EXPLANATIONS = {
    AI: [
        "Deepfake confirmed: Phase coherence in frequencies >8kHz is mathematically perfect, indicating vocoder resynthesis.",
        "High probability of AI: Pitch stability exceeds human physiological limits (jitter < 0.2%) with absence of micro-tremors.",
        "Suspicious artifacts: Unnatural harmonic consistency and uniform pause durations detected.",
        "Spectral envelope shows characteristic vocoder smoothing artifacts inconsistent with organic tract resonance."
    ],
    HUMAN: [
        "Authentic Human: Complex non-linear airflow turbulence and sub-harmonic micro-tremors clearly present.",
        "Likely Human: Natural fluctuation in pitch/amplitude observed. Background noise floor matches organic environment.",
        "Non-uniform pause durations consistent with human respiration patterns.",
        "High-frequency harmonics show natural irregularity and decay."
    ]
};

export const Icons = {
    Upload: (props: any) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" x2="12" y1="3" y2="15" />
        </svg>
    ),
    Cpu: (props: any) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
            <rect x="9" y="9" width="6" height="6" />
            <line x1="9" x2="9" y1="1" y2="4" />
            <line x1="15" x2="15" y1="1" y2="4" />
            <line x1="9" x2="9" y1="20" y2="23" />
            <line x1="15" x2="15" y1="20" y2="23" />
            <line x1="20" x2="23" y1="9" y2="9" />
            <line x1="20" x2="23" y1="14" y2="14" />
            <line x1="1" x2="4" y1="9" y2="9" />
            <line x1="1" x2="4" y1="14" y2="14" />
        </svg>
    ),
    Shield: (props: any) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
    ),
    CheckCircle: (props: any) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    ),
    AlertTriangle: (props: any) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
    ),
    FileCode: (props: any) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <path d="M10 13l-2 2 2 2" />
            <path d="M14 13l2 2-2 2" />
        </svg>
    ),
    Bot: (props: any) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <rect x="3" y="11" width="18" height="10" rx="2" />
            <circle cx="12" cy="5" r="2" />
            <path d="M12 7v4" />
            <line x1="8" y1="16" x2="8" y2="16" />
            <line x1="16" y1="16" x2="16" y2="16" />
        </svg>
    )
};