export type Operation = '*';

export interface MathProblem {
    question: string;
    answer: number;
    options: number[];
}

export const generateMathProblem = (level: number): MathProblem => {
    const difficultyMultiplier = Math.ceil(level / 2);
    const operation: Operation = '*';

    let n1 = 0, n2 = 0;
    let answer = 0;

    // Progressão de dificuldade:
    // níveis baixos → tabuadas simples
    // níveis altos → números maiores
    n1 = Math.floor(Math.random() * (5 * difficultyMultiplier)) + 1;
    n2 = Math.floor(Math.random() * (5 * difficultyMultiplier)) + 1;

    answer = n1 * n2;

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
