import VideoPlayer from './VideoPlayer';

export default function App() {
    const videoUrl = 'https://www.youtube.com/watch?v=d46Azg3Pm4c'

    return (
        <div>
            <VideoPlayer url={videoUrl} />
        </div>
    )
}