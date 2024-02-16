import { authorSocials } from "../constants/socialsData";

const Footer = () => {
    return (
        <footer className="w-full bg-primary-color py-8 h-full">

            <div className="w-full h-full text-accent-color flex flex-col items-center justify-between gap-12">

                <h4 className="font-thin text-md">Licensed by Ecom-Express-Manager</h4>

                <div className="w-full flex items-center justify-center gap-12">
                    {authorSocials.map((item, key) => {
                        return (<span className="text-4xl">{item.icon}</span>)
                    })}
                </div>
            </div>


        </footer>
    )

}

export default Footer;