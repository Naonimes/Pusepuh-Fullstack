import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { Thread } from './entities/thread.entity';

@Injectable()
export class ThreadsService {
  // Data awal diambil dari state App.jsx kamu sebelumnya (Syarat Poin 3)
  private threads: Thread[] = [
    {
      id: 1,
      judul: 'Vibes Landscape ala Scene Film',
      author: 'akumahmasihpemula',
      kategori: 'g',
      gambar: 'image/opera.jpg',
      deskripsi: 'Hai ges! Aku lagi seneng banget bikin gambar-gambar background landscape...',
      likes: 12,
      isOriginal: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      judul: 'Ada yang Bikin Komik Sendiri?',
      author: 'YesKing67',
      kategori: 't',
      gambar: 'image/komik.jpg',
      deskripsi: 'sumpah disini ada yg pernah bikin komik sendiri ga?',
      likes: 5,
      isOriginal: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 3,
      judul: 'Karakter Original',
      author: 'Kape',
      kategori: 'g',
      gambar: 'image/kape.jpg',
      deskripsi: 'Kenalin ini OC baru aku!',
      likes: 20,
      isOriginal: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 4,
      judul: 'Fanart Haruhi',
      author: 'Kyon',
      kategori: 'h',
      gambar: 'image/haruhi.jpg',
      deskripsi: 'Iseng bikin fanart Haruhi Suzumiya.',
      likes: 8,
      isOriginal: false,
      createdAt: new Date().toISOString(),
    },
  ];

  create(createThreadDto: CreateThreadDto): Thread {
    // Skenario Error 1: ConflictException jika judul thread sudah ada (Syarat Poin 6)
    const judulSudahAda = this.threads.find(
      (t) => t.judul.toLowerCase() === createThreadDto.judul.toLowerCase(),
    );
    if (judulSudahAda) {
      throw new ConflictException(`Waduh puh, Thread dengan judul "${createThreadDto.judul}" sudah pernah dibuat!`);
    }

    const threadBaru: Thread = {
      id: this.threads.length > 0 ? this.threads[this.threads.length - 1].id + 1 : 1,
      judul: createThreadDto.judul,
      author: createThreadDto.author || 'Anonim',
      kategori: createThreadDto.kategori,
      gambar: createThreadDto.gambar || 'image/opera.jpg',
      deskripsi: createThreadDto.deskripsi,
      likes: 0,
      isOriginal: createThreadDto.isOriginal ?? true,
      createdAt: new Date().toISOString(),
    };

    this.threads.push(threadBaru);
    return threadBaru;
  }

  findAll(): Thread[] {
    return this.threads;
  }

  findOne(id: number): Thread {
    const thread = this.threads.find((t) => t.id === id);
    // Skenario Error 2: NotFoundException jika ID tidak ditemukan (Syarat Poin 6)
    if (!thread) {
      throw new NotFoundException(`Thread dengan ID ${id} tidak ditemukan puh!`);
    }
    return thread;
  }

  update(id: number, updateThreadDto: UpdateThreadDto): Thread {
    const thread = this.findOne(id); // Akan melempar NotFoundException jika id tidak ada

    // Cek konflik judul saat update
    if (updateThreadDto.judul) {
      const duplikat = this.threads.find(
        (t) => t.judul.toLowerCase() === updateThreadDto.judul!.toLowerCase() && t.id !== id,
      );
      if (duplikat) {
        throw new ConflictException(`Judul "${updateThreadDto.judul}" sudah dipakai di thread lain!`);
      }
    }

    Object.assign(thread, updateThreadDto);
    return thread;
  }

  remove(id: number): { message: string } {
    const index = this.threads.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new NotFoundException(`Gagal menghapus! Thread dengan ID ${id} tidak ada.`);
    }
    this.threads.splice(index, 1);
    return { message: `Thread dengan ID ${id} berhasil dihapus` };
  }
}