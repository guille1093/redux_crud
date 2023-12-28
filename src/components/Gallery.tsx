import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchPosts } from "../store/posts/postsSlice";



function Gallery() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchPosts() as any)
    }, [dispatch])

    const posts = useSelector((state: any) => state.posts.posts)
    const status = useSelector((state: any) => state.posts.status)
    const error = useSelector((state: any) => state.posts.error)

    if (status === 'loading') {
        return 'Cargando...'
    }

    if (error) {
        return error
    }

    return (
        <div className='grid gap-4 grid-cols-3  md:grid-cols-4 lg:grid-cols-8  p-4'>
            {posts.items.map((post) => (
                <div key={post.id}>
                    <img
                        src={`https://still-team.pockethost.io/api/files/posts/${post.id}/${post.img}?thumb=300x300`}
                        alt={`${post.caption}`}
                        className='w-full h-full rounded'
                    />
                </div>
            ))}

        </div>
    )
}

export default Gallery