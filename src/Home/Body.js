import './Body.css';
import spaceVideo from './Rotation of The Planet Earth.mp4';

function Body() {
    return (
            <div className="pic-container">
                <video autoPlay loop muted className='video-container'>
                    <source src={spaceVideo} type='video/mp4' className="video" />
            </video>
            </div>
    );
}

export default Body;