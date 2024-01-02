import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchPosts } from "../store/posts/postsSlice";

const url = 'https://gq-pfs.pockethost.io/api/files/posts'

function Gallery() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchPosts())
    }, [dispatch])

    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (post) => {
        setSelectedImage(`${url}/${post.id}/${post.img}?thumb=1000x1000`);
        document.getElementById('modal').showModal();
    };

    const closeModal = () => {
        document.getElementById('modal').close();
        setSelectedImage(null);
    };

    const posts = useSelector((state) => state.posts.posts)
    const status = useSelector((state) => state.posts.status)
    const error = useSelector((state) => state.posts.error)

    if (status === 'loading') {
        return (
            <div className='flex justify-center h-screen items-center'>
                <span className="loading loading-infinity loading-lg"></span>
            </div>
        )
    }

    if (error) {
        return error
    }

    return (
        <div className='grid gap-4 grid-cols-3  md:grid-cols-4 lg:grid-cols-8  p-4'>
            {posts.items.map((post) => (
                <div key={post.id}>
                    <img
                        src={`${url}/${post.id}/${post.img}?thumb=300x300`}
                        alt={`${post.caption}`}
                        className='w-full h-full rounded'
                        onClick={() => handleImageClick(post)}
                        onKeyDown={(event) => {
                            // Enter or space key
                            if (event.key === 'Enter' || event.key === ' ') {
                                handleImageClick(post);
                            }
                        }}
                        tabIndex={0}

                    />
                </div>
            ))}
            <dialog id="modal" className="modal">
                <div className="modal-box">
                    {selectedImage && <img src={selectedImage} alt="Selected" />}
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={closeModal}>close</button>
                </form>
            </dialog>
        </div>
    )
}

export default Gallery

