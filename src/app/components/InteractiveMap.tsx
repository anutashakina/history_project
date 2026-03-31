import { motion } from "motion/react";
import { MapPin } from "lucide-react";

interface MapMarker {
  id: number;
  x: number;
  y: number;
  isActive: boolean;
}

interface InteractiveMapProps {
  markers: MapMarker[];
  onMarkerClick?: (id: number) => void;
}

export function InteractiveMap({ markers, onMarkerClick }: InteractiveMapProps) {
  return (
    <div className="relative w-full h-full bg-[#E8E3D6]">
      {/* Текстура бумаги */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238B7355' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="absolute inset-x-5 top-4 z-10 flex items-start justify-between text-[10px] uppercase tracking-[0.28em] text-[#6F6456]/80 pointer-events-none">
        <span>Санкт-Петербург</span>
        <span>Исторический атлас</span>
      </div>

      {/* Фоновая карта - стилизованная под архивную подложку */}
      <svg
        viewBox="0 0 800 600"
        className="w-full h-full"
        aria-hidden="true"
        style={{ filter: "sepia(0.22)" }}
      >
        <defs>
          <linearGradient id="paperWash" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F6F2E8" />
            <stop offset="55%" stopColor="#EFE8DB" />
            <stop offset="100%" stopColor="#E4DAC7" />
          </linearGradient>
          <linearGradient id="waterTint" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8E8A80" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#7A766C" stopOpacity="0.18" />
          </linearGradient>
          <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#6B5D54" floodOpacity="0.18" />
          </filter>
        </defs>

        <rect width="800" height="600" fill="url(#paperWash)" />

        <g opacity="0.15" stroke="#9A8E7D" strokeWidth="1">
          {Array.from({ length: 9 }).map((_, i) => (
            <path
              key={`contour-${i}`}
              d={`M ${90 + i * 6} ${110 + i * 14} C ${220 + i * 12} ${60 + i * 8}, ${545 - i * 8} ${72 + i * 10}, ${720 - i * 7} ${180 + i * 20} S ${690 - i * 4} ${498 - i * 12}, ${534 - i * 18} ${535 - i * 6} S ${180 + i * 8} ${548 - i * 4}, ${96 + i * 4} ${420 - i * 10}`}
              fill="none"
            />
          ))}
        </g>

        {/* Очертания современного Санкт-Петербурга */}
        <path
          d="M 118 192 C 144 144, 214 112, 286 102 C 372 90, 470 98, 556 114 C 638 130, 698 162, 730 214 C 758 258, 752 320, 724 370 C 698 418, 652 452, 592 482 C 534 510, 460 530, 386 534 C 304 540, 234 528, 182 498 C 132 470, 102 430, 88 378 C 74 326, 78 258, 118 192 Z"
          fill="#D8CEBB"
          opacity="0.7"
          stroke="#6E6358"
          strokeWidth="2"
          filter="url(#softShadow)"
        />

        {/* Акватория Невской дельты и Финского залива */}
        <path
          d="M 54 346 C 108 332, 150 310, 212 308 C 284 306, 330 332, 396 330 C 470 328, 520 284, 592 284 C 648 284, 698 312, 754 340 L 754 566 L 48 566 Z"
          fill="url(#waterTint)"
          opacity="0.72"
        />
        <path
          d="M 90 278 C 148 250, 210 238, 278 236 C 326 234, 372 242, 418 242 C 458 242, 504 226, 546 212 C 602 194, 654 194, 708 220"
          stroke="#6E6A62"
          strokeWidth="34"
          fill="none"
          opacity="0.36"
          strokeLinecap="round"
        />
        <path
          d="M 154 256 C 230 280, 266 314, 328 330 C 384 344, 448 344, 510 332 C 576 318, 632 290, 700 286"
          stroke="#6E6A62"
          strokeWidth="20"
          fill="none"
          opacity="0.28"
          strokeLinecap="round"
        />
        <path
          d="M 204 208 C 248 230, 294 252, 344 256 C 396 260, 444 248, 494 234"
          stroke="#6E6A62"
          strokeWidth="14"
          fill="none"
          opacity="0.22"
          strokeLinecap="round"
        />

        {/* Острова и центральное ядро города */}
        <g fill="#E8E0D0" stroke="#76695C" strokeWidth="1.2" opacity="0.95">
          <path d="M 236 236 C 280 214, 340 210, 388 224 C 416 232, 430 252, 420 272 C 406 298, 362 316, 312 316 C 266 316, 226 302, 214 276 C 206 258, 214 246, 236 236 Z" />
          <path d="M 404 218 C 444 200, 500 202, 540 220 C 564 230, 576 248, 570 264 C 560 288, 522 304, 478 304 C 438 304, 402 292, 388 270 C 378 252, 384 228, 404 218 Z" />
          <path d="M 336 326 C 370 314, 412 314, 448 324 C 474 332, 486 350, 478 366 C 468 388, 434 404, 392 406 C 354 406, 320 392, 308 372 C 298 352, 310 334, 336 326 Z" />
          <path d="M 518 326 C 548 314, 588 316, 620 332 C 640 342, 650 356, 644 372 C 636 392, 608 406, 572 410 C 542 410, 514 400, 500 384 C 486 366, 492 338, 518 326 Z" />
        </g>

        <g stroke="#6A5D50" strokeWidth="1.4" opacity="0.24">
          <path d="M 188 196 C 254 176, 324 166, 396 168 C 474 170, 548 184, 612 214" fill="none" />
          <path d="M 170 252 C 246 244, 312 250, 384 268 C 446 282, 512 288, 580 286" fill="none" />
          <path d="M 192 408 C 262 438, 338 452, 418 448 C 500 444, 576 420, 642 380" fill="none" />
          <path d="M 286 150 L 312 506" />
          <path d="M 414 126 L 432 514" />
          <path d="M 534 148 L 514 500" />
        </g>

        <g fill="#5C5046" opacity="0.72" fontSize="16" fontFamily="Georgia, serif">
          <text x="472" y="212">Нева</text>
          <text x="86" y="528" fontSize="14">Финский залив</text>
          <text x="270" y="176" fontSize="14">Петроградская сторона</text>
          <text x="388" y="392" fontSize="14">Адмиралтейская часть</text>
        </g>

        {/* Декоративные уголки - стиль старых карт */}
        <g stroke="#8B7355" strokeWidth="1.5" fill="none" opacity="0.34">
          {/* Верхний левый */}
          <path d="M 30 30 L 30 80 M 30 30 L 80 30" />
          <path d="M 35 35 L 35 75 M 35 35 L 75 35" />

          {/* Верхний правый */}
          <path d="M 770 30 L 770 80 M 770 30 L 720 30" />
          <path d="M 765 35 L 765 75 M 765 35 L 725 35" />

          {/* Нижний левый */}
          <path d="M 30 570 L 30 520 M 30 570 L 80 570" />
          <path d="M 35 565 L 35 525 M 35 565 L 75 565" />

          {/* Нижний правый */}
          <path d="M 770 570 L 770 520 M 770 570 L 720 570" />
          <path d="M 765 565 L 765 525 M 765 565 L 725 565" />
        </g>

        {/* Пятна бумаги */}
        <g opacity="0.08">
          <ellipse cx="150" cy="150" rx="40" ry="30" fill="#8B7355" />
          <ellipse cx="650" cy="450" rx="35" ry="45" fill="#8B7355" />
          <ellipse cx="700" cy="100" rx="30" ry="25" fill="#8B7355" />
          <ellipse cx="100" cy="500" rx="45" ry="35" fill="#8B7355" />
        </g>
      </svg>

      {/* Метки памятников */}
      <div className="absolute inset-0">
        {markers.map((marker) => (
          <motion.div
            key={marker.id}
            className="absolute cursor-pointer"
            style={{
              left: `${marker.x}%`,
              top: `${marker.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            onClick={() => onMarkerClick?.(marker.id)}
            initial={{ scale: 0.8, opacity: 0.6 }}
            animate={{
              scale: marker.isActive ? 1.3 : 1,
              opacity: marker.isActive ? 1 : 0.6,
            }}
            whileHover={{ scale: marker.isActive ? 1.4 : 1.2 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div
              className={`relative ${
                marker.isActive
                  ? "text-[#C19A6B]"
                  : "text-[#8B7D6B]"
              }`}
            >
              <MapPin
                className="w-8 h-8 drop-shadow-lg"
                fill={marker.isActive ? "#C19A6B" : "#6B5D54"}
                strokeWidth={1.5}
              />
              {marker.isActive && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  initial={{ scale: 1, opacity: 0.8 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                >
                  <div className="w-full h-full border-2 border-[#C19A6B] rounded-full" />
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Декоративная рамка */}
      <div
        className="absolute inset-0 pointer-events-none border-4 border-[#6B5D54]/30 shadow-inner"
        style={{ boxShadow: "inset 0 0 30px rgba(107, 93, 84, 0.2)" }}
      />
    </div>
  );
}
