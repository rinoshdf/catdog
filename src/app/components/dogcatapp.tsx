"use client";
import { useState } from 'react';
import Image from 'next/image';
import "./dogcat.scss";

export default function DogcatApp() {
    const [fact, setFact] = useState<string | null>(null);
    const [dogImageUrl, setDogImageUrl] = useState<string | null>(null);

    const handleClose = () => {
        setDogImageUrl(null);
        setFact(null);
    };

    const handleSelect = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;

        if (value === 'dog') {
            // Dog selected, fetch dog image
            try {
                const response = await fetch('https://dog.ceo/api/breeds/image/random');
                const data = await response.json();
                setFact(null);
                setDogImageUrl(data.message);
            } catch (error) {
                console.error('Error fetching dog image:', error);
            }
        } else if (value === 'cat') {
            // Cat selected, fetch cat fact
            try {
                const response = await fetch('https://catfact.ninja/fact');
                const data = await response.json();
                setDogImageUrl(null);
                setFact(data.fact);
            } catch (error) {
                console.error('Error fetching cat fact:', error);
            }
        }
    };
    const dogcatStyle: any = dogImageUrl
        ? { backgroundImage: `url(${dogImageUrl})` }
        : null;

    return (
        <>
            <div className='dogcat' style={dogcatStyle}>
                <video autoPlay muted loop id="myVideo" src=""></video>
                <div className='level-one'>

                    <form>
                        <label htmlFor="cars"> Select one, have fun <br />Dog or Cat?</label>
                        <select onChange={handleSelect}>
                            <option value="dog">Dog</option>
                            <option value="cat">Cat</option>
                        </select>
                    </form>
                </div>

            </div>

            {dogImageUrl && (
                <div className="popup">

                    <span className="close-button" onClick={handleClose}>
                        <button>close</button>
                    </span>
                    <img src={dogImageUrl} alt="Dog" />

                </div>
            )}

            {fact && (
                <div className="popup">
                    <div className="popup-content">
                        <span className="close-button" onClick={handleClose}>
                            <button>close</button>
                        </span>
                        <p>{fact}</p>
                    </div>
                </div>
            )}
        </>
    );
}
