import React from 'react';
import QRCode from 'qrcode.react';

export default ({ text, size }: { text: string; size?: number; }) => (
    <div className='qr-code'>
        {console.log(text)}
        { text && (
            <QRCode
                value={text}
                size={size || 290}
                level='H'
            />
        )}
    </div>
);
