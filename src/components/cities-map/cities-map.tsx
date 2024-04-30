import { useEffect, useRef } from 'react';
import useMap from './use-map';
import 'leaflet/dist/leaflet.css';
import { Icon, layerGroup, Marker } from 'leaflet';
import { Location, ExtendedOffer, Offer } from '../../types/offer';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const';

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

type CitiesMapProps = {
  centerCoordinates: Location;
  offers: Offer[];
  selectedOfferId?: Offer['id'];
  scrollWheelZoom?: boolean;
  currentOffer?: ExtendedOffer;
};

function CitiesMap(props: CitiesMapProps): JSX.Element {
  const {
    centerCoordinates,
    offers,
    selectedOfferId,
    scrollWheelZoom,
    currentOffer,
  } = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, centerCoordinates, scrollWheelZoom);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      if (currentOffer) {
        const marker = new Marker({
          lat: currentOffer.location.latitude,
          lng: currentOffer.location.longitude,
        });

        marker.setIcon(currentCustomIcon).addTo(markerLayer);
      }

      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker
          .setIcon(
            selectedOfferId !== undefined && offer.id === selectedOfferId
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [currentOffer, map, offers, selectedOfferId]);

  useEffect(() => {
    if (map) {
      map.flyTo([centerCoordinates.latitude, centerCoordinates.longitude]);
    }
  }, [centerCoordinates, map]);

  return <div style={{ height: '100%' }} ref={mapRef}></div>;
}

export default CitiesMap;
