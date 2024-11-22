import React from 'react';
import { sora } from '@/app/ui/fonts';

const Logo: React.FC = () => {
    return (
        <h1 className={`${sora.className} antialiased font-bold`} style={{ userSelect: 'none' }}>ONG Ide Evangelizar</h1>
    );
};

export default Logo;