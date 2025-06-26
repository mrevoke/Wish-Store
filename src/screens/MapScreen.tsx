
// // src/screens/MapScreen.tsx
// import React from "react";
// import { View, StyleSheet } from "react-native";
// import MapView, { Marker, UrlTile } from "react-native-maps";
// import { wishStore } from "../stores/WishStore";
// import { observer } from "mobx-react-lite";

// export const MapScreen = observer(() => {
//   return (
//     <View style={styles.container}>
//      <MapView
//   style={{ flex: 1 }}
//   initialRegion={{
//     latitude: 20.5937,
//     longitude: 78.9629,
//     latitudeDelta: 10,
//     longitudeDelta: 10,
//   }}
// >
//   <UrlTile
//     urlTemplate="http://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
//     maximumZ={19}
//     flipY={false}
//   />
//   {wishStore.wishes.map((wish) => (
//     <Marker
//       key={wish.id}
//       coordinate={{ latitude: wish.latitude, longitude: wish.longitude }}
//       title={wish.name}
//       description={wish.note}
//     />
//   ))}
// </MapView>

//     </View>
//   );
// });

// const styles = StyleSheet.create({
//   container: { flex: 1 },
// });
