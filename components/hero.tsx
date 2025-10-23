"use client"

import { GL } from "./gl"
import { useState, useEffect } from "react"

export function Hero() {
  const [hovering, setHovering] = useState(false)
  const [coordinates, setCoordinates] = useState({ lat: "32°18'8\"W", lon: "84°23'6\"S" })
  const [timeString, setTimeString] = useState("18:11:00")
  const [gmtOffset, setGmtOffset] = useState("GMT-3")

  useEffect(() => {
    // Get user's geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude
        const lon = position.coords.longitude

        // Convert decimal to DMS format
        const latDMS = convertToDMS(lat, lat >= 0 ? "N" : "S")
        const lonDMS = convertToDMS(Math.abs(lon), lon >= 0 ? "E" : "W")

        setCoordinates({ lat: latDMS, lon: lonDMS })
      })
    }

    // Update time every second with GMT offset
    const updateTime = () => {
      const now = new Date()
      const time = now.toLocaleTimeString("en-US", {
        hour12: false,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      })
      const offset = -now.getTimezoneOffset() / 60
      const gmtSign = offset >= 0 ? "+" : ""
      const gmt = `GMT${gmtSign}${offset}`
      setTimeString(time)
      setGmtOffset(gmt)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const convertToDMS = (decimal: number, direction: string) => {
    const degrees = Math.floor(decimal)
    const minutes = Math.floor((decimal - degrees) * 60)
    const seconds = Math.round(((decimal - degrees) * 60 - minutes) * 60)
    return `${degrees}°${minutes}'${seconds}"${direction}`
  }

  return (
    <div className="flex flex-col h-svh justify-between">
      <GL hovering={hovering} />

      {/* Top section with coordinates and time */}
      <div className="absolute top-0 left-0 right-0 flex justify-between p-8 text-white text-sm font-mono pointer-events-none">
        <div className="flex flex-col gap-1">
          <div>{coordinates.lat}</div>
          <div>{coordinates.lon}</div>
        </div>
        <div className="flex flex-col gap-1 items-end">
          <div>{timeString}</div>
          <div>{gmtOffset}</div>
        </div>
      </div>

      {/* Center section with logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg width="300" height="100" viewBox="0 0 472 158" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 147.843L74.7834 1.30176L147.794 154.936C147.719 155.295 147.198 155.58 146.851 155.742C145.586 156.324 132.864 156.287 130.694 156.076C129.231 155.94 128.003 155.779 127.011 154.564C119.386 139.56 113.124 123.886 105.721 108.784C104.58 106.465 101.567 99.5084 100.166 98.0204C99.8559 97.6857 99.5583 97.4377 99.0623 97.4253L0 148.711V147.843ZM75.4158 45.8296L73.2458 47.0199L48.5453 97.2765L90.556 79.2967L75.4034 45.842L75.4158 45.8296Z"
            fill="white"
          />
          <path
            d="M184.671 157.354C172.159 156.015 160.491 145.711 157.577 133.584C150.869 105.709 181 82.8931 205.478 98.3433V108.933C186.977 93.0238 160.937 108.325 167.113 132.269C170.758 146.405 187.324 152.518 199.848 145.463C201.844 144.334 203.407 142.66 205.478 141.78V153.014C203.208 153.721 201.162 155.023 198.881 155.73C197.07 156.288 193.834 157.168 192.036 157.342C190.238 157.515 186.531 157.54 184.671 157.342V157.354Z"
            fill="white"
          />
          <path
            d="M351.561 66.1409H341.802L335.131 51.2735L308.93 51.0751L301.49 66.1409H291.731L322.297 0.868164L351.561 66.1409ZM312.985 41.9364H330.754L321.875 22.0471L312.985 41.9364Z"
            fill="white"
          />
          <path
            d="M156.92 66.1409L187.052 0.868164L216.551 65.2729L216.092 66.1533H206.333L199.551 51.0875L173.35 51.2735C171.267 56.2582 169.208 61.6769 166.245 66.1533H156.92V66.1409ZM195.942 41.9364L187.052 21.6131L177.727 41.9364H195.93H195.942Z"
            fill="white"
          />
          <path
            d="M376.273 156.064L406.826 91.2129L436.09 156.064H425.897L419.35 141.333L393.459 141.432L386.019 156.064H376.261H376.273ZM415.283 132.281L406.392 111.958L397.068 132.281H415.271H415.283Z"
            fill="white"
          />
          <path
            d="M211.541 156.064L241.672 91.2129L271.358 156.064H261.165L254.928 141.618L228.727 141.432L221.287 156.064H211.528H211.541ZM250.563 132.281L241.672 111.958L232.348 132.281H250.551H250.563Z"
            fill="white"
          />
          <path
            d="M231.046 4.32812L242.529 25.0854L255.102 4.32812H265.295L248.047 33.8769L266.163 66.1537H256.404L242.529 42.8048C241.673 42.6312 241.983 43.028 241.785 43.3628C237.16 50.8771 232.981 58.7014 228.232 66.1537H218.039L237.048 33.8645L220.209 4.32812H231.046Z"
            fill="white"
          />
          <path
            d="M288.272 131.425V156.063H278.736V94.6719H295.861C316.072 94.6719 320.487 124.097 301.391 130.024C300.027 130.445 296.208 131.425 294.993 131.425H288.272ZM288.272 122.336H296.294C297.162 122.336 300.796 120.513 301.602 119.856C303.139 118.616 304.094 116.731 304.305 114.772C305.483 104.096 296.741 103.054 288.259 103.315V122.336H288.272Z"
            fill="white"
          />
          <path
            d="M378.443 94.6719V103.104L377.786 103.749H364.134V156.063H354.598V103.749H340.723V94.6719H378.443Z"
            fill="white"
          />
          <path d="M453.003 94.6719V147.421H471.206V156.063H443.468V94.6719H453.003Z" fill="white" />
          <path d="M332.49 94.6719H322.954V156.063H332.49V94.6719Z" fill="white" />
          <path d="M283.932 4.32812H274.83V66.1537H283.932V4.32812Z" fill="white" />
        </svg>
      </div>

      {/* Bottom section with copyright */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between p-8 text-white text-xs font-mono pointer-events-none">
        <div>Axia Capital LLC © 2025 Copyright.</div>
        <div>All Rights Reserved</div>
      </div>
    </div>
  )
}
