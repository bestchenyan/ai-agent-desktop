import Versions from './components/Versions'
import { Label } from '@renderer/components/ui/label'

function App(): React.JSX.Element {
  return (
    <>
      <div className="text-red-500">tailwindcss</div>
      <Label>这是一个基于radixui的label组件</Label>

      <Label>版本信息：</Label>
      <Versions></Versions>
    </>
  )
}

export default App
