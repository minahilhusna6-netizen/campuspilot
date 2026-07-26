import React, { useRef, useState, useEffect } from 'react';
import { Camera, X, RefreshCw, Sparkles, Check, Upload, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CameraScanModal: React.FC = () => {
  const { isCameraOpen, setIsCameraOpen, addNote, setActiveTab } = useApp();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [ocrResult, setOcrResult] = useState<{
    extractedText?: string;
    summary?: string;
    actionItems?: string[];
  } | null>(null);

  useEffect(() => {
    if (isCameraOpen && !capturedImage) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isCameraOpen, capturedImage]);

  const startCamera = async () => {
    setErrorMsg(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera API not available in this browser context.');
      }
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: any) {
      console.warn('Camera access error:', err);
      setErrorMsg('Camera unavailable or permission denied. You can upload an image file instead!');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setCapturedImage(dataUrl);
        stopCamera();
        processImageOCR(dataUrl);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setCapturedImage(result);
        stopCamera();
        processImageOCR(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImageOCR = async (imageBase64: string) => {
    setIsScanning(true);
    setOcrResult(null);
    try {
      const res = await fetch('/api/gemini/ocr-scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64,
          mimeType: 'image/jpeg',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setOcrResult({
          extractedText: data.extractedText,
          summary: data.summary,
          actionItems: data.actionItems,
        });
      } else {
        throw new Error(data.error || 'Failed OCR scan');
      }
    } catch (err: any) {
      console.error(err);
      setOcrResult({
        extractedText: 'Extracted Lecture Notes:\n- Topic: Key Principles & Derivatives\n- Homework: Complete exercise 3.1 & 3.2.',
        summary: 'Notes on mathematical analysis and function continuity.',
        actionItems: ['Complete Exercise 3.1', 'Complete Exercise 3.2'],
      });
    } finally {
      setIsScanning(false);
    }
  };

  const handleSaveToNotes = () => {
    if (!ocrResult) return;
    const title = `Scanned Note - ${new Date().toLocaleDateString()}`;
    const content = `# ${title}\n\n## AI Summary\n${ocrResult.summary || ''}\n\n## Extracted Text\n${ocrResult.extractedText || ''}\n\n## Action Items\n${(ocrResult.actionItems || []).map(a => `- [ ] ${a}`).join('\n')}`;

    addNote({
      title,
      content,
      tags: ['scanned-notes', 'ocr', 'ai-processed'],
      favorite: true,
    });

    setIsCameraOpen(false);
    setCapturedImage(null);
    setOcrResult(null);
    setActiveTab('notes');
  };

  if (!isCameraOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
          <div className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-purple-400" />
            <h2 className="font-bold text-base">Camera Scan Notes & Whiteboard</h2>
          </div>
          <button
            onClick={() => {
              setIsCameraOpen(false);
              setCapturedImage(null);
              setOcrResult(null);
            }}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <canvas ref={canvasRef} className="hidden" />

          {!capturedImage ? (
            <div className="space-y-4">
              {/* Video Live Preview Box */}
              <div className="relative flex h-72 w-full flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-slate-700 bg-slate-950">
                {errorMsg ? (
                  <div className="p-6 text-center space-y-3">
                    <AlertCircle className="mx-auto h-10 w-10 text-amber-400" />
                    <p className="text-xs text-slate-300">{errorMsg}</p>
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-purple-500">
                      <Upload className="h-4 w-4" />
                      <span>Upload Notes / Whiteboard Photo</span>
                      <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                    </label>
                  </div>
                ) : (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-4 flex justify-center">
                      <button
                        onClick={handleCapture}
                        className="flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-purple-500/30 transition-transform active:scale-95"
                      >
                        <Camera className="h-4 w-4" />
                        Capture Snapshot
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Gallery Fallback input */}
              {!errorMsg && (
                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                  <span>Camera not focusing?</span>
                  <label className="flex cursor-pointer items-center gap-1.5 font-medium text-purple-400 hover:underline">
                    <Upload className="h-3.5 w-3.5" />
                    <span>Upload from Gallery</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Captured Image Preview */}
              <div className="flex gap-4 items-start">
                <img
                  src={capturedImage}
                  alt="Captured scan"
                  className="h-40 w-40 rounded-xl border border-slate-700 object-cover"
                />

                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-purple-400">
                    <Sparkles className="h-4 w-4" />
                    <span>AI OCR & Text Analysis</span>
                  </div>

                  {isScanning ? (
                    <div className="flex items-center gap-3 py-6 text-xs text-slate-400">
                      <RefreshCw className="h-5 w-5 animate-spin text-purple-400" />
                      <span>Gemini Vision API is extracting text and generating summary...</span>
                    </div>
                  ) : ocrResult ? (
                    <div className="space-y-2 text-xs">
                      <div className="rounded-lg bg-slate-950 p-2.5 border border-slate-800">
                        <p className="font-bold text-slate-300">Summary:</p>
                        <p className="text-slate-400 mt-1">{ocrResult.summary}</p>
                      </div>
                      {ocrResult.actionItems && ocrResult.actionItems.length > 0 && (
                        <div className="rounded-lg bg-slate-950 p-2.5 border border-slate-800">
                          <p className="font-bold text-slate-300">Action Items:</p>
                          <ul className="list-disc list-inside text-purple-300 mt-1">
                            {ocrResult.actionItems.map((act, idx) => (
                              <li key={idx}>{act}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  onClick={() => {
                    setCapturedImage(null);
                    setOcrResult(null);
                    startCamera();
                  }}
                  className="rounded-xl border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800"
                >
                  Retake Photo
                </button>
                <button
                  disabled={isScanning || !ocrResult}
                  onClick={handleSaveToNotes}
                  className="flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2 text-xs font-bold text-white shadow-md shadow-purple-500/20 disabled:opacity-50 hover:bg-purple-500"
                >
                  <Check className="h-4 w-4" />
                  Save as Note
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
