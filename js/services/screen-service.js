class ScreenService
{
    updateApplicationHeight()
    {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
}

export const screenService = new ScreenService();