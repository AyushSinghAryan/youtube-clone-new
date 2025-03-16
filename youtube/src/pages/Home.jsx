import HomePage from "../component/HomePage";
import SideNavbar from "../component/SideNavbar";

function Home({ sideNavbar }) {
    return (
        <>
            <div className="flex w-full pt-[60px] box-border" >
                <SideNavbar sideNavbar={sideNavbar} />
                <HomePage sideNavbar={sideNavbar} />
            </div>
        </>
    )
}
export default Home;