import { motion } from "framer-motion";
import { MapPin, Calendar, Info, RefreshCw } from "lucide-react";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { getFileUrl, urlFor } from "../lib/sanityClient";

// Вьюер для фото с размытым фоном (решает проблему масштаба)
const SmartViewer = ({ source, isActive, alt }: { source: any; isActive: boolean; alt: string }) => {
    const url = getFileUrl(source);
    if (!url) return <div className="bg-[#E5DFD0] w-full h-full flex items-center justify-center text-[#8B7D6B] text-xs font-serif">Нет данных</div>;

    return (
        <motion.div
            initial={false}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 w-full h-full bg-[#E5DFD0]"
        >
            <div
                className="absolute inset-0 scale-110 blur-md opacity-30"
                style={{ backgroundImage: `url(${url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            />
            <img src={url} alt={alt} className="relative z-10 w-full h-full object-contain" />
        </motion.div>
    );
};

const renderSourceLink = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, i) => (
        urlRegex.test(part) ? (
            <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-[#8B7355] underline hover:no-underline break-all">
                {part.replace('https://', '').replace('http://', '').split('/')[0]}...
            </a>
        ) : <span key={i}>{part}</span>
    ));
};

export function ObjectCard({ monument, isActive }: { monument: any; isActive: boolean }) {
    const [viewMode, setViewMode] = useState<'then' | 'now'>('then');
    const protectionPoints = monument?.protection ? monument.protection.split('\n').filter((p: any) => p.trim() !== '') : [];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isActive ? 1 : 0.4, y: isActive ? 0 : 20, scale: isActive ? 1 : 0.95 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-[#F5F1E8]/95 backdrop-blur-sm rounded-lg shadow-2xl overflow-hidden border border-[#C4B5A0]/30"
        >
            <div className="p-6 lg:p-8">
                {/* Заголовок */}
                <div className="flex items-start gap-3 mb-4">
                    <MapPin className="w-5 h-5 text-[#C19A6B] mt-1" />
                    <div>
                        <h3 className="text-xl lg:text-2xl text-[#3C3226] mb-2 font-serif">{monument.name}</h3>
                        <div className="flex items-center gap-2 text-xs text-[#6B5D54]">
                            <Calendar className="w-4 h-4" /><span>{monument.period}</span>
                        </div>
                    </div>
                </div>

                <p className="text-sm lg:text-base text-[#4A4238] leading-relaxed mb-6">{monument.description}</p>

                {/* Сравнение Тогда/Сейчас */}
                <div className="mb-6">
                    <h4 className="text-sm uppercase tracking-wider text-[#8B7D6B] mb-3 font-medium">Тогда / Сейчас</h4>
                    <div className="rounded-md overflow-hidden aspect-[4/3] bg-[#E5DFD0] relative border border-[#C4B5A0]/20">
                        <SmartViewer source={monument.archive_image} isActive={viewMode === 'then'} alt="Архив" />
                        <SmartViewer source={monument.modern_image} isActive={viewMode === 'now'} alt="Сейчас" />

                        <button
                            onClick={() => setViewMode(viewMode === 'then' ? 'now' : 'then')}
                            className="absolute bottom-4 right-4 z-20 bg-[#C19A6B] text-white p-3 rounded-full shadow-lg transition-transform active:scale-90 flex items-center gap-2"
                        >
                            <RefreshCw className={`w-4 h-4 ${viewMode === 'now' ? 'rotate-180' : ''} transition-transform duration-500`} />
                            <span className="text-[10px] uppercase tracking-widest font-bold pr-1">Сравнить</span>
                        </button>
                    </div>
                </div>

                {/* Защитные конструкции */}
                <div className="mb-6 p-5 bg-[#E8E3D6] rounded-md">
                    <h4 className="text-sm uppercase tracking-wider text-[#6B5D54] mb-2 flex items-center gap-2">
                        <Info className="w-4 h-4" />Защитные конструкции
                    </h4>
                    <ul className="text-sm text-[#4A4238] space-y-1">
                        {protectionPoints.map((p: any, i: number) => <li key={i}>• {p}</li>)}
                    </ul>
                </div>

                {/* АРХИВНЫЕ ДОКУМЕНТЫ (НОВАЯ ВЕРСТКА) */}
                {monument?.archive_documents && monument.archive_documents.length > 0 && (
                    <div className="mb-6">
                        <h4 className="text-sm uppercase tracking-wider text-[#8B7D6B] mb-3 font-medium">Архивные документы</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {monument.archive_documents.map((doc: any, i: number) => (
                                <div key={i} className="group relative">
                                    <div className="bg-[#E5DFD0] rounded-md overflow-hidden h-32 border border-[#C4B5A0]/20">
                                        <img
                                            src={urlFor(doc.image).width(400).url()}
                                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                            alt={doc.caption || "Документ"}
                                        />
                                    </div>
                                    {doc.caption && (
                                        <p className="mt-1 text-[10px] text-[#8B7D6B] italic leading-tight">{doc.caption}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Источники */}
                <div className="pt-4 border-t border-[#C4B5A0]/40">
                    <h4 className="text-xs uppercase tracking-wider text-[#8B7D6B] mb-2 font-medium">Источники</h4>
                    <ul className="text-xs text-[#6B5D54] space-y-1">
                        {monument?.sources?.map((s: string, i: number) => (
                            <li key={i}>• {renderSourceLink(s)}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.div>
    );
}