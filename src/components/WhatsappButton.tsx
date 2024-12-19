import { FaWhatsapp } from "react-icons/fa6";

interface WhatsAppButtonProps {
    phoneNumber: string;
}

const WhatsAppButton = ({ phoneNumber }: WhatsAppButtonProps) => {
    const whatsappUrl = `https://wa.me/${phoneNumber}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300 flex items-center justify-center"
            aria-label="Chatear en WhatsApp"
        >
            <FaWhatsapp className="text-3xl md:text-4xl z-10" />
            <div className="fixed z-0 h-[4.6rem] w-[4.6rem] md:w-20 md:h-20 animate-wapulse bg-green-500 rounded-full" />
        </a>
    );
};

export default WhatsAppButton;
