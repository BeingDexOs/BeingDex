import useClipboard from 'vue-clipboard3'
import { ElMessage } from "element-plus"
import 'element-plus/es/components/message/style/css'

const { toClipboard } = useClipboard()
export const copy = async (value: string) => {
  try {
    await toClipboard(value)
    ElMessage.success('复制成功')
  } catch (e) {
    ElMessage.error('复制失败')
  }
}