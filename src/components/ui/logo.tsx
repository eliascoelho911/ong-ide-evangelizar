import React from 'react';
import { fredoka } from '@/app/ui/fonts';

const Logo: React.FC = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <p className={`${fredoka.variable} font-logo`} style={{ userSelect: 'none', fontWeight: 'normal', fontSize: 14, margin: 0 }}>ONG</p>
            <p className={`${fredoka.variable} font-logo`} style={{ userSelect: 'none', fontWeight: 'bold', fontSize: 20, margin: 0 }}>IDE EVANGELIZAR</p>
        </div>
    );
};

export default Logo;