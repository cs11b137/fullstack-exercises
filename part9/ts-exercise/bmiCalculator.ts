const bmiCalculator = (weight: number, height: number): string => {
    const BMI: number = weight / Math.pow((height / 100), 2);

    if (BMI >= 28.0) {
        return `肥胖 (${weight}kg, ${height}cm)`;
    }

    if (BMI >= 24.0) {
        return `过重 (${weight}kg, ${height}cm)`;
    }

    if (BMI >= 18.5) {
        return `正常 (${weight}kg, ${height}cm)`;
    }

    return `偏瘦 (${weight}kg, ${height}cm)`;
}

export default bmiCalculator;