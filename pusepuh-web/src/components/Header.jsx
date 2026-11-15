import { useState } from 'react';
import CategoryBoard_103022400061 from './CategoryBoard';

export default function Header_103022400061({ halamanAktif_103022400061, pindahHalaman_103022400061, bukaBoard }) {
    const [munculCari_103022400061, setMunculCari_103022400061] = useState(true);

    function toggleCari_103022400061() {
        setMunculCari_103022400061(!munculCari_103022400061);
    }

    return (
        <header className="bg-blue-500 text-white p-4 text-center w-full">
            <nav className="flex justify-between items-center m-4">
                <div className="flex gap-4">
                    <button onClick={() => pindahHalaman_103022400061("home")} className={`font-bold text-lg cursor-pointer ${halamanAktif_103022400061 === "home" ? "text-yellow-300" : "text-white"}`}>
                        Home
                    </button>
                    <button onClick={() => pindahHalaman_103022400061("thread")} className={`font-bold text-lg cursor-pointer ${halamanAktif_103022400061 === "thread" ? "text-yellow-300" : "text-white"}`}>
                        New Thread
                    </button>
                </div>
                <button className="font-bold text-white text-lg cursor-pointer hover:text-gray-200">Mode</button>
            </nav>

            {/* Area Pencarian & Tombol Board selalu muncul di atas agar user gampang pindah board */}
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
                        <input type="search" placeholder="Ketik kata kunci di sini..." className="p-4 w-full max-w-3xl mx-auto border border-gray-300 rounded-lg mt-2 text-gray-800 bg-white block" />
                        <button type="button" className="bg-white text-gray-800 font-bold py-2 px-6 rounded mt-2 cursor-pointer hover:bg-gray-200">Cari</button>
                    </form>
                )}

                {/* Tombol-tombol navigasi board */}
                <nav className="m-4 flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
                    <button onClick={() => bukaBoard("g")} className="bg-white text-gray-800 px-4 py-2 border border-gray-300 rounded-lg font-bold text-sm hover:bg-blue-100">/g/ - Gambar</button>
                    <button onClick={() => bukaBoard("k")} className="bg-white text-gray-800 px-4 py-2 border border-gray-300 rounded-lg font-bold text-sm hover:bg-blue-100">/k/ - Krisar</button>
                    <button onClick={() => bukaBoard("t")} className="bg-white text-gray-800 px-4 py-2 border border-gray-300 rounded-lg font-bold text-sm hover:bg-blue-100">/t/ - Tanya</button>
                    <button onClick={() => bukaBoard("h")} className="bg-white text-gray-800 px-4 py-2 border border-gray-300 rounded-lg font-bold text-sm hover:bg-blue-100">/h/ - Hobi</button>
                    <button onClick={() => bukaBoard("q")} className="bg-white text-gray-800 px-4 py-2 border border-gray-300 rounded-lg font-bold text-sm hover:bg-blue-100">/q/ - Feedback</button>
                    <button onClick={() => bukaBoard("r")} className="bg-white text-gray-800 px-4 py-2 border border-gray-300 rounded-lg font-bold text-sm hover:bg-blue-100">/r/ - Random</button>
                </nav>
            </>
        </header>
    );
}