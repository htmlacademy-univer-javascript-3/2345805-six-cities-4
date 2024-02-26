import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import useMap from '../../hooks/use-map';
import { URL_MARKER_DEFAULT } from '../../const';
import 'leaflet/dist/leaflet.css';
import { Offer, City } from '../../types/offer';

type MapProps = {
  city: City;
  points: Offer[];
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// const currentCustomIcon = new Icon({
//   iconUrl: URL_MARKER_CURRENT,
//   iconSize: [40, 40],
//   iconAnchor: [20, 40]
// });

function CitiesMap({ city, points }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      points
        .map((e) => e.location)
        .forEach((point) => {
          const marker = new Marker({
            lat: point.latitude,
            lng: point.longitude,
          });

          marker
            // .setIcon(
            //   selectedPoint !== undefined && point.title === selectedPoint.title
            //     ? currentCustomIcon
            //     : defaultCustomIcon
            // )
            .setIcon(defaultCustomIcon)
            .addTo(markerLayer);
        });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points]);

  return <div style={{ height: '100%' }} ref={mapRef}></div>;
}

export default CitiesMap;
