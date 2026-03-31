import { motion } from "motion/react";
import { MousePointer, Scroll, Map as MapIcon, Smartphone } from "lucide-react";

export function HowToUseSection() {
  const instructions = [
    {
      icon: Scroll,
      title: "Прокручивайте страницу",
      description:
        "Используйте колесо мыши или скролл на тачпаде, чтобы перемещаться по карте. Каждый объект активируется автоматически при прокрутке.",
    },
    {
      icon: MapIcon,
      title: "Следите за картой",
      description:
        "На карте подсвечивается местоположение текущего активного объекта. Точки меняются по мере вашего продвижения по истории.",
    },
    {
      icon: MousePointer,
      title: "Взаимодействуйте с метками",
      description:
        "Кликайте на метки на карте, чтобы мгновенно перейти к интересующему вас памятнику и узнать его историю.",
    },
    {
      icon: Smartphone,
      title: "Доступно на всех устройствах",
      description:
        "Атлас адаптирован для просмотра на компьютерах, планшетах и смартфонах. Изучайте историю в удобном формате.",
    },
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-[#F5F1E8] to-[#E8E3D6]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl text-[#3C3226] mb-6">
            Как пользоваться картой
          </h2>
          <div className="w-24 h-1 bg-[#C19A6B] mx-auto mb-6" />
          <p className="text-[#6B5D54] max-w-2xl mx-auto leading-relaxed">
            Интерактивный атлас создан для удобного изучения истории. Следуйте
            этим простым шагам.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {instructions.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-[#F5F1E8] p-8 rounded-lg border-2 border-[#C4B5A0]/30 hover:border-[#C19A6B]/50 transition-colors duration-300 h-full">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#C19A6B] rounded-full flex items-center justify-center text-[#F5F1E8] font-bold text-xl">
                    {index + 1}
                  </div>
                  <Icon className="w-12 h-12 text-[#8B7355] mb-4" />
                  <h3 className="text-xl text-[#3C3226] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[#4A4238] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 text-center p-8 bg-[#E8E3D6] rounded-lg"
        >
          <p className="text-[#6B5D54] text-lg">
            <span className="text-[#3C3226] font-bold">Совет:</span> Для
            лучшего погружения в атмосферу проекта рекомендуем просматривать
            сайт на большом экране в спокойной обстановке.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
