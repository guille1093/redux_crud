import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { fetchPosts } from "../store/posts/postsSlice";


const url = 'https://gq-pfs.pockethost.io/api/files/posts'

function Gallery() {
    const dispatch = useDispatch();
    const modalRef = useRef();

    useEffect(() => {
        dispatch(fetchPosts())
    }, [dispatch])

    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(false);



    const handleImageClick = (post) => {
        setSelectedImage(`${url}/${post.id}/${post.img}?thumb=1000x1000`);
        setSelectedPost(post);
        modalRef.current.showModal();
    };

    const closeModal = () => {
        modalRef.current.close();
        setSelectedImage(null);
        setSelectedPost(null);
    };

    const posts = useSelector((state) => state.posts.posts)
    const status = useSelector((state) => state.posts.status)
    const error = useSelector((state) => state.posts.error)

    if (status === 'loading') {
        return (
            <div className='flex justify-center h-dvh items-center'>
                <span className="loading loading-infinity loading-lg"></span>
            </div>
        )
    }

    if (error) {
        return (
            <div className='flex justify-center h-dvh items-center'>
                <span className="text-red-500">{error}</span>
            </div>
        )

    }

    return (
        <div className='grid gap-4 grid-cols-3  md:grid-cols-4 lg:grid-cols-8  p-4'>
            {posts.map((post) => (
                <div key={post.id}>
                    <img
                        onLoad={() => setImageLoaded(true)}
                        style={{
                            opacity: imageLoaded ? 1 : 0,
                            transition: "opacity 1s ease-in",
                        }}
                        aria-label="Post"
                        src={`${url}/${post.id}/${post.img}?thumb=300x300`}
                        alt={`${post.caption}`}
                        className='w-full h-full rounded'
                        onClick={() => handleImageClick(post)}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                                handleImageClick(post);
                            }
                        }}
                    />
                </div>
            ))}
            <dialog ref={modalRef} id="modal" className="modal">
                <div className="modal-box border-base-content border-2">
                    {selectedImage &&
                        <img
                            onLoad={() => console.log("imagen cargada")} // Establecer isLoading en false cuando la imagen ha cargado
                            src={selectedImage}
                            alt="Selected"
                            className="rounded-xl"
                        />
                    }
                    <div className="flex items-center justify-between mb-2">
                        {selectedPost && (
                            <>
                                <p className="font-sans flex text-base antialiased font-medium leading-relaxed">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-6 h-6 me-2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                                        />
                                    </svg>
                                    {new Date(selectedPost.created).toLocaleDateString()}
                                </p>
                                <p>
                                    {selectedPost.caption}
                                </p>
                            </>
                        )}
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={closeModal}>close</button>
                </form>
            </dialog>
        </div>
    )
}

export default Gallery