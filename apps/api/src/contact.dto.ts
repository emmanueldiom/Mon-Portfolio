import { IsEmail, IsOptional, IsString, Length, Matches } from 'class-validator';

export class ContactDto {
  @IsString()
  @Length(2, 80)
  name!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  @Matches(/^[0-9+().\s-]{7,25}$/)
  phone?: string;

  @IsOptional()
  @IsString()
  @Length(2, 120)
  subject?: string;

  @IsString()
  @Length(10, 3000)
  message!: string;
}
