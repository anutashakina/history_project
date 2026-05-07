import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { InteractiveMap } from "./InteractiveMap";
import { ObjectCard } from "./ObjectCard";
import { sanity } from "../lib/sanityClient";

export function MapSection() {
    const [monuments, setMonuments] = useState<any[]>([]);
    const [activeMonumentId, setActiveMonumentId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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
                if (entry.isIntersecting) {
                    const id = parseInt(entry.target.getAttribute("data-id") || "0");
                    if (id) setActiveMonumentId(id);
                }
            });
        }, { root: null, rootMargin: "-40% 0px -40% 0px", threshold: 0 });
        cardRefs.current.forEach((ref) => { if (ref) observer.observe(ref); });
        return () => observer.disconnect();
    }, [isLoading, monuments]);

    const handleMarkerClick = (id: number) => {
        const index = monuments.findIndex((m) => m.id === id);
        if (index !== -1 && cardRefs.current[index]) {
            cardRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };

    return (
        <section className="relative bg-[#E8E3D6]">
            <div className="flex flex-col lg:flex-row min-h-screen">
                <div className="lg:sticky lg:top-0 lg:h-screen lg:w-1/2 w-full h-[55vh] p-4 lg:p-8 flex items-center justify-center">
                    <motion.div
                        className="w-full h-full max-w-2xl max-h-[640px] bg-[#F5F1E8] rounded-[24px] shadow-2xl overflow-hidden border border-[#C4B5A0]/35"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <InteractiveMap
                            markers={monuments.map(m => ({ id: m.id, lat: m.lat, lng: m.lng, isActive: m.id === activeMonumentId }))}
                            onMarkerClick={handleMarkerClick}
                        />
                    </motion.div>
                </div>

                <div className="lg:w-1/2 w-full p-4 lg:p-8 lg:pl-4">
                    <div className="max-w-2xl mx-auto space-y-8 py-8">
                        <motion.div className="mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                            <h2 className="text-3xl lg:text-4xl text-[#3C3226] mb-4 font-serif">Памятники, спасённые от войны</h2>
                            <p className="text-[#6B5D54] leading-relaxed text-sm lg:text-base">Прокручивайте страницу, чтобы познакомиться с историей защиты архитектурного наследия Ленинграда...</p>
                        </motion.div>
                        {monuments.map((monument, index) => (
                            <div key={monument._id} ref={(el) => { cardRefs.current[index] = el; }} data-id={monument.id} className="min-h-[70vh] lg:min-h-[80vh] flex items-center">
                                <ObjectCard monument={monument} isActive={monument.id === activeMonumentId} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}