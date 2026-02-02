export type Operation = '*';

export interface MathProblem {
    question: string;
    answer: number;
    options: number[];
}

export interface MathDistribution {
    minN1: number;
    maxN1: number;
    minN2: number;
    maxN2: number;
}

export const generateMathProblem = (dist: MathDistribution): MathProblem => {
    const n1 = Math.floor(Math.random() * (dist.maxN1 - dist.minN1 + 1)) + dist.minN1;
    const n2 = Math.floor(Math.random() * (dist.maxN2 - dist.minN2 + 1)) + dist.minN2;

    const answer = n1 * n2;

    const options = new Set<number>();
    options.add(answer);

    while (options.size < 4) {
        const offset = Math.floor(Math.random() * 10) - 5;
        const dummy = answer + offset;

        if (dummy !== answer && dummy >= 0) {
            options.add(dummy);
        }
    }

    return {
        question: `${n1} × ${n2} = ?`,
        answer: answer,
        options: Array.from(options).sort(() => Math.random() - 0.5),
    };
};
