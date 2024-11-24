import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';

const MyMap = () => {
  const [markers, setMarkers] = useState([]);

  const handleMapPress = (e) => {
    setMarkers([...markers, {
      coordinate: e.nativeEvent.coordinate,
      title: 'New Marker'
    }]);
  };

  return (
    <MapView style={{ flex: 1 }} onPress={handleMapPress}>
      {markers.map((marker, index) => (
        <Marker
          key={index}
          coordinate={marker.coordinate}
          title={marker.title}
        />
      ))}
    </MapView>
  );
};

export default MyMap;