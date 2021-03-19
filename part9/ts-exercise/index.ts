import express from 'express';
import bmiCalculator from './bmiCalculator';
import { CalExerResultInf, calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/Hello', (_req, res) => {
    res.send('<p>Hello full stack!!</p>');
});

app.get('/bmi', (req, res) => {
    interface Result {
        weight: number,
        height: number,
        bmi: string
    }

    const params: Array<string> = req.originalUrl.slice(5).split('&');
    const values: Array<number> = params.map(p => {
        return Number(p.slice(7));
    })
    
    const ret: Result = {
        weight: values[0],
        height: values[1],
        bmi: bmiCalculator(values[0], values[1])
    }

    res.json(ret);
});

app.post('/exercises', (req, res) => {
    const { daily_exercises, target } = req.body;
    const ret: CalExerResultInf = calculateExercises(daily_exercises, target);

    res.json(ret);
});

app.listen(3000, () => {
    console.log('server running on 3000');
});