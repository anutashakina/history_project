import { motion } from "motion/react";
import { MapPin, Calendar, Info } from "lucide-react";
import type { Monument } from "../data/monuments";

interface ObjectCardProps {
  monument: Monument;
  isActive: boolean;
}

export function ObjectCard({ monument, isActive }: ObjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{
        opacity: isActive ? 1 : 0.4,
        y: isActive ? 0 : 20,
        scale: isActive ? 1 : 0.95,
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-[#F5F1E8]/95 backdrop-blur-sm rounded-lg shadow-2xl overflow-hidden border border-[#C4B5A0]/30"
    >
      <div className="p-6 lg:p-8">
        {/* Заголовок */}
        <div className="flex items-start gap-3 mb-4">
          <MapPin className="w-5 h-5 text-[#C19A6B] flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-xl lg:text-2xl text-[#3C3226] mb-2">
              {monument.name}
            </h3>
            <div className="flex items-center gap-2 text-xs lg:text-sm text-[#6B5D54]">
              <Calendar className="w-4 h-4" />
              <span>{monument.period}</span>
            </div>
          </div>
        </div>

        {/* Описание */}
        <div className="mb-6">
          <p className="text-sm lg:text-base text-[#4A4238] leading-relaxed">
            {monument.description}
          </p>
        </div>

        {/* Блок "Тогда / Сейчас" - заглушка */}
        <div className="mb-6">
          <h4 className="text-sm uppercase tracking-wider text-[#8B7D6B] mb-3">
            Тогда / Сейчас
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#E5DFD0] rounded-md h-40 flex items-center justify-center text-[#8B7D6B] text-sm">
              Архивное фото
            </div>
            <div className="bg-[#E5DFD0] rounded-md h-40 flex items-center justify-center text-[#8B7D6B] text-sm">
              Современное фото
            </div>
          </div>
        </div>

        {/* Защитные конструкции */}
        <div className="mb-6 p-5 bg-[#E8E3D6] rounded-md">
          <h4 className="text-sm uppercase tracking-wider text-[#6B5D54] mb-2 flex items-center gap-2">
            <Info className="w-4 h-4" />
            Защитные конструкции
          </h4>
          <p className="text-sm text-[#4A4238] leading-relaxed">
            {monument.protection}
          </p>
        </div>

        {/* Галерея чертежей - заглушка */}
        <div className="mb-6">
          <h4 className="text-sm uppercase tracking-wider text-[#8B7D6B] mb-3">
            Архивные документы
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {monument.images.archive.map((img, idx) => (
              <div
                key={idx}
                className="bg-[#E5DFD0] rounded h-24 flex items-center justify-center text-xs text-[#8B7D6B]"
              >
                Чертёж {idx + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Источники */}
        <div className="pt-4 border-t border-[#C4B5A0]/40">
          <h4 className="text-xs uppercase tracking-wider text-[#8B7D6B] mb-2">
            Источники
          </h4>
          <ul className="text-xs text-[#6B5D54] space-y-1">
            {monument.sources.map((source, idx) => (
              <li key={idx}>• {source}</li>
            ))}
          </ul>
        </div>

        {/* Кнопка "Подробнее" */}
        <button className="mt-6 w-full py-3 px-6 bg-[#8B7355] hover:bg-[#6B5D54] text-[#F5F1E8] rounded transition-colors duration-300 text-sm uppercase tracking-wider">
          Подробнее
        </button>
      </div>
    </motion.div>
  );
}
