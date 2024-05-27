
const getBackendUrl = () => {
    const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return process.env.NEXT_PUBLIC_BACKEND_LOCAL as string;
    } else {
        return process.env.NEXT_PUBLIC_BACKEND_REMOTE as string;
    }
};

const base_url = getBackendUrl();

export default base_url;