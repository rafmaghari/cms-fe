import Image from "next/image";

type Props = {
    height: number;
    width: number
}

const AppLogo = ({height, width}: Props) => {
    return (
        <div className="flex justify-center items-center mb-16">
            <Image src="/vercel.svg" alt="Logo" width={width} height={height} />
        </div>
    );
};

export default AppLogo;