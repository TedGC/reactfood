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



// loading spinner component ---- might need for future project, not at the moemnt for this project

// //const Spinner = () => (
// <div className="flex justify-center items-center h-screen">
//     <div className="animate-spin h-12 w-12 border-4 border-white border-t-transparent rounded-full" />
// </div>
// );