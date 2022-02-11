import Post from '../components/feed/Post';
import '../styles/feed.scss'

function Feed () {
    return(
        <div className='feed'>
            <h1>Fil d'actualiés</h1>
            <Post />
        </div>
    )
}
export default Feed;