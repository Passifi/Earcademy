import { Children, type ReactNode } from "react"
import "../tooltip.css"

interface TooltipProps {

  children: ReactNode
}

export default function Tooltip({ children }: TooltipProps) {
  return (
    <div className={"tooltip"} >
      <span className="tooltiptext">{children}</span>
    </div>)
}
