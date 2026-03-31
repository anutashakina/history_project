import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

interface HeroSectionProps {
  onStartClick: () => void;
}

export function HeroSection({ onStartClick }: HeroSectionProps) {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#3C3226] via-[#4A4238] to-[#5A5248]">
      {/* Фоновый паттерн */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 35px, #F5F1E8 35px, #F5F1E8 36px),
              repeating-linear-gradient(90deg, transparent, transparent 35px, #F5F1E8 35px, #F5F1E8 36px)
            `,
          }}
        />
      </div>

      {/* Декоративные элементы */}
      <motion.div
        className="absolute top-20 left-20 w-2 h-40 bg-[#C19A6B]/20"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      />
      <motion.div
        className="absolute bottom-32 right-32 w-40 h-2 bg-[#C19A6B]/20"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />

      {/* Контент */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Надпись сверху */}
          <div className="mb-6 text-[#C19A6B] text-sm uppercase tracking-[0.3em]">
            Историко-культурный проект
          </div>

          {/* Заголовок */}
          <h1 className="mb-6 text-[#F5F1E8]">
            <span className="block text-6xl md:text-7xl mb-2">
              Спрятанный
            </span>
            <span className="block text-6xl md:text-7xl">
              город
            </span>
          </h1>

          {/* Подзаголовок */}
          <p className="text-xl md:text-2xl text-[#D4C4B0] max-w-2xl mx-auto leading-relaxed mb-12">
            Цифровой исторический атлас о спасении архитектурного наследия
            блокадного Ленинграда
          </p>

          {/* Дополнительная информация */}
          <p className="text-sm text-[#B4A594] max-w-xl mx-auto mb-12 leading-relaxed">
            1941–1944 годы. Город в блокаде. Но даже в самые тяжёлые дни
            ленинградцы защищали не только свои жизни, но и культурное
            наследие — памятники архитектуры, которые определяли облик города.
          </p>

          {/* Кнопка */}
          <motion.button
            onClick={onStartClick}
            className="group relative px-10 py-4 bg-[#C19A6B] hover:bg-[#B08A5B] text-[#3C3226] rounded transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-sm uppercase tracking-wider">
              Начать путешествие
            </span>
          </motion.button>
        </motion.div>

        {/* Стрелка вниз */}
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ChevronDown className="w-8 h-8 text-[#C19A6B]/60" />
          </motion.div>
        </motion.div>
      </div>

      {/* Градиент снизу */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#E8E3D6] to-transparent" />
    </section>
  );
}
