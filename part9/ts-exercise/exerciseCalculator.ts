interface CalExerResultInf {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

function calculateExercises(weeks: Array<number>, target: number): CalExerResultInf {
    console.log(weeks);
    const exerciseInfo: CalExerResultInf = {
        periodLength: 2,
        trainingDays: 5,
        success: false,
        rating: 3,
        ratingDescription: 'goodgoodstudy',
        target,
        average: 1.3345
    };
    
    return exerciseInfo;
}

export {
    CalExerResultInf,
    calculateExercises
};