
interface SettingsProps {
  showHints: boolean;
  onChange: (field: string, value: any) => void
}


export default function Settings(props: SettingsProps) {

  return (
    <div className="settings-container">

      <input type="checkbox" name="hints" checked={props.showHints} onChange={(e) => props.onChange("hints", e.currentTarget.value)} />

    </div>
  )
}
