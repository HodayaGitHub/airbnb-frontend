import React from "react"

export function DynamicModal({ children, shown, close }) {
    return shown ? (
        <div className="modal-backdrop" onClick={() => { close() }}>
            <div className="modal-content" onClick={e => { e.stopPropagation() }}>
                <button onClick={close}>Close</button>
                {children}
            </div>
        </div>
    ) : null
}