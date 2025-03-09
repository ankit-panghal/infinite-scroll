import { useLayoutEffect, useState } from "react";

interface Photo {
    id : string
    download_url : string
}

const usePhotos = () => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [page,setPage] = useState(1);
    const [loading,setLoading] = useState(false);   
    
    useLayoutEffect(() => {
       (async function getPhotos() {
        setLoading(true);
         const respone = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=20`);
         const result = await respone.json();
         const photos = result.map((item: Photo) => ({id : item.id,download_url : item.download_url}))
         setPhotos(prev => [...prev, ...photos]);
         setLoading(false);
       })()
    },[page])
    
  return {photos,setPage,loading}
}

export default usePhotos