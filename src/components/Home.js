import React, { useState } from 'react'
import InactiveSend from '../icons/InactiveSend'
import ActiveSend from '../icons/ActiveSend';
import NewContextModal from './NewContextModal';

const Home = () => {
    const [message, setMessage] = useState('');

    const handleSetMessage = (e) => {
        setMessage(e.target.value);
    }
    return (
        <div
            style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '100vh',
                backgroundColor: '#212121',
                padding: '20px',
            }}
        >
            <h2
                style={{
                    marginTop: '70px',
                    color: '#a9a9a9'
                }}
            >
                PDFChat
            </h2>

            <div
                style={{
                    position: 'relative',
                    width: '90%',
                    maxWidth: '700px',
                    margin: '0 auto',
                }}
            >
                <input
                    type="text"
                    placeholder="Send a message"
                    value={message}
                    onChange={(e) => handleSetMessage(e)}
                    style={{
                        width: '100%',
                        padding: '10px 40px 10px 20px',
                        fontSize: '16px',
                        borderRadius: '50px',
                        backgroundColor: '#2f2f2f',
                        border: '1px solid transparent',
                        outline: 'none',
                        color: '#ececec'
                    }}
                />
                {message ? <ActiveSend
                    style={{
                        position: 'absolute',
                        right: '15px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                    }}
                /> : <InactiveSend
                    style={{
                        position: 'absolute',
                        right: '15px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                    }}
                />}
            </div>
            <NewContextModal />
        </div>
    )
}

export default Home
