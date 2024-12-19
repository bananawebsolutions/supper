import Image from "next/image";
import Link from "next/link";
import LogoImage from "../app/assets/logo-supper-transparente.png";

const Logo = () => {
    return (
        <Link href={"/"}>
            <Image
                src={LogoImage}
                alt="Logo de Supper"
                width={130}
                height={130}
            />
        </Link>
    );
};

export default Logo;
