import { motion } from "motion/react";
import { Archive, FileText, Image, Library } from "lucide-react";

export function SourcesSection() {
  const sources = [
    {
      icon: Archive,
      title: "Архивы",
      items: [
        "Центральный государственный архив литературы и искусства Санкт-Петербурга (ЦГАЛИ СПб)",
        "Центральный военно-морской архив",
        "Архив Государственного Эрмитажа",
        "Архив Музея истории Санкт-Петербурга",
      ],
    },
    {
      icon: Library,
      title: "Музеи и институции",
      items: [
        "Государственный музей истории Санкт-Петербурга",
        "Государственный Эрмитаж",
        "Музей истории религии",
        "Государственный музей городской скульптуры",
      ],
    },
    {
      icon: FileText,
      title: "Документы и публикации",
      items: [
        "Инженерные чертежи защитных конструкций",
        "Блокадные дневники участников событий",
        "Научные статьи по истории блокады",
        "Отчёты архитектурно-реставрационных мастерских",
      ],
    },
    {
      icon: Image,
      title: "Фотоматериалы",
      items: [
        "Архивные фотографии 1941–1944 годов",
        "Фотодокументы защитных конструкций",
        "Современные фотографии памятников",
        "Аэрофотосъёмка блокадного Ленинграда",
      ],
    },
  ];

  return (
    <section className="py-24 px-6 bg-[#E8E3D6]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl text-[#3C3226] mb-6">
            Источники и архивы
          </h2>
          <div className="w-24 h-1 bg-[#C19A6B] mx-auto mb-6" />
          <p className="text-[#6B5D54] max-w-3xl mx-auto leading-relaxed">
            Проект основан на тщательном исследовании архивных материалов,
            исторических документов и современных научных работ.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {sources.map((source, index) => {
            const Icon = source.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#F5F1E8] p-8 rounded-lg border border-[#C4B5A0]/30 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Icon className="w-8 h-8 text-[#C19A6B]" />
                  <h3 className="text-2xl text-[#3C3226]">
                    {source.title}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {source.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-[#4A4238] pl-4 border-l-2 border-[#C19A6B]/30"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 p-8 bg-[#D4C4B0] rounded-lg"
        >
          <h3 className="text-xl text-[#3C3226] mb-4">
            Научная достоверность
          </h3>
          <p className="text-[#4A4238] leading-relaxed">
            Все данные, представленные в проекте, проверены и подтверждены
            архивными документами. Проект создан с уважением к исторической
            правде и памяти о блокаде Ленинграда.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
