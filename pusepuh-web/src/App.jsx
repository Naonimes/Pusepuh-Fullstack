import { useState, useEffect } from 'react';
import Header_103022400061 from './components/Header';
import ThreadForm_103022400061 from './components/ThreadForm';

const API_URL = 'http://localhost:3000/threads';

export default function App_103022400061() {
    const [halaman_103022400061, setHalaman_103022400061] = useState("home");
    const [boardAktif_103022400061, setBoardAktif_103022400061] = useState("");
    const [threadPilihan_103022400061, setThreadPilihan_103022400061] = useState(null);
    const [threads_103022400061, setThreads_103022400061] = useState([]);
    const [darkMode_103022400061, setDarkMode_103022400061] = useState(false); // State Dark Mode

    const toggleDarkMode_103022400061 = () => {
        setDarkMode_103022400061(!darkMode_103022400061);
    };

    // 1. GET: Ambil data dari NestJS
    const fetchThreads_103022400061 = async () => {
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            if (Array.isArray(data)) {
                setThreads_103022400061(data.reverse());
            } else {
                console.error("Format data dari backend salah:", data);
            }
        } catch (err) {
            console.error("Gagal mengambil data dari NestJS:", err);
        }
    };

    useEffect(() => {
        fetchThreads_103022400061();
    }, []);

    // 2. POST: Tambah data ke NestJS
    async function tambahThread_103022400061(threadBaru_103022400061) {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(threadBaru_103022400061),
        });
        const data = await res.json();
        if (!res.ok) {
            alert(Array.isArray(data.message) ? data.message.join(', ') : data.message);
            return false;
        }
        await fetchThreads_103022400061();
        return true;
    }

    // 3. PATCH: Edit data di NestJS
    async function editThread_103022400061(id, judulLama) {
        const judulBaru = prompt("Masukkan judul baru:", judulLama);
        if (!judulBaru) return;

        const res = await fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ judul: judulBaru }),
        });
        if (res.ok) {
            fetchThreads_103022400061();
            if (halaman_103022400061 === "full-thread") setHalaman_103022400061("home");
        } else {
            const data = await res.json();
            alert(data.message);
        }
    }

    // 4. DELETE: Hapus data di NestJS
    async function hapusThread_103022400061(id) {
        if (!confirm("Yakin ingin menghapus thread ini puh?")) return;
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (res.ok) {
            fetchThreads_103022400061();
            if (halaman_103022400061 === "full-thread") setHalaman_103022400061("home");
        }
    }

    // Navigasi
    const bukaBoard = (kategori) => {
        setBoardAktif_103022400061(kategori);
        setHalaman_103022400061("board");
    };

    const bukaFullThread = (threadData) => {
        setThreadPilihan_103022400061(threadData);
        setHalaman_103022400061("full-thread");
    };

    const filteredThreads = boardAktif_103022400061
        ? threads_103022400061.filter(t => t.kategori === boardAktif_103022400061)
        : threads_103022400061;

    // Variabel bantu warna tema
    const isDark = darkMode_103022400061;
    const cardClass = isDark
        ? "bg-gray-800 border-gray-700 text-gray-100 hover:bg-gray-750"
        : "bg-white border-gray-300 text-gray-800 hover:bg-gray-50";

    return (
        <div className={`min-h-screen w-full transition-colors duration-200 ${isDark ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"}`}>
            <Header_103022400061
                halamanAktif_103022400061={halaman_103022400061}
                pindahHalaman_103022400061={setHalaman_103022400061}
                bukaBoard={bukaBoard}
                darkMode={isDark}
                toggleDarkMode={toggleDarkMode_103022400061}
            />
            <main className="p-4">
                {halaman_103022400061 === "home" && (
                    <>
                        <h2 className={`text-xl font-bold ${isDark ? "text-gray-100" : "text-gray-800"}`}>Latest Threads</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
                            {threads_103022400061.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => bukaFullThread(item)}
                                    className={`shadow-md rounded-lg p-4 border cursor-pointer transition ${cardClass}`}
                                >
                                    {/* Menggunakan object-contain agar gambar utuh dan tidak ter-crop */}
                                    <img
                                        src={item.gambar}
                                        alt={item.judul}
                                        className={`w-full h-56 object-contain rounded mb-3 ${isDark ? "bg-gray-950" : "bg-gray-100"}`}
                                    />
                                    <h3 className="font-bold text-lg truncate">{item.judul}</h3>
                                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                                        Oleh: {item.author} | /{item.kategori}/
                                    </p>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {halaman_103022400061 === "board" && (
                    <>
                        <h2 className={`text-2xl font-bold mb-4 ${isDark ? "text-gray-100" : "text-gray-800"}`}>
                            Board: /{boardAktif_103022400061}/
                        </h2>
                        {filteredThreads.length === 0 ? (
                            <p className="text-gray-500 italic">Belum ada thread di board ini puh.</p>
                        ) : (
                            <div className="grid grid-cols-1 gap-4 mt-2">
                                {filteredThreads.map((item) => (
                                    <div key={item.id} className={`shadow-md rounded-lg p-6 border ${cardClass}`}>
                                        <h3 className="text-xl font-bold">{item.judul}</h3>
                                        <p className={`mt-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                                            Author: {item.author} | Board: /{item.kategori}/
                                        </p>
                                        <img src={item.gambar} alt={item.judul} className="max-w-xs mt-2 border rounded" />
                                        <p className="mt-2 whitespace-pre-wrap">{item.deskripsi}</p>
                                        <div className="flex gap-2 mt-4">
                                            <button onClick={() => editThread_103022400061(item.id, item.judul)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded cursor-pointer">Edit</button>
                                            <button onClick={() => hapusThread_103022400061(item.id)} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded cursor-pointer">Hapus</button>
                                            <button onClick={() => bukaFullThread(item)} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded cursor-pointer">Buka Thread</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}

                {halaman_103022400061 === "full-thread" && threadPilihan_103022400061 && (
                    <div className={`max-w-4xl mx-auto shadow-lg rounded-lg p-8 border ${isDark ? "bg-gray-800 border-gray-700 text-gray-100" : "bg-white border-blue-300 text-gray-800"}`}>
                        <div className={`border-b-2 pb-6 mb-6 ${isDark ? "border-gray-700" : "border-blue-200"}`}>
                            <h2 className={`text-3xl font-bold ${isDark ? "text-blue-400" : "text-blue-800"}`}>
                                {threadPilihan_103022400061.judul}
                            </h2>
                            <p className={`mt-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                                Thread Starter: <span className="font-bold">{threadPilihan_103022400061.author}</span> di Board: /{threadPilihan_103022400061.kategori}/
                            </p>
                            <img src={threadPilihan_103022400061.gambar} alt="Thread Image" className="max-w-md w-full mt-4 border rounded shadow" />
                            <p className={`mt-6 text-lg whitespace-pre-wrap p-4 rounded border ${isDark ? "bg-gray-900 border-gray-700 text-gray-200" : "bg-gray-50 border-gray-200 text-gray-800"}`}>
                                {threadPilihan_103022400061.deskripsi}
                            </p>

                            <div className="flex gap-2 mt-6">
                                <button onClick={() => editThread_103022400061(threadPilihan_103022400061.id, threadPilihan_103022400061.judul)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded cursor-pointer">Edit Topik</button>
                                <button onClick={() => hapusThread_103022400061(threadPilihan_103022400061.id)} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded cursor-pointer">Hapus Thread</button>
                            </div>
                        </div>

                        <div className={`p-6 rounded-lg border border-dashed ${isDark ? "bg-gray-900 border-gray-600" : "bg-gray-100 border-gray-400"}`}>
                            <h3 className="font-bold mb-2">Area Reply / Balasan</h3>
                            <p className="text-sm text-gray-500 italic">Fitur Post (Reply) di dalam thread akan diimplementasikan pada pengembangan mendatang.</p>
                            <textarea className={`w-full mt-4 p-2 border rounded ${isDark ? "bg-gray-800 border-gray-700 text-gray-300" : "bg-white"}`} rows="3" placeholder="Tulis balasan di sini..." disabled></textarea>
                            <button className="mt-2 bg-gray-500 text-white font-bold py-2 px-4 rounded cursor-not-allowed" disabled>Kirim Reply</button>
                        </div>
                    </div>
                )}

                {halaman_103022400061 === "thread" && (
                    <ThreadForm_103022400061
                        onTambah_103022400061={tambahThread_103022400061}
                        pindahHalaman_103022400061={setHalaman_103022400061}
                    />
                )}
            </main>
        </div>
    );
}