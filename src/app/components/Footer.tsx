import { MapPin, Github, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#3C3226] text-[#D4C4B0] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Логотип и описание */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-6 h-6 text-[#C19A6B]" />
              <h3 className="text-xl text-[#F5F1E8]">
                Спрятанный город
              </h3>
            </div>
            <p className="text-sm leading-relaxed">
              Цифровой исторический атлас о спасении архитектурного наследия
              блокадного Ленинграда
            </p>
          </div>

          {/* Навигация */}
          <div>
            <h4 className="text-[#F5F1E8] mb-4 uppercase tracking-wider text-sm">
              Навигация
            </h4>
            <nav className="space-y-2 text-sm">
              <a
                href="#map"
                className="block hover:text-[#C19A6B] transition-colors"
              >
                Карта памятников
              </a>
              <a
                href="#about"
                className="block hover:text-[#C19A6B] transition-colors"
              >
                О проекте
              </a>
              <a
                href="#sources"
                className="block hover:text-[#C19A6B] transition-colors"
              >
                Источники и архивы
              </a>
              <a
                href="#how-to"
                className="block hover:text-[#C19A6B] transition-colors"
              >
                Как пользоваться
              </a>
            </nav>
          </div>

          {/* Контакты */}
          <div>
            <h4 className="text-[#F5F1E8] mb-4 uppercase tracking-wider text-sm">
              Контакты
            </h4>
            <div className="space-y-3 text-sm">
              <a
                href="mailto:info@hidden-city.example"
                className="flex items-center gap-2 hover:text-[#C19A6B] transition-colors"
              >
                <Mail className="w-4 h-4" />
                info@hidden-city.example
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#C19A6B] transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub проекта
              </a>
            </div>
          </div>
        </div>

        {/* Разделитель */}
        <div className="border-t border-[#6B5D54] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>
              © {currentYear} Спрятанный город. Исторический проект.
            </p>
            <p className="text-xs">
              Создано с уважением к памяти защитников культурного наследия
              Ленинграда
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
