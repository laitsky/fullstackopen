const calculateBmi = (height: number, weight: number): string => {
  const bmiResult: number = (weight / Math.pow(height, 2)) * 10000;

  if (bmiResult < 15) {
    return "Very severly underweight";
  }
  if (bmiResult >= 15 && bmiResult < 16) {
    return "Severely underweight";
  }
  if (bmiResult >= 16 && bmiResult < 18.5) {
    return "Underweight";
  }
  if (bmiResult >= 18.5 && bmiResult < 25) {
    return "Normal (healthy weight)";
  }
  if (bmiResult >= 25 && bmiResult < 30) {
    return "Overweight";
  }
  if (bmiResult >= 30 && bmiResult < 35) {
    return "Obese Class I (Moderately obese)";
  }
  if (bmiResult >= 35 && bmiResult < 40) {
    return "Obese Class II (Severely obese)";
  }

  return "Obese Class III (Very severely obese";
  
}

console.log(calculateBmi(180, 74));