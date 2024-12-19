import SuccessContainer from "@/components/SuccessContainer";
import { redirect } from "next/navigation";

interface Props {
    searchParams: {
        session_id: string | null;
    };
}

const SuccessPage = async ({ searchParams }: Props) => {
    // TODO: check this out, why I still have the warning
    const id = await searchParams?.session_id;

    if (!id) {
        redirect("/");
    }
    return (
        <div>
            <SuccessContainer id={id} />
        </div>
    );
};

export default SuccessPage;
