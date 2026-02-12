import { Children, type ReactNode } from "react"
import "../tooltip.css"

interface TooltipProps {

  mouseX: number,
  mouseY: number,
  open: boolean,
  children: ReactNode
}

export default function Tooltip({ children, ...props }: TooltipProps) {
  return (
    <div className={"tooltip " + (props.open && "visible")} style={{ left: props.mouseX, top: props.mouseY }}>
      {children}
    </div>)
}
