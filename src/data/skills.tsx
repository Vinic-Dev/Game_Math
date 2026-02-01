import React from 'react';
import {
    Sword, Shield, Compass
} from 'lucide-react';

export interface Skill {
    id: string;
    name: string;
    desc: string;
}

export interface ModuleData {
    id: string;
    title: string;
    icon: React.ReactNode;
    color: 'emerald' | 'slate' | 'blue' | 'purple' | 'amber' | 'red' | 'cyan' | 'indigo' | 'yellow';
    skills: Skill[];
}

export const SKILLS_DATA: ModuleData[] = [
    {
        id: 'm1',
        title: 'Módulo 1: Floresta dos Números',
        icon: <Sword className="w-6 h-6" />,
        color: 'emerald',
        skills: [
            { id: '01', name: 'Golpe Numérico', desc: 'Conjuntos N e Z. A base de todo ataque físico.' },
            { id: '02', name: 'Corte de Fatores', desc: 'Divisibilidade e MMC. Divida para conquistar.' },
            { id: '03', name: 'Escudo Racional I', desc: 'Frações. Proteção contra danos fracionados.' },
            { id: '04', name: 'Escudo Racional II', desc: 'Decimais e Dízimas. Precisão na defesa.' },
            { id: '05', name: 'Explosão de Raiz', desc: 'Potências e Raízes. Dano em escala exponencial.' },
            { id: '06', name: 'Visão de Proporção', desc: 'Razões e Escalas. Enxergue o tamanho do inimigo.' },
            { id: '07', name: 'Regra de Três', desc: 'Grandezas Proporcionais. O equilíbrio das forças.' },
            { id: '08', name: 'Crítico de %', desc: 'Cálculo de porcentagem. Aumente seu dano crítico.' },
            { id: '09', name: 'Mina de Ouro', desc: 'Juros Simples e Compostos. Acúmulo de recursos.' },
        ]
    },
    {
        id: 'm2',
        title: 'Módulo 2: Portão de Ferro',
        icon: <Shield className="w-6 h-6" />,
        color: 'slate',
        skills: [
            { id: '10', name: 'Invocação de X', desc: 'Variáveis e Polinômios. O desconhecido vira arma.' },
            { id: '11', name: 'Equilíbrio 1º Grau', desc: 'Equações. Mantenha os pratos da balança nivelados.' },
            { id: '12', name: 'Barreira Inequação', desc: 'Desigualdades. Defina limites de terreno.' },
            { id: '13', name: 'Elo de Função', desc: 'Conceito de dependência. Conecte causas a efeitos.' },
            { id: '14', name: 'Trilha Afim', desc: 'Gráficos de Reta. Trace o caminho mais curto.' },
            { id: '15', name: 'Análise de Sinal', desc: 'Estudo da Função. Saiba quando atacar ou recuar.' },
            { id: '16', name: 'Rede de Sistemas', desc: 'Substituição e Adição. Resolva múltiplos problemas.' },
        ]
    },
    {
        id: 'm3',
        title: 'Módulo 3: Labirinto de Formas',
        icon: <Compass className="w-6 h-6" />,
        color: 'blue',
        skills: [
            { id: '17', name: 'Foco de Ponto', desc: 'Ângulos e Retas. A precisão do arqueiro.' },
            { id: '18', name: 'Muralha Polígono', desc: 'Soma de Ângulos. Fortifique seu perímetro.' },
            { id: '19', name: 'Trindade Força', desc: 'Triângulos. A forma mais estável da masmorra.' },
            { id: '20', name: 'Espelho Tales', desc: 'Semelhança. Projete sua força em outras escalas.' },
            { id: '21', name: 'Lâmina Pitágoras', desc: 'Triângulo Retângulo. O corte mais famoso do jogo.' },
            { id: '22', name: 'Sopro Trigon.', desc: 'Seno e Cosseno básicos. Ataques em ângulos variados.' },
            { id: '23', name: 'Domínio Área', desc: 'Quadriláteros. Conquiste o terreno plano.' },
            { id: '24', name: 'Círculo Arcano', desc: 'Circunferência. Defesa mágica em 360 graus.' },
        ]
    }
];

export const colorMap: Record<string, string> = {
    emerald: 'from-emerald-500 to-emerald-700 shadow-emerald-900/50',
    slate: 'from-slate-500 to-slate-700 shadow-slate-900/50',
    blue: 'from-blue-500 to-blue-700 shadow-blue-900/50',
    purple: 'from-purple-500 to-purple-700 shadow-purple-900/50',
    amber: 'from-amber-500 to-amber-700 shadow-amber-900/50',
    red: 'from-red-500 to-red-700 shadow-red-900/50',
    cyan: 'from-cyan-500 to-cyan-700 shadow-cyan-900/50',
    indigo: 'from-indigo-500 to-indigo-700 shadow-indigo-900/50',
    yellow: 'from-yellow-400 to-yellow-600 shadow-yellow-800/50',
};
