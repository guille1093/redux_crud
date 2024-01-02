import CenterLink from "./sections/CenterLink"
import MoreInfo from "./sections/MoreInfo"
import NewPost from "./sections/NewPost"

function Navbar() {
    return (
        <div className="navbar bg-base-100 w-full">
            <div className="navbar-start">
                <MoreInfo />
            </div>
            <div className="navbar-center">
                <CenterLink />
            </div>
            <div className="navbar-end">
                <NewPost />
            </div>
        </div>
    )
}

export default Navbar