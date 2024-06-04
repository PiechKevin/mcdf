import React, { useState, useEffect } from 'react';

const Notification = ({ show, hideToast, content, additionalClasses }) => {
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        let timer;
        if (show) {
            setIsAnimating(false); // Commencez avec l'animation d'entrée
            timer = setTimeout(() => {
                setIsAnimating(true); // Commencez l'animation de sortie après un délai
                // Ajouter un autre délai pour cacher le toast après l'animation
                setTimeout(hideToast, 750); // 500ms pour permettre à l'animation de se terminer
            }, 5000); // Durée pendant laquelle le toast est affiché
        }
        return () => clearTimeout(timer);
    }, [show, hideToast]);

    return (
        show && (
            <div className={`toast ${isAnimating ? 'animate__animated animate__fadeOutUp' : 'animate__animated animate__fadeInDown'} ${additionalClasses}`} style={{ top: '10%', zIndex: 1050 }} role="alert" aria-live="assertive" aria-atomic="true">
                <div className="d-flex">
                    <div className="toast-body">
                        {content}
                    </div>
                    <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={hideToast}></button>
                </div>
            </div>
        )
    );
};

export default Notification;
