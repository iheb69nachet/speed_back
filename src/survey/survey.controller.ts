import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { Survey, SurveyStatus } from '../survey.entity';
import { UpdateSurveyDto } from './dto/update-survey.dto';

@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Post()
  create(@Body() survey: Omit<Survey, 'id' | 'status'>): Promise<Survey> {
    return this.surveyService.create(survey);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSurveyDto: UpdateSurveyDto): Promise<Survey> {
    return this.surveyService.update(Number(id), updateSurveyDto);
  }

  @Get()
  findAll(): Promise<Survey[]> {
    return this.surveyService.findAll();
  }

  @Get('archived')
  findArchived(): Promise<Survey[]> {
    return this.surveyService.findArchived();
  }

  @Post('archive')
  archive(@Body('ids') ids: number[]): Promise<void> {
    return this.surveyService.updateStatus(ids, SurveyStatus.ARCHIVED);
  }

  @Post('unarchive')
  unarchive(@Body('ids') ids: number[]): Promise<void> {
    return this.surveyService.updateStatus(ids, SurveyStatus.ACTIVE);
  }
}
