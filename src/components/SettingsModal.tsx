import { Settings, X } from 'lucide-react';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    debugMode: boolean;
    onDebugModeChange: (enabled: boolean) => void;
}

export const SettingsModal = ({ isOpen, onClose, debugMode, onDebugModeChange }: SettingsModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-zinc-900 border-2 border-zinc-700 rounded-lg shadow-2xl w-full max-w-md mx-4 p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <Settings className="text-zinc-400" size={24} />
                        <h2 className="text-xl font-bold text-white">Configurações</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-zinc-400 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Settings Options */}
                <div className="space-y-4">
                    {/* Debug Mode Toggle */}
                    <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                        <div>
                            <h3 className="text-white font-semibold">Modo Debug</h3>
                            <p className="text-sm text-zinc-400 mt-1">
                                Pressione 'N' para avançar fases nos minigames
                            </p>
                        </div>
                        <button
                            onClick={() => onDebugModeChange(!debugMode)}
                            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${debugMode ? 'bg-green-600' : 'bg-zinc-600'
                                }`}
                        >
                            <span
                                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${debugMode ? 'translate-x-7' : 'translate-x-1'
                                    }`}
                            />
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-6 pt-4 border-t border-zinc-700">
                    <button
                        onClick={onClose}
                        className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
};
