import React from 'react';

interface SectionTitleProps {
    eyebrow?: string;
    titulo: string;
    descripcion?: string;
}

function SectionTitle(props: SectionTitleProps) {
    return (
        <div className="mb-4">
            {props.eyebrow && (
                <div className="text-warning fw-semibold text-uppercase small mb-2">
                    {props.eyebrow}
                </div>
            )}
            <h2 className="fw-bold mb-2">{props.titulo}</h2>
            {props.descripcion && (
                <p className="text-secondary mb-0">{props.descripcion}</p>
            )}
        </div>
    );
}

export default SectionTitle;
