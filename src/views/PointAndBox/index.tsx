import { useEffect, useRef } from "react"

import init from "./main"

import './index.scss'

// 这是方块与光的实例

function TestThree() {
  const dom = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (dom.current) {
      console.log('init')
      const dispose = init(dom.current)
      return () => {
        dispose()
      }
    }
  }, [])

  return (
    <div ref={dom} className="container" />
  )
}

export default TestThree
