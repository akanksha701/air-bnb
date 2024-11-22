'use client';
import L from 'leaflet';
import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Set up icons

//@ts-expect-error @typescript-eslint/ban-ts-comment
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
});

interface MapProps {
    center?: number[]
}

const Map: React.FC<MapProps> = ({ center }) => {
    const mapRef = useRef<L.Map | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Clean up existing map
        if (mapRef.current) {
            mapRef.current.remove();
            mapRef.current = null;
        }

        const defaultCenter: L.LatLngExpression = center ? [center[0], center[1]] : [51.505, -0.09];

        // Create new map instance
        const map = L.map(containerRef.current).setView(defaultCenter, center ? 4 : 2);
        mapRef.current = map;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        if (center) {
            L.marker(defaultCenter).addTo(map);
        }

        // Cleanup on unmount
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [center]);

    return (
        <div 
            ref={containerRef} 
            className="h-[35vh] rounded-lg"
        />
    );
};

export default Map;
