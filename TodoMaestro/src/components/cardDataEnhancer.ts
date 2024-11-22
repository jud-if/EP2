

export const createEnhancedCardData = (
  jobData: JobData,
  actions: Action[]
): EnhancedJobData => {
  return {
    ...jobData,
    actions,
  };
};