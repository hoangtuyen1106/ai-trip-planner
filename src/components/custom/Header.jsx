import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import logo from "/logo.svg";
function Header() {
    return (
        <div className="p-3 shadow-sm flex justify-between items-center px-5">
            <Link to="/"><img src={logo} /></Link>
            <div>
                <Button>Sign In</Button>
            </div>
        </div>
    );
}

export default Header;
