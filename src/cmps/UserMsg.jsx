import { eventBus, showSuccessMsg } from "../services/event-bus.service.js"
import { useState, useEffect, useRef } from 'react'
import { socketService, SOCKET_ORDER_STATUS_UPDATED } from "../services/socket.service.js"

export function UserMsg() {

  const [msg, setMsg] = useState(null)
  const timeoutIdRef = useRef()

  useEffect(() => {
    const unsubscribe = eventBus.on('show-msg', (msg) => {
      setMsg(msg)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      if (timeoutIdRef.current) {
        timeoutIdRef.current = null
        clearTimeout(timeoutIdRef.current)
      }
      timeoutIdRef.current = setTimeout(closeMsg, 2000)
    })

    socketService.on(SOCKET_ORDER_STATUS_UPDATED, (review) => {
      showSuccessMsg(`New review about me ${review.txt}`)
    })

    return () => {
      unsubscribe()
      socketService.off(SOCKET_ORDER_STATUS_UPDATED)
    }
  }, [])

  function closeMsg() {
    setMsg(null)
  }

  if (!msg) return <span></span>
  return (
    <section className={`user-msg ${msg.type}`}>
      {/* <button onClick={closeMsg}>x</button> */}
      {msg.txt}
    </section>
  )
}