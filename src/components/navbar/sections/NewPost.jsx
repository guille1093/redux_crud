import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewPost } from '../../../store/posts/postsSlice';



function NewPost() {
    const [selectedImage, setSelectedImage] = useState('');
    const dispatch = useDispatch();
    const [caption, setCaption] = useState('');
    const [photo, setPhoto] = useState('');
    const [img, setImg] = useState(null);
    const handleCaptionChange = (event) => {
        setCaption(event.target.value);
    }

    const handleImageChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
            setPhoto(file.name);
            setImg(file);
        } else {
            setSelectedImage('');
            setPhoto('');
        }
    };

    const savePost = (event) => {
        event.preventDefault();
        if (caption && photo) {
            const post = {
                caption: caption,
                img: img
            }
            dispatch(addNewPost({ post }));
            setCaption('');
            setPhoto('');
            setSelectedImage('');
            setImg(null);
            document.getElementById('photo').value = '';
            document.getElementById('newPost').close();
        }
    }

    return (
        <>
            <button aria-label="New Post" className="btn btn-ghost btn-circle" onClick={() => document.getElementById('newPost').showModal()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </button>
            <dialog id="newPost" className="modal">
                <div className="modal-box border-base-content border-2">
                    <h3 className="font-bold text-lg">Nuevo post</h3>
                    <form id="newPost" className="form-control">
                        <label className="label">
                            <span className="label-text">Imagen</span>
                        </label>
                        <input accept="image/png, image/jpeg, image/jpg" aria-label="photo" type="file" id="photo" name="photo" required className="file-input w-full" onChange={handleImageChange} />
                        {selectedImage && (
                            <img src={selectedImage} alt="Vista previa de la imagen" className="w-full mt-2 rounded-xl" />
                        )}
                        <label className="label">
                            <span className="label-text">Descripción</span>
                        </label>
                        <textarea aria-label="caption" id="caption" name="caption" required className="textarea textarea-bordered" value={caption} onChange={handleCaptionChange}></textarea>
                        <button className="btn mt-4 btn-primary w-full" onClick={savePost}>Publicar</button>
                    </form>
                    <button className="btn mt-4 btn-outline w-full" onClick={() => document.getElementById('newPost').close()}>Cerrar</button>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}

export default NewPost;