import { motion } from "motion/react";
import { Users, Book, Target, Heart } from "lucide-react";

export function AboutSection() {
  return (
    <section className="py-24 px-6 bg-[#F5F1E8]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl text-[#3C3226] mb-6">
            О проекте
          </h2>
          <div className="w-24 h-1 bg-[#C19A6B] mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="prose prose-lg max-w-none text-[#4A4238] mb-16"
        >
          <p className="leading-relaxed mb-6">
            «Спрятанный город» — это цифровой исторический атлас, посвящённый
            малоизвестной странице истории блокады Ленинграда: спасению
            монументального и архитектурного наследия города.
          </p>
          <p className="leading-relaxed mb-6">
            В самые тяжёлые дни войны ленинградские инженеры, архитекторы,
            музейные сотрудники и рабочие создавали защитные конструкции для
            памятников, эвакуировали скульптуры, маскировали купола и шпили,
            укрепляли здания. Благодаря их усилиям культурное наследие города
            было сохранено для будущих поколений.
          </p>
          <p className="leading-relaxed">
            Проект основан на архивных фотографиях, инженерных чертежах защитных
            конструкций, дневниках участников событий, научных статьях и
            современных фотографиях достопримечательностей.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-[#E8E3D6] p-8 rounded-lg"
          >
            <Target className="w-10 h-10 text-[#C19A6B] mb-4" />
            <h3 className="text-xl text-[#3C3226] mb-3">
              Цель проекта
            </h3>
            <p className="text-[#4A4238] leading-relaxed">
              Рассказать о героических усилиях по сохранению культурного
              наследия в условиях войны и показать, как выглядели защитные
              конструкции памятников.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-[#E8E3D6] p-8 rounded-lg"
          >
            <Book className="w-10 h-10 text-[#C19A6B] mb-4" />
            <h3 className="text-xl text-[#3C3226] mb-3">
              Методология
            </h3>
            <p className="text-[#4A4238] leading-relaxed">
              Каждый объект подробно исследован с использованием архивных
              документов, фотографий и современной научной литературы по истории
              блокады.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="bg-[#3C3226] text-[#F5F1E8] p-10 rounded-lg"
        >
          <Heart className="w-12 h-12 text-[#C19A6B] mb-4" />
          <h3 className="text-2xl mb-4">
            Память и благодарность
          </h3>
          <p className="leading-relaxed">
            Этот проект — дань уважения всем, кто в невероятно тяжёлых условиях
            блокады думал не только о выживании, но и о сохранении культурного
            наследия для будущих поколений. Их имена часто остались неизвестны,
            но их труд навсегда вписан в историю города.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
