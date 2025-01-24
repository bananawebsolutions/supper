import SuccessContainer from "@/components/SuccessContainer";
import { redirect } from "next/navigation";

interface Props {
    searchParams: Promise<{
        session_id: string | null;
    }>;
}

const SuccessPage = async ({ searchParams }: Props) => {
    const { session_id } = await searchParams;

    if (!session_id) {
        redirect("/");
    }
    return (
        <div>
            <SuccessContainer id={session_id} />
        </div>
    );
};

export default SuccessPage;
