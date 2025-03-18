import HomePage from "../component/HomePage";
import ModalSidebar from "../component/ModalSideNavbar";
import SideNavbar from "../component/SideNavbar";

function Home({ sideNavbar, setSideNavbar }) {
    return (
        <>
            <div className="flex w-full pt-[60px] box-border" >
                <SideNavbar sideNavbar={sideNavbar} />

                <ModalSidebar sideNavbar={sideNavbar} setSideNavbar={setSideNavbar} />

                <HomePage sideNavbar={sideNavbar} />
            </div>
        </>
    )
}
export default Home;