import Navbar from "@/components/common/Navbar";

function UserLayout({children}){
    return (
     <div>
        <Navbar />
        {children}
     </div>
    )
}

export default UserLayout;
