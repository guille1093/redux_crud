import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewPost } from '../../store/posts/postsSlice';
import type { Post } from '../../store/posts/postsSlice';

function NewPost() {
    const [selectedImage, setSelectedImage] = useState<string>('');
    const dispatch = useDispatch();
    const [caption, setCaption] = useState<string>('');
    const [photo, setPhoto] = useState<string>('');
    const [img, setImg] = useState<File | null>(null);

    const handleCaptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCaption(event.target.value);
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
            setPhoto(file.name);
            setImg(file);
        } else {
            setSelectedImage('');
            setPhoto('');
        }
    };

    const savePost = () => {
        if (caption && photo) {
            const post: Post = {
                caption: caption,
                img: img
            }
            dispatch(addNewPost({ post }));
            setCaption('');
            setPhoto('');
            setSelectedImage('');
            (document.getElementById('newPost') as HTMLDialogElement).close();
        }
    }

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
                    <form className="form-control">
                        <label className="label">
                            <span className="label-text">Imagen</span>
                        </label>
                        <input type="file" id="photo" name="photo" required className="file-input w-full" onChange={handleImageChange} />
                        {selectedImage && (
                            <img src={selectedImage} alt="Vista previa de la imagen" className="w-full mt-2 rounded-xl" />
                        )}
                        <label className="label">
                            <span className="label-text">Descripción</span>
                        </label>
                        <textarea id="caption" name="caption" required className="textarea textarea-bordered" value={caption} onChange={handleCaptionChange}></textarea>
                        <button className="btn mt-4 btn-primary w-full" onClick={savePost}>Publicar</button>
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
