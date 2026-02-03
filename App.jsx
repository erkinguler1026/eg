import React, { useState } from 'react';
import SwotTable from './components/SwotTable';
import useSwot from './hooks/useSwot';
import useExport from './hooks/useExport';
// import Navbar from './components/Navbar'; // Removed for manual merge
// import Footer from './components/Footer'; // Removed for manual merge
import FileManager from './components/FileManager';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Download, ChevronDown, FileText, ImageIcon, FileSpreadsheet, FileCode, ArrowLeft } from 'lucide-react'; // Imports for Navbar


// --- MERGED COMPONENT: Navbar ---
const Navbar = ({ onExport, onBack }) => {
    const [isOpen, setIsOpen] = useState(false);

    const exportOptions = [
        { id: 'pdf', label: 'Export to PDF', icon: <FileText size={16} />, color: 'text-red-500', hoverBg: 'hover:bg-red-50' },
        { id: 'jpg', label: 'Export to JPG', icon: <ImageIcon size={16} />, color: 'text-blue-500', hoverBg: 'hover:bg-blue-50' },
        { id: 'docx', label: 'Export to DOCX', icon: <FileCode size={16} />, color: 'text-indigo-500', hoverBg: 'hover:bg-indigo-50' },
        { id: 'xlsx', label: 'Export to XLSX', icon: <FileSpreadsheet size={16} />, color: 'text-emerald-500', hoverBg: 'hover:bg-emerald-50' },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo / Title */}
                    <div className="flex items-center gap-4">
                        {onBack && (
                            <button 
                                onClick={onBack}
                                className="group flex flex-col items-center justify-center p-1 -ml-3 mr-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                                title="Dosya Listesine Dön"
                            >
                                <ArrowLeft size={20} strokeWidth={3} className="text-gray-500 group-hover:text-blue-600" />
                                <span className="text-[10px] font-bold leading-none mt-0.5 text-gray-500 group-hover:text-blue-600">Listeye Dön</span>
                            </button>
                        )}
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">S</span>
                            </div>
                            <span className="text-xl font-extrabold text-gray-900 tracking-tight hidden sm:block">
                                SWOT <span className="text-blue-600">ANALYZER</span>
                            </span>
                        </div>
                    </div>

                    {/* Export Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="cursor-pointer flex items-center gap-2 bg-white text-gray-700 border border-gray-200 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900 transition-all active:scale-95 shadow-sm"
                        >
                            <Download size={18} />
                            <span className="hidden sm:inline">Print / Export</span>
                            <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isOpen && (
                            <>
                                <div 
                                    className="fixed inset-0 z-10" 
                                    onClick={() => setIsOpen(false)}
                                ></div>
                                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white border border-gray-100 shadow-xl z-20 overflow-hidden py-1 animate-in fade-in zoom-in duration-200 origin-top-right">
                                    {exportOptions.map((option) => (
                                        <button
                                            key={option.id}
                                            onClick={() => {
                                                onExport(option.id);
                                                setIsOpen(false);
                                            }}
                                            className={`cursor-pointer w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 ${option.hoverBg} transition-colors text-left group`}
                                        >
                                            <span className={`${option.color} group-hover:scale-110 transition-transform`}>
                                                {option.icon}
                                            </span>
                                            <span className="font-medium">{option.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

// --- MERGED COMPONENT: Footer ---
const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="bg-white border-t border-gray-100 py-8 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-center gap-4">
                    <div className="flex items-center gap-4 text-gray-400">
                        <div className="h-px w-12 bg-gray-100"></div>
                        <span className="text-sm font-medium tracking-widest uppercase">SWOT Analizi</span>
                        <div className="h-px w-12 bg-gray-100"></div>
                    </div>
                    
                    <p className="text-gray-500 text-sm font-medium">
                        Prepared by <span className="text-gray-900 font-bold">Erkin GÜLER</span>, {currentYear}
                    </p>
                    
                    <div className="flex gap-6 mt-2">
                        <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors text-xs uppercase tracking-tighter">Documentation</a>
                        <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors text-xs uppercase tracking-tighter">Support</a>
                        <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors text-xs uppercase tracking-tighter">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

function App() {
    // Auth State
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // State to track which file is currently open. null = File Manager view
    const [currentFile, setCurrentFile] = useState(null);

    // useSwot is now dependent on currentFile
    const { swot, handleAdd, handleDelete, handleUpdate } = useSwot(currentFile);

    const { handleExport: exportAction } = useExport();

    const handleExport = (format) => {
        // useExport içindeki fonksiyon swotData parametresini bekliyor (Excel için)
        exportAction(format, swot);
    };

    const handleLogin = async (username, password, callback) => {
        try {
            const res = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setIsLoggedIn(true);
                callback(true);
            } else {
                callback(false);
            }
        } catch (error) {
            console.error('Login error:', error);
            callback(false);
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setCurrentFile(null);
    };

    // 1. Show Login first
    if (!isLoggedIn) {
        return (
            <>
                <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
                <Login onLogin={handleLogin} />
            </>
        );
    }

    // 2. If no file is selected, show File Manager
    if (!currentFile) {
        return (
            <>
                <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
                <FileManager 
                    onFileSelect={(filename) => setCurrentFile(filename)} 
                    onLogout={handleLogout}
                />
            </>
        );
    }

    // 3. If a file is selected, show the main SWOT App
    return (
        <div id="app-root" className="min-h-screen bg-gray-50 flex flex-col">
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
            
            {/* Pass currentFile to Navbar to display name or handle back */}
            <Navbar onExport={handleExport} currentFile={currentFile} onBack={() => setCurrentFile(null)} />

            <main className="grow py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight uppercase">
                            SWOT ANALİZİ
                        </h1>
                        <p className="text-gray-500 mt-2 font-medium bg-white inline-block px-4 py-1 rounded-full shadow-sm border border-gray-100">
                            Dosya: <span className="text-blue-600 font-bold">{currentFile}</span>
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <SwotTable
                            title="GÜÇLÜ YÖNLER (Strengths)"
                            data={swot.strengths}
                            onAdd={(text) => handleAdd('strengths', text)}
                            onDelete={(id) => handleDelete('strengths', id)}
                            onUpdate={(id, text) => handleUpdate('strengths', id, text)}
                            placeholder="Yeni güçlü yön ekle..."
                            headerColor="bg-emerald-50 text-emerald-700"
                        />
                        <SwotTable
                            title="ZAYIF YÖNLER (Weaknesses)"
                            data={swot.weaknesses}
                            onAdd={(text) => handleAdd('weaknesses', text)}
                            onDelete={(id) => handleDelete('weaknesses', id)}
                            onUpdate={(id, text) => handleUpdate('weaknesses', id, text)}
                            placeholder="Yeni zayıf yön ekle..."
                            headerColor="bg-rose-50 text-rose-700"
                        />
                        <SwotTable
                            title="FIRSATLAR (Opportunities)"
                            data={swot.opportunities}
                            onAdd={(text) => handleAdd('opportunities', text)}
                            onDelete={(id) => handleDelete('opportunities', id)}
                            onUpdate={(id, text) => handleUpdate('opportunities', id, text)}
                            placeholder="Yeni fırsat ekle..."
                            headerColor="bg-sky-50 text-sky-700"
                        />
                        <SwotTable
                            title="TEHDİTLER (Threats)"
                            data={swot.threats}
                            onAdd={(text) => handleAdd('threats', text)}
                            onDelete={(id) => handleDelete('threats', id)}
                            onUpdate={(id, text) => handleUpdate('threats', id, text)}
                            placeholder="Yeni tehdit ekle..."
                            headerColor="bg-amber-50 text-amber-700"
                        />
                    </div>

                    <div className="mt-8">
                        <SwotTable
                            title="DEĞERLENDİRMELER (Conclusions)"
                            data={swot.conclusions}
                            onAdd={(text) => handleAdd('conclusions', text)}
                            onDelete={(id) => handleDelete('conclusions', id)}
                            onUpdate={(id, text) => handleUpdate('conclusions', id, text)}
                            placeholder="Yeni değerlendirme ekle..."
                            headerColor="bg-indigo-50 text-indigo-700"
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default App;
