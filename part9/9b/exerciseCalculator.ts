interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const exerciseCalculator = (exerciseData: Array<number>, target: number): Object => {
  const periodLength: number = exerciseData.length;
  const trainingDays: number = exerciseData.filter(d => d !== 0 ).length;
  const totalTrainingHours = exerciseData.filter(d => d !== 0).reduce((a, b) => a + b, 0);
  const success = totalTrainingHours > target * 7;
  const average = exerciseData.reduce((a, b) => a + b, 0) / periodLength;
  let rating: number, ratingDescription: string;
  const getRating = () => {
    if(target >= average) {
      rating = 3;
      ratingDescription = 'Very good';
    } else if (0.75 * target <= average && 0.85 * target >= average) {
      rating = 2;
      ratingDescription = 'Could be better';
    } else {
      rating = 1;
      ratingDescription = 'Work harder!';
    }
  }
  getRating();
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2));