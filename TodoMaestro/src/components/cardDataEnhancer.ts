// cardDataEnhancer.ts
import { bookmark, bookmarkOutline, reader } from 'ionicons/icons';

export const createEnhancedCardData = (
  jobData: JobData,
  actions: Action[]
): EnhancedJobData => {
  return {
    ...jobData,
    actions,
  };
};