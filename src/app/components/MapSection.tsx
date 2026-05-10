import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InteractiveMap } from "./InteractiveMap";
import { ObjectCard } from "./ObjectCard";
import { sanity } from "../lib/sanityClient";
import { BookOpen, List, MapPin } from "lucide-react";

// Кастомный кинематографичный скролл
const smoothScrollTo = (element: HTMLElement, block: 'start' | 'center' = 'start') => {
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let targetY = rect.top + scrollTop;
    if (block === 'center') {
        targetY = targetY - (window.innerHeight / 2) + (rect.height / 2);
    }
    const startY = scrollTop;
    const distance = targetY - startY;
    const duration = 1200;
    let startTime: number | null = null;
    const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    return new Promise<void>((resolve) => {
        const animation = (currentTime: number) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            window.scrollTo(0, startY + distance * easeInOutCubic(progress));
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            } else {
                resolve();
            }
        };
        requestAnimationFrame(animation);
    });
};

export function MapSection() {
    const [monuments, setMonuments] = useState<any[]>([]);
    const [activeMonumentId, setActiveMonumentId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isNavigating, setIsNavigating] = useState(false);

    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const tocRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        async function fetchMonuments() {
            const query = `*[_type == "monument"] | order(id asc)`;
            try {
                const data = await sanity.fetch(query);
                setMonuments(data);
                if (data.length > 0) setActiveMonumentId(data[0].id);
            } catch (error) {
                console.error("Ошибка базы:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchMonuments();
    }, []);

    useEffect(() => {
        if (isLoading || monuments.length === 0) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !isNavigating) {
                    const idAttr = entry.target.getAttribute("data-id");
                    if (idAttr !== null) setActiveMonumentId(Number(idAttr));
                }
            });
        }, { root: null, rootMargin: "-40% 0px -40% 0px", threshold: 0 });
        cardRefs.current.forEach((ref) => { if (ref) observer.observe(ref); });
        return () => observer.disconnect();
    }, [isLoading, monuments, isNavigating]);

    const handleNavigation = async (target: 'toc' | number) => {
        setIsNavigating(true);
        await new Promise(resolve => setTimeout(resolve, 300));

        if (target === 'toc') {
            if (tocRef.current) await smoothScrollTo(tocRef.current, 'start');
        } else {
            const index = monuments.findIndex((m) => m.id === target);
            if (index !== -1 && cardRefs.current[index]) {
                setActiveMonumentId(target);
                await smoothScrollTo(cardRefs.current[index]!, 'center');
            }
        }
        setTimeout(() => setIsNavigating(false), 500);
    };

    return (
        <section className="relative bg-[#E8E3D6] pb-24">

            <AnimatePresence>
                {isNavigating && (
                    <motion.div
                        className="fixed inset-0 z-[200] flex items-center justify-center bg-[#3C3226]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="text-center">
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <MapPin className="w-16 h-16 text-[#C19A6B] mx-auto" />
                            </motion.div>
                            <motion.p className="mt-6 text-[#D4C4B0] tracking-[0.3em] uppercase text-[10px] font-serif transition-opacity">
                                Перемещение по атласу...
                            </motion.p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {!isLoading && monuments.length > 0 && (
                <button
                    onClick={() => handleNavigation('toc')}
                    className="fixed bottom-6 right-6 z-[100] bg-[#C19A6B]/90 hover:bg-[#A8855A] text-[#F5F1E8] px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 transition-all hover:scale-105 backdrop-blur-md border border-white/10 font-serif text-[10px] uppercase tracking-[0.2em]"
                >
                    <List className="w-4 h-4" />
                    <span>В оглавление</span>
                </button>
            )}

            <div className="flex flex-col lg:flex-row min-h-screen">
                <div className="lg:sticky lg:top-0 lg:h-screen lg:w-1/2 w-full h-[55vh] p-4 lg:p-8 flex items-center justify-center">
                    <motion.div
                        className="w-full h-full bg-[#F5F1E8] rounded-[20px] shadow-2xl overflow-hidden border border-[#C4B5A0]/35"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <InteractiveMap
                            markers={monuments.map(m => ({ id: m.id, lat: m.lat, lng: m.lng, isActive: m.id === activeMonumentId }))}
                            onMarkerClick={(id) => handleNavigation(id)}
                        />
                    </motion.div>
                </div>

                {/* КАРТОЧКИ */}
                <div className="lg:w-1/2 w-full p-4 lg:p-8">
                    <div className="max-w-2xl mx-auto space-y-12 py-12">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                            <h2 className="text-4xl text-[#3C3226] mb-6 font-serif leading-tight">Памятники, спасённые от войны</h2>
                            <p className="text-[#6B5D54] leading-relaxed italic">Исследуйте историю защиты ленинградских монументов через карту и архивные записи...</p>
                        </motion.div>

                        {monuments.map((monument, index) => (
                            <div key={monument._id} ref={(el) => { cardRefs.current[index] = el; }} data-id={monument.id} className="min-h-[70vh] flex items-center">
                                <ObjectCard monument={monument} isActive={monument.id === activeMonumentId} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {!isLoading && monuments.length > 0 && (
                <div className="px-4 lg:px-8 mt-24">
                    <motion.div
                        ref={tocRef}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full bg-[#3C3226] rounded-[20px] p-8 md:p-20 shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C19A6B] opacity-[0.03] rounded-full -mr-32 -mt-32 blur-3xl" />

                        <div className="relative z-10">
                            <div className="text-center mb-16">
                                <BookOpen className="w-8 h-8 text-[#C19A6B] mx-auto mb-6 opacity-80" />
                                <h2 className="text-3xl md:text-5xl font-serif text-[#F5F1E8] mb-6 tracking-tight">Оглавление атласа</h2>
                                <div className="w-20 h-px bg-[#C19A6B]/40 mx-auto" />
                            </div>

                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                transition={{ staggerChildren: 0.05 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4"
                            >
                                {monuments.map((m, idx) => (
                                    <motion.button
                                        key={m.id}
                                        variants={{
                                            hidden: { opacity: 0, y: 10 },
                                            visible: { opacity: 1, y: 0 }
                                        }}
                                        onClick={() => handleNavigation(m.id)}
                                        className="text-left group flex items-baseline gap-4 py-3 border-b border-[#F5F1E8]/5 hover:border-[#C19A6B]/30 transition-all duration-300"
                                    >
                                        <span className="text-[#C19A6B] font-serif text-sm opacity-60 group-hover:opacity-100 transition-opacity">
                                            {String(idx + 1).padStart(2, '0')}
                                        </span>
                                        <span className="text-[#F5F1E8]/90 font-serif text-base group-hover:text-[#C19A6B] transition-colors">
                                            {m.name}
                                        </span>
                                    </motion.button>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            )}
        </section>
    );
}
