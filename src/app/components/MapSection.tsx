import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { InteractiveMap } from "./InteractiveMap";
import { ObjectCard } from "./ObjectCard";
import { monuments } from "../data/monuments";

export function MapSection() {
  const [activeMonumentId, setActiveMonumentId] = useState(monuments[0].id);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Intersection Observer для отслеживания активного объекта
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = parseInt(entry.target.getAttribute("data-id") || "1");
          setActiveMonumentId(id);
        }
      });
    }, options);

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const markers = monuments.map((m) => ({
    id: m.id,
    x: m.coordinates.x,
    y: m.coordinates.y,
    isActive: m.id === activeMonumentId,
  }));

  const handleMarkerClick = (id: number) => {
    const index = monuments.findIndex((m) => m.id === id);
    if (index !== -1 && cardRefs.current[index]) {
      cardRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <section ref={containerRef} className="relative bg-[#E8E3D6]">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Карта - фиксированная на desktop */}
        <div className="lg:sticky lg:top-0 lg:h-screen lg:w-1/2 w-full h-[55vh] lg:h-screen p-4 lg:p-8 flex items-center justify-center">
          <motion.div
            className="w-full h-full max-w-2xl max-h-[640px] bg-[#F5F1E8] rounded-[24px] shadow-2xl overflow-hidden border border-[#C4B5A0]/35"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <InteractiveMap markers={markers} onMarkerClick={handleMarkerClick} />
          </motion.div>
        </div>

        {/* Карточки объектов */}
        <div className="lg:w-1/2 w-full p-4 lg:p-8 lg:pl-4">
          <div className="max-w-2xl mx-auto space-y-8 py-8">
            {/* Заголовок секции */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl text-[#3C3226] mb-4">
                Памятники, спасённые от войны
              </h2>
              <p className="text-[#6B5D54] leading-relaxed text-sm lg:text-base">
                Прокручивайте страницу, чтобы познакомиться с историей защиты
                архитектурного наследия Ленинграда в годы блокады. На карте
                отмечены объекты в пределах современного Санкт-Петербурга.
              </p>
            </motion.div>

            {/* Карточки */}
            {monuments.map((monument, index) => (
              <div
                key={monument.id}
                ref={(el) => (cardRefs.current[index] = el)}
                data-id={monument.id}
                className="min-h-[70vh] lg:min-h-[80vh] flex items-center"
              >
                <ObjectCard
                  monument={monument}
                  isActive={monument.id === activeMonumentId}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
