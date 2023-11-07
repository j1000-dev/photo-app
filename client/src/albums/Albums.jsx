import { useEffect, useState } from 'react';
import { AlbumCard } from './AlbumCard';
import { Stack } from "react-bootstrap";
import styles from './Albums.module.css';
import axios from 'axios';

function Albums() {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    axios.get('/get-root-folders').then(res => {
      setFolders(res.data.folders)
    })
  }, [])
  
  return (
    <div className={styles.albumsContainer}>
      <div className=" d-flex justify-content-between">
        <div>
          <h3 className={`${styles.title} my-4`}>Albums</h3>
        </div>
      </div>
      <div className={styles.albumsContainer}>
        <Stack direction="horizontal" gap={3}>
          {folders && folders.map((folder, i) => (      
            <AlbumCard key={folder.path} folder={folder} />
          ))}
        </Stack>
      </div>
    </div>
  )
}
export default Albums