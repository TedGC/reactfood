import { useEffect, useRef } from 'react-dom'




export default function Modal({ open, onClose, className = '', children }) {

    const dialog = useRef()

    useEffect(() => {
        const modal = dialog.current

        if (open) {
            modal.showModal()
        }

        return () => {
            modal.clsoe()
        }

    }, [open])

    return (
        <dialog ref={dialog} className={`modal ${className}`} onClose={onClose} >
            {children}
        </dialog>,
        document.getElementById('modal')

    )
} 