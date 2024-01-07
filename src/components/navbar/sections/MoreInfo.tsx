import { useRef } from "react"


function MoreInfo() {

    const modalRef = useRef<HTMLDialogElement>(null)

    return (
        <><button aria-label="More Info" className="btn btn-ghost btn-circle" onClick={() => (modalRef.current.showModal())}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
        </svg>
        </button>
            <dialog id="my_modal_2" className="modal" ref={modalRef}>
                <div className="modal-box border-base-content border-2">
                    <h3 className="font-bold text-lg">MichiGram</h3>
                    <p>Este pequeño demo esta construido utilizando React con Vite. Implementa Redux Toolkit con AsyncThunks, Axios y TailwindCSS.</p>
                    <a href="https://github.com/guille1093/redux_crud" className="btn mt-4 btn-primary w-full"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black" data-darkreader-inline-fill=""><path fillRule="evenodd" clipRule="evenodd" d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"></path></svg>REPOSITORIO</a>
                    <button className="btn mt-4 btn-outline w-full" onClick={() => (document.getElementById('my_modal_2') as HTMLDialogElement).close()}>Cerrar</button>
                </div>

                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog></>
    )
}

export default MoreInfo