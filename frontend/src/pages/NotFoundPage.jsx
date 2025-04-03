import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div
            className='h-screen overflow-hidden bg-black' // Added overflow-hidden and h-screen
            style={{ 
                backgroundImage: `url('/404.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <header className='absolute top-0 left-0 p-4 bg-black w-full'>
                <Link to={"/"}>
                    <img src='/netflix-logo.png' alt='Netflix' className='h-8' />
                </Link>
            </header>
            <main className='text-center h-screen flex flex-col items-center justify-center text-white'>
                <h1 className='text-7xl font-semibold mb-4'>Lost your way?</h1>
                <p className='mb-6 text-xl'>
                    Sorry, we can't find that page. You'll find lots to explore on the home page.
                </p>
                <Link to={"/"} className='bg-white text-black py-2 px-4 rounded'>
                    Netflix Home
                </Link>
            </main>
        </div>
    );
};
export default NotFoundPage;