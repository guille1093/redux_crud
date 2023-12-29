import React, { useState } from 'react';

function NewPost() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <button className="btn btn-ghost btn-circle" onClick={() => (document.getElementById('newPost') as HTMLDialogElement).showModal()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </button>
            <dialog id="newPost" className="modal">
                <div className="modal-box border-base-content border-2">
                    <h3 className="font-bold text-lg">Nuevo post</h3>
                    {/* form para un nuevo post con un input para subir una imagen y un textfield para la caption */}
                    <form className="form-control">
                        <label className="label">
                            <span className="label-text">Imagen</span>
                        </label>
                        <input type="file" required className="file-input w-full" onChange={handleImageChange} />
                        {selectedImage && (
                            <img src={selectedImage} alt="Vista previa de la imagen" className="w-full mt-2 rounded-xl" />
                        )}
                        <label className="label">
                            <span className="label-text">Descripción</span>
                        </label>
                        <textarea required className="textarea textarea-bordered"></textarea>
                        <button className="btn mt-4 btn-primary w-full">Publicar</button>
                    </form>
                    <button className="btn mt-4 btn-outline w-full" onClick={() => (document.getElementById('newPost') as HTMLDialogElement).close()}>Cerrar</button>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}

export default NewPost;
