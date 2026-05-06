import * as React from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import * as L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { MapPin } from 'lucide-react';

import 'leaflet/dist/leaflet.css';

// 1. Настройка границ: Санкт-Петербург и Ленинградская область

const SPB_BOUNDS: L.LatLngBoundsExpression = [
    [58.5, 27.5],
    [61.5, 34.0]
];

function MapFlyController({ center }: { center: [number, number] }) {
    const map = useMap();
    React.useEffect(() => {
        map.flyTo(center, 15, { duration: 1.5 });
    }, [center, map]);
    return null;
}

const CENTER_SPB: [number, number] = [59.9386, 30.3141];

// 2. Создаем красивую иконку маркера
const createCustomIcon = (isActive: boolean) => {
    const iconMarkup = renderToStaticMarkup(
        <div className={`relative ${isActive ? "text-[#C19A6B]" : "text-[#8B7D6B]"}`}>
            <MapPin
                className="w-10 h-10 drop-shadow-xl"
                fill={isActive ? "#C19A6B" : "#6B5D54"}
                strokeWidth={1.5}
            />
            {isActive && (
                <div className="absolute inset-0 w-10 h-10 bg-[#C19A6B] rounded-full animate-ping opacity-20" />
            )}
        </div>
    );

    return L.divIcon({
        html: iconMarkup,
        className: 'custom-marker-icon',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
    });
};

// Типы данных для пропсов
export interface MapMarker {
    id: number;
    lat: number;
    lng: number;
    isActive: boolean;
}

interface InteractiveMapProps {
    markers: MapMarker[];
    onMarkerClick?: (id: number) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ markers, onMarkerClick }) => {
    const activeMarker = markers.find((m: any) => m.isActive);
    const currentCenter: [number, number] = activeMarker ? [activeMarker.lat, activeMarker.lng] : CENTER_SPB;
    return (
        <div className="relative w-full h-[650px] bg-[#E8E3D6] rounded-2xl overflow-hidden border-4 border-[#6B5D54]/30 shadow-2xl">

            {/* ТЕКСТУРА БУМАГИ  */}
            <div
                className="absolute inset-0 pointer-events-none z-[1000] mix-blend-multiply opacity-40"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.1'/%3E%3C/svg%3E")`,
                }}
            />

            {/* ГРАДИЕНТ СЕПИИ ПОВЕРХ КАРТЫ */}
            <div className="absolute inset-0 pointer-events-none z-[999] bg-[#C19A6B]/20 mix-blend-color" />
            <div className="absolute inset-0 pointer-events-none z-[999] shadow-[inset_0_0_100px_rgba(107,93,84,0.5)]" />

            {/* ИНТЕРАКТИВНАЯ КАРТА */}
            <MapContainer
                center={CENTER_SPB}
                zoom={11}
                minZoom={9}
                maxZoom={15}
                maxBounds={SPB_BOUNDS}
                maxBoundsViscosity={1.0}
                zoomControl={false}
                attributionControl={false}
                style={{ height: '100%', width: '100%', background: '#E8E3D6' }}
            >
                <MapFlyController center={currentCenter} />
                {/* Слой карты*/}
                <TileLayer
                    attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
                    url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
                />

                {/* Рендерим метки памятников */}
                {markers.map((marker) => (
                    <Marker
                        key={marker.id}
                        position={[marker.lat, marker.lng]}
                        icon={createCustomIcon(marker.isActive)}
                        eventHandlers={{
                            click: () => onMarkerClick?.(marker.id),
                        }}
                    />
                ))}
            </MapContainer>

            {/* ДЕКОРАТИВНЫЕ ЭЛЕМЕНТЫ ТЕРРИТОРИИ */}
            <div className="absolute top-6 left-8 z-[1001] pointer-events-none font-serif">
                <h2 className="text-[#4A3728] text-sm uppercase tracking-[0.3em] font-bold opacity-80">
                    Цифровой атлас
                </h2>
                <div className="w-16 h-[1px] bg-[#4A3728] opacity-40 mt-1" />
            </div>

            <div className="absolute bottom-6 right-8 z-[1001] pointer-events-none font-serif text-right text-[#4A3728]/60 text-[10px] uppercase tracking-widest">
                <span>Масштаб: 1 : 50 000</span>
                <br />
                <span>Архивные данные 1941—1944 гг.</span>
            </div>

        </div>
    );
};

export default InteractiveMap;
