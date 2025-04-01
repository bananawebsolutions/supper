import {
    Button,
    Head,
    Heading,
    Html,
    Preview,
    Section,
    Tailwind,
} from "@react-email/components";

interface EmailTemplateProps {
    magicLink: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    magicLink,
}) => (
    <Html>
        <Head />
        <Preview>Inicia sesión con este link</Preview>
        <Tailwind>
            <Heading className="mx-0 my-[30px] p-0 text-center text-3xl font-bold text-black">
                🍅 Tu Link para Iniciar Sesión 🍅
            </Heading>
            <Section className="my-[32px] text-center">
                <Button
                    className="text-md rounded-full bg-green-500 px-5 py-3 text-center font-semibold no-underline"
                    href={magicLink}
                >
                    Click aquí para iniciar sesión
                </Button>
            </Section>
        </Tailwind>
    </Html>
);
