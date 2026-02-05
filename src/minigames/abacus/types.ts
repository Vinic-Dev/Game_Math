export interface AbacusColumn {
    id: string;
    label: string;
    name: string;
    value: number; // 1, 10, 100, etc.
    color: string;
    ringColor: string;
    ringBorder: string;
}

export const COLUMNS: AbacusColumn[] = [
    { id: 'umi', label: 'UMi', name: 'Unidade de Milhão', value: 1000000, color: 'bg-purple-600', ringColor: 'bg-purple-600', ringBorder: 'border-purple-800' },
    { id: 'cm', label: 'CM', name: 'Centena de Milhar', value: 100000, color: 'bg-cyan-600', ringColor: 'bg-cyan-600', ringBorder: 'border-cyan-800' },
    { id: 'dm', label: 'DM', name: 'Dezena de Milhar', value: 10000, color: 'bg-blue-600', ringColor: 'bg-blue-600', ringBorder: 'border-blue-800' },
    { id: 'um', label: 'UM', name: 'Unidade de Milhar', value: 1000, color: 'bg-slate-100', ringColor: 'bg-slate-100', ringBorder: 'border-slate-300' },
    { id: 'c', label: 'C', name: 'Centena', value: 100, color: 'bg-zinc-900', ringColor: 'bg-zinc-900', ringBorder: 'border-zinc-950' },
    { id: 'd', label: 'D', name: 'Dezena', value: 10, color: 'bg-red-600', ringColor: 'bg-red-600', ringBorder: 'border-red-800' },
    { id: 'u', label: 'U', name: 'Unidade', value: 1, color: 'bg-green-600', ringColor: 'bg-green-600', ringBorder: 'border-green-800' },
];
