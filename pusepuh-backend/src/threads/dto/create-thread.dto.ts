import { IsString, IsNotEmpty, MinLength, IsIn, IsOptional, IsBoolean } from 'class-validator';

export class CreateThreadDto {
  @IsString()
  @IsNotEmpty({ message: 'Judul tidak boleh kosong!' })
  @MinLength(3, { message: 'Judul karya minimal 3 karakter puh!' })
  judul: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsString()
  @IsIn(['g', 'k', 't', 'h', 'q', 'r'], {
    message: 'Kategori board harus salah satu dari: g, k, t, h, q, atau r',
  })
  kategori: string;

  @IsOptional()
  @IsString()
  gambar?: string;

  @IsString()
  @MinLength(5, { message: 'Deskripsi minimal 5 karakter!' })
  deskripsi: string;

  @IsOptional()
  @IsBoolean()
  isOriginal?: boolean;
}