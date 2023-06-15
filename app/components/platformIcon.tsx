"use client"
import { Project } from "@/.contentlayer/generated"
import { Platform } from "@/types/enums"
import { Smartphone, Globe } from "lucide-react"

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
          case Platform.web:
            return (
              <div className="tooltip">
                <Globe size={"12pt"} opacity={0.4} />
                <span className="text-xs tooltiptext">{Platform.web}</span>
              </div>
            )
          case Platform.both:
            return (
              <div className="flex tooltip">
                <Smartphone size={"12pt"} opacity={0.4} />
                <Globe size={"12pt"} opacity={0.4} />
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
          border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
        }

        /* Tooltip text */
        .tooltip .tooltiptext {
          visibility: hidden;
          width: 100px;
          background-color: gray;
          color: #fff;
          text-align: center;
          padding: 5px 0;
          border-radius: 6px;
          margin: 5px;

          /* Position the tooltip text - see examples below! */
          position: absolute;
          z-index: 1;
        }

        /* Show the tooltip text when you mouse over the tooltip container */
        .tooltip:hover .tooltiptext {
          visibility: visible;
        }
      `}</style>
    </div>
  )
}

export default PlatformIcon
