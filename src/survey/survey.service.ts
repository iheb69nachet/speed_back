import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Survey, SurveyStatus } from '../survey.entity';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey)
    private surveyRepository: Repository<Survey>,
  ) {}

  create(survey: Omit<Survey, 'id' | 'status'>): Promise<Survey> {
    const newSurvey = this.surveyRepository.create(survey);
    return this.surveyRepository.save(newSurvey);
  }

  findAll(): Promise<Survey[]> {
    return this.surveyRepository.find({ where: { status: SurveyStatus.ACTIVE } }).then(surveys =>
      surveys.map(survey => {
        for (const key in survey) {
          if (typeof survey[key] === 'string') {
            survey[key] = survey[key].toUpperCase();
          }
        }
        return survey;
      })
    );
  }

  findArchived(): Promise<Survey[]> {
    return this.surveyRepository.find({ where: { status: SurveyStatus.ARCHIVED } }).then(surveys =>
      surveys.map(survey => {
        for (const key in survey) {
          if (typeof survey[key] === 'string') {
            survey[key] = survey[key].toUpperCase();
          }
        }
        return survey;
      })
    );
  }

  async updateStatus(ids: number[], status: SurveyStatus): Promise<void> {
    await this.surveyRepository.update({ id: In(ids) }, { status });
  }

  async update(id: number, survey: Partial<Survey>): Promise<Survey> {
    const existingSurvey = await this.surveyRepository.preload({
      id,
      ...survey,
    });
    if (!existingSurvey) {
      throw new Error(`Survey with ID ${id} not found`);
    }
    return this.surveyRepository.save(existingSurvey);
  }
}
