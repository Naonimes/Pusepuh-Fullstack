import { useState } from 'react';

export default function Header_103022400061({
    halamanAktif_103022400061,
    pindahHalaman_103022400061,
    bukaBoard,
    darkMode,
    toggleDarkMode
}) {
    const [munculCari_103022400061, setMunculCari_103022400061] = useState(true);

    function toggleCari_103022400061() {
        setMunculCari_103022400061(!munculCari_103022400061);
    }

    const boardBtnClass = darkMode
        ? "bg-gray-800 text-gray-100 border-gray-600 hover:bg-gray-700"
        : "bg-white text-gray-800 border-gray-300 hover:bg-blue-100";

    return (
        <header className={`${darkMode ? "bg-gray-950 border-b border-gray-800" : "bg-blue-500"} text-white p-4 text-center w-full transition-colors duration-200`}>
            <nav className="flex justify-between items-center m-4">
                <div className="flex gap-4">
                    <button onClick={() => pindahHalaman_103022400061("home")} className={`font-bold text-lg cursor-pointer ${halamanAktif_103022400061 === "home" ? "text-yellow-300" : "text-white"}`}>
                        Home
                    </button>
                    <button onClick={() => pindahHalaman_103022400061("thread")} className={`font-bold text-lg cursor-pointer ${halamanAktif_103022400061 === "thread" ? "text-yellow-300" : "text-white"}`}>
                        New Thread
                    </button>
                </div>

                {/* Tombol Dark Mode yang sudah berfungsi */}
                <button
                    onClick={toggleDarkMode}
                    className="font-bold text-white text-lg cursor-pointer hover:text-yellow-300 transition"
                >
                    {darkMode ? "☀️ Mode Terang" : "🌙 Mode Gelap"}
                </button>
            </nav>

            <>
                <h1
                    className="text-4xl font-bold mt-2 cursor-pointer hover:text-gray-200"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                    onClick={() => pindahHalaman_103022400061("home")}
                >
                    pusepuh
                </h1>

                <button onClick={toggleCari_103022400061} className="bg-gray-800 text-white font-bold py-2 px-4 rounded m-4 cursor-pointer hover:bg-gray-700">
                    Tampilkan/Sembunyikan Pencarian
                </button>

                {munculCari_103022400061 && (
                    <form className="m-4">
                        <label className="text-xl font-semibold block">Cari karya atau diskusi:</label>
                        <input
                            type="search"
                            placeholder="Ketik kata kunci di sini..."
                            className={`p-4 w-full max-w-3xl mx-auto border rounded-lg mt-2 block ${darkMode ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-800"}`}
                        />
                        <button type="button" className={`font-bold py-2 px-6 rounded mt-2 cursor-pointer ${darkMode ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-white text-gray-800 hover:bg-gray-200"}`}>
                            Cari
                        </button>
                    </form>
                )}

                <nav className="m-4 flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
                    <button onClick={() => bukaBoard("g")} className={`px-4 py-2 border rounded-lg font-bold text-sm cursor-pointer ${boardBtnClass}`}>/g/ - Gambar</button>
                    <button onClick={() => bukaBoard("k")} className={`px-4 py-2 border rounded-lg font-bold text-sm cursor-pointer ${boardBtnClass}`}>/k/ - Krisar</button>
                    <button onClick={() => bukaBoard("t")} className={`px-4 py-2 border rounded-lg font-bold text-sm cursor-pointer ${boardBtnClass}`}>/t/ - Tanya</button>
                    <button onClick={() => bukaBoard("h")} className={`px-4 py-2 border rounded-lg font-bold text-sm cursor-pointer ${boardBtnClass}`}>/h/ - Hobi</button>
                    <button onClick={() => bukaBoard("q")} className={`px-4 py-2 border rounded-lg font-bold text-sm cursor-pointer ${boardBtnClass}`}>/q/ - Feedback</button>
                    <button onClick={() => bukaBoard("r")} className={`px-4 py-2 border rounded-lg font-bold text-sm cursor-pointer ${boardBtnClass}`}>/r/ - Random</button>
                </nav>
            </>
        </header>
    );
}