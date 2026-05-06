import { motion } from "framer-motion";
import { MapPin, Calendar, Info } from "lucide-react";
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

interface Monument {
    id: number;
    name: string;
    period: string;
    description: string;
    protection: string;
    images: {
        modern: string;
        archive: string[];
    };
    sources: string[];
}

interface ObjectCardProps {
    monument: Monument;
    isActive: boolean;
}

export function ObjectCard({ monument, isActive }: ObjectCardProps) {
    const archiveImg = monument?.images?.archive?.[0] || "";
    const modernImg = monument?.images?.modern || "";

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{
                opacity: isActive ? 1 : 0.4,
                y: isActive ? 0 : 20,
                scale: isActive ? 1 : 0.95,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-[#F5F1E8] rounded-[48px] shadow-2xl overflow-hidden border border-[#C4B5A0]/30 p-10 lg:p-12 w-full max-w-2xl"
        >
            {/* 1. Заголовок */}
            <div className="flex items-center gap-3 mb-2">
                <MapPin className="w-7 h-7 text-[#C19A6B]" />
                <h3 className="text-3xl lg:text-4xl text-[#3C3226] font-serif tracking-tight">
                    {monument?.name}
                </h3>
            </div>

            {/* 2. Период */}
            <div className="flex items-center gap-2 text-[#6B5D54] mb-8 ml-1">
                <Calendar className="w-5 h-5 text-[#8B7D6B]/70" />
                <span className="text-lg">{monument?.period}</span>
            </div>

            {/* 3. Описание */}
            <div className="mb-10 text-[#4A4238] text-lg leading-relaxed font-light">
                {monument?.description}
            </div>

            {/* 4. ТОГДА / СЕЙЧАС */}
            <div className="mb-10">
                <h4 className="text-[13px] uppercase tracking-[0.2em] text-[#8B7D6B] mb-5 font-semibold">
                    ТОГДА / СЕЙЧАС
                </h4>
                <div className="rounded-2xl overflow-hidden aspect-[16/9] bg-[#E5DFD0] border border-[#C4B5A0]/20 shadow-sm">
                    <ReactCompareSlider
                        itemOne={<ReactCompareSliderImage src={archiveImg} alt="Архив" />}
                        itemTwo={<ReactCompareSliderImage src={modernImg} alt="Современность" />}
                        style={{ width: '100%', height: '100%' }}
                    />
                </div>
            </div>

            {/* 5. ЗАЩИТНЫЕ КОНСТРУКЦИИ */}
            <div className="bg-[#E8E3D6]/70 p-8 rounded-3xl mb-10">
                <div className="flex items-center gap-3 text-[#8B7D6B] mb-4">
                    <Info className="w-6 h-6" />
                    <h4 className="text-[13px] uppercase tracking-[0.2em] font-bold text-[#8B7D6B]">
                        ЗАЩИТНЫЕ КОНСТРУКЦИИ
                    </h4>
                </div>
                <p className="text-[#4A4238] text-lg leading-relaxed">
                    {monument?.protection}
                </p>
            </div>

            {/* 6. АРХИВНЫЕ ДОКУМЕНТЫ */}
            <div className="mb-10">
                <h4 className="text-[13px] uppercase tracking-[0.2em] text-[#8B7D6B] mb-5 font-semibold">
                    АРХИВНЫЕ ДОКУМЕНТЫ
                </h4>
                <div className="grid grid-cols-2 gap-5">
                    <div className="bg-[#E5DFD0] rounded-2xl h-44 flex items-center justify-center text-[#8B7D6B] text-base border border-[#C4B5A0]/20">Чертёж 1</div>
                    <div className="bg-[#E5DFD0] rounded-2xl h-44 flex items-center justify-center text-[#8B7D6B] text-base border border-[#C4B5A0]/20">Чертёж 2</div>
                </div>
            </div>

            {/* 7. ИСТОЧНИКИ*/}
            <div className="pt-8 mt-10 border-t border-[#C4B5A0]/60">
                <h4 className="text-[13px] uppercase tracking-[0.2em] text-[#8B7D6B] mb-5 font-semibold">
                    ИСТОЧНИКИ
                </h4>
                <ul className="text-[#4A4238] text-base lg:text-lg space-y-1">
                    {monument?.sources && monument.sources.length > 0 ? (
                        monument.sources.map((source, idx) => (
                            <li key={idx}>• {source}</li>
                        ))
                    ) : (
                        <>
                            <li>• Военный архив</li>
                            <li>• Фотодокументы ГМИП</li>
                        </>
                    )}
                </ul>
            </div>

            {/* 8. КНОПКА ПОДРОБНЕЕ */}
            <button className="mt-10 w-full py-5 bg-[#8B7355] hover:bg-[#766248] text-white rounded-xl transition-all duration-300 text-base uppercase tracking-[0.3em] font-bold shadow-md active:scale-[0.98]">
                ПОДРОБНЕЕ
            </button>
        </motion.div>
    );
}