import { Injectable } from '@nestjs/common';
import { VisitsRepository } from '@pinpoint/resources/visits/visits.repository';
import { CreateVisitInput, PinVisitSelectType } from './types/visits.types';

@Injectable()
export class VisitsService {
  constructor(private readonly visitsRepository: VisitsRepository) {}

  async create(
    userId: string,
    createVisitInput: CreateVisitInput,
  ): Promise<PinVisitSelectType> {
    return await this.visitsRepository.insertVisit({
      pinId: createVisitInput.pinId,
      userId,
      visitDate: createVisitInput.visitedAt
        ? new Date(createVisitInput.visitedAt)
        : new Date(),
    });
  }


  
}
