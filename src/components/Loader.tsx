const Loader = ({
    size = 24,
    color = "currentColor",
    title,
}: {
    size?: number;
    color?: string;
    title?: string;
}) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <div
                    className="inline-block"
                    role="status"
                    aria-label="Loading"
                >
                    <svg
                        className="animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        width={size}
                        height={size}
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke={color}
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill={color}
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                </div>
            </div>
            <p className="font-medium text-xl">{title}</p>
        </div>
    );
};

export default Loader;
