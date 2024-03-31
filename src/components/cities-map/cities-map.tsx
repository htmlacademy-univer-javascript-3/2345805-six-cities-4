import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import useMap from '../../hooks/use-map';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';
import 'leaflet/dist/leaflet.css';
import { Offer } from '../../types/offer';
import { useAppSelector } from '../../hooks';

type MapProps = {
  points: Offer[];
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function CitiesMap({ points }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef);
  const selectedPoint: null | { title: string } = useAppSelector(
    (state) => state.selectedPoint
  );
  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      points.forEach((point) => {
        const { location } = point;
        const marker = new Marker({
          lat: location.latitude,
          lng: location.longitude,
        });
        marker
          .setIcon(
            selectedPoint !== null && point.title === selectedPoint.title
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPoint]);

  return <div style={{ height: '100%' }} ref={mapRef}></div>;
}

export default CitiesMap;
