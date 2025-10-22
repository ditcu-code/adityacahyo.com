"use client"
import { Project } from "@/.contentlayer/generated"
import { Platform } from "@/types/enums"
import { Globe, MonitorSmartphone, Smartphone, Tablet, Watch } from "lucide-react"

type PlatformIconProps = { project: Project }
const PlatformIcon: React.FC<PlatformIconProps> = ({ project }) => {
  return (
    <div>
      {(() => {
        switch (project.platform) {
          case Platform.ios:
            return (
              <div className="tooltip">
                <Smartphone size={"12pt"} opacity={0.4} />
                <span className="text-xs tooltiptext">{Platform.ios}</span>
              </div>
            )
          case Platform.iosAndroid:
            return (
              <div className="tooltip">
                <Smartphone size={"12pt"} opacity={0.4} />
                <span className="text-xs tooltiptext">{Platform.iosAndroid}</span>
              </div>
            )
          case Platform.ipados:
            return (
              <div className="tooltip">
                <Tablet size={"12pt"} opacity={0.4} style={{ rotate: "-90deg" }} />
                <span className="text-xs tooltiptext">{Platform.ipados}</span>
              </div>
            )
          case Platform.watchos:
            return (
              <div className="tooltip">
                <Watch size={"12pt"} opacity={0.4} />
                <span className="text-xs tooltiptext">{Platform.watchos}</span>
              </div>
            )
          case Platform.web:
            return (
              <div className="tooltip">
                <Globe size={"12pt"} opacity={0.4} />
                <span className="text-xs tooltiptext">{Platform.web}</span>
              </div>
            )
          case Platform.both:
            return (
              <div className="tooltip">
                <MonitorSmartphone size={"12pt"} opacity={0.4} />
                <span className="text-xs tooltiptext">{Platform.both}</span>
              </div>
            )

          default:
            break
        }
      })()}
      <style jsx>{`
        /* Tooltip container */
        .tooltip {
          position: relative;
          display: inline-flex;
          align-items: center;
        }

        .tooltip .tooltiptext {
          visibility: hidden;
          position: absolute;
          bottom: calc(100% + 4px);
          left: 0;
          z-index: 1;
          display: inline-block;
          white-space: nowrap;
          background-color: gray;
          color: #fff;
          text-align: center;
          padding: 4px 8px;
          border-radius: 6px;
        }

        .tooltip:hover .tooltiptext {
          visibility: visible;
        }
      `}</style>
    </div>
  )
}

export default PlatformIcon
