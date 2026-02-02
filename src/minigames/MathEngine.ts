export type Operation = '+' | '-' | '*';

export interface MathProblem {
    question: string;
    answer: number;
    options: number[];
}

export const generateMathProblem = (level: number): MathProblem => {
    const difficultyMultiplier = Math.ceil(level / 2);
    let operation: Operation = '+';

    // Determine operation based on level progression
    if (level <= 2) operation = '+';
    else if (level <= 4) operation = '-';
    else operation = Math.random() > 0.5 ? '*' : (Math.random() > 0.5 ? '+' : '-');

    let n1 = 0, n2 = 0;
    let answer = 0;

    switch (operation) {
        case '+':
            n1 = Math.floor(Math.random() * (10 * difficultyMultiplier)) + 1;
            n2 = Math.floor(Math.random() * (10 * difficultyMultiplier)) + 1;
            answer = n1 + n2;
            break;
        case '-':
            n1 = Math.floor(Math.random() * (15 * difficultyMultiplier)) + 5;
            n2 = Math.floor(Math.random() * n1);
            answer = n1 - n2;
            break;
        case '*':
            n1 = Math.floor(Math.random() * (5 * difficultyMultiplier)) + 1;
            n2 = Math.floor(Math.random() * (5 + level)) + 1;
            answer = n1 * n2;
            break;
    }

    const options = new Set<number>();
    options.add(answer);

    while (options.size < 4) {
        const offset = Math.floor(Math.random() * 10) - 5;
        const dummy = answer + offset;
        if (dummy !== answer && dummy >= 0) {
            options.add(dummy);
        } else if (dummy < 0) {
            options.add(Math.abs(dummy) + 2);
        }
    }

    return {
        question: `${n1} ${operation} ${n2} = ?`,
        answer: answer,
        options: Array.from(options).sort(() => Math.random() - 0.5),
    };
};
