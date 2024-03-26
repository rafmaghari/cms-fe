type Props = {
    className?: string
}

const Loading = ({className}: Props) => {
    return (
        <div className={`flex space-x-2 justify-center items-center bg-white dark:invert ${className}`}>
            <span className='sr-only'>Loading...</span>
            <div className='size-4 bg-gray-700 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
            <div className='size-4 bg-gray-700 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
            <div className='size-4 bg-gray-700 rounded-full animate-bounce'></div>
        </div>
    );
};

export default Loading;