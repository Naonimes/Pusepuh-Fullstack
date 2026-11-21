-- CreateTable
CREATE TABLE "Thread" (
    "id" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "author" TEXT NOT NULL DEFAULT 'Anonim',
    "kategori" TEXT NOT NULL,
    "gambar" TEXT NOT NULL DEFAULT 'image/opera.jpg',
    "deskripsi" TEXT NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "isOriginal" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Thread_pkey" PRIMARY KEY ("id")
);
