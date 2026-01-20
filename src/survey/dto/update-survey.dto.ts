import { IsString, IsOptional, IsEnum, IsInt, IsNumber } from 'class-validator';
import { ContactType, SurveyStatus } from 'src/survey.entity';

export class UpdateSurveyDto {
  @IsOptional()
  @IsEnum(ContactType)
  contact_type?: string;

  @IsOptional()
  @IsString()
  first_name?: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  postal_code?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  meal_wine_preference?: string;

  @IsOptional()
  @IsString()
  purchase_purpose?: string;

  @IsOptional()
  @IsString()
  wine_region_preference?: string;

  @IsOptional()
  @IsString()
  purchase_location?: string;

  @IsOptional()
  @IsString()
  purchaser?: string;

  @IsOptional()
  @IsInt()
  birth_year?: number;

  @IsOptional()
  @IsString()
  employment_status?: string;

  @IsOptional()
  @IsString()
  spouse_status?: string;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsOptional()
  @IsEnum(SurveyStatus)
  status?: string;

  @IsOptional()
  @IsString()
  agent?: string;
}
