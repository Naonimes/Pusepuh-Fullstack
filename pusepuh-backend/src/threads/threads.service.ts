import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ThreadsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createThreadDto: CreateThreadDto) {
    // Cek duplikat judul (tidak peduli huruf besar/kecil)
    const judulSudahAda = await this.prisma.thread.findFirst({
      where: {
        judul: {
          equals: createThreadDto.judul,
          mode: 'insensitive',
        },
      },
    });

    if (judulSudahAda) {
      throw new ConflictException(
        `Waduh puh, Thread dengan judul "${createThreadDto.judul}" sudah pernah dibuat!`,
      );
    }

    return this.prisma.thread.create({
      data: {
        judul: createThreadDto.judul,
        author: createThreadDto.author || 'Anonim',
        kategori: createThreadDto.kategori,
        gambar: createThreadDto.gambar || 'image/opera.jpg',
        deskripsi: createThreadDto.deskripsi,
        isOriginal: createThreadDto.isOriginal ?? true,
      },
    });
  }

  async findAll() {
    return this.prisma.thread.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const thread = await this.prisma.thread.findUnique({
      where: { id },
    });

    if (!thread) {
      throw new NotFoundException(`Thread dengan ID ${id} tidak ditemukan puh!`);
    }

    return thread;
  }

  async update(id: number, updateThreadDto: UpdateThreadDto) {
    // Pastikan data dengan ID tersebut ada (otomatis throw NotFoundException jika tidak ada)
    await this.findOne(id);

    // Cek konflik judul jika judul ikut diubah
    if (updateThreadDto.judul) {
      const duplikat = await this.prisma.thread.findFirst({
        where: {
          judul: {
            equals: updateThreadDto.judul,
            mode: 'insensitive',
          },
          NOT: { id },
        },
      });

      if (duplikat) {
        throw new ConflictException(
          `Judul "${updateThreadDto.judul}" sudah dipakai di thread lain!`,
        );
      }
    }

    return this.prisma.thread.update({
      where: { id },
      data: updateThreadDto,
    });
  }

  async remove(id: number) {
    // Pastikan data ada sebelum dihapus
    await this.findOne(id);

    await this.prisma.thread.delete({
      where: { id },
    });

    return { message: `Thread dengan ID ${id} berhasil dihapus` };
  }

  async getStats() {
    const totalThreads = await this.prisma.thread.count();
    const perKategori = await this.prisma.thread.groupBy({
      by: ['kategori'],
      _count: {
        id: true,
      },
    });

    return {
      totalThreads,
      perKategori: perKategori.map((item) => ({
        board: `/${item.kategori}/`,
        jumlah: item._count.id,
      })),
    };
  }
}

