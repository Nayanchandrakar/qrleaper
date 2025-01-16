"use client"

import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"
import "leaflet-defaulticon-compatibility"

import type { LatLngExpression } from "leaflet"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"

interface MapProps {
  position: LatLngExpression
  zoom?: number
}

const defaults = {
  zoom: 2,
}

const Map = (Map: MapProps) => {
  const { zoom = defaults.zoom, position } = Map

  return (
    <MapContainer
      zoom={zoom}
      center={position}
      className="rounded-lg w-full h-[30rem]"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} draggable={false}>
        <Popup>Hey ! I study here</Popup>
      </Marker>
    </MapContainer>
  )
}

export default Map
