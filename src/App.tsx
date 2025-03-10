import { useEffect, useRef } from "react"
import usePhotos from "./hooks/usePhotos"
import Loader from "./components/Loader";

const App = () => {
 const {photos,setPage,loading} =  usePhotos()
 const scrollHandlerRef = useRef(false);

//  Using Scroll Event
  // useEffect(() => {
  //   if (!loading) scrollHandlerRef.current = false;
  //   function handleScroll() {
  //     const {scrollTop,clientHeight,scrollHeight} = document.documentElement
  //     const remaining = scrollHeight - (scrollTop + clientHeight)
  //      if(remaining < 200 && !loading && !scrollHandlerRef.current) {
  //         scrollHandlerRef.current = true;
  //          setPage(prev => prev + 1)
  //      }
  //   }
  //    window.addEventListener('scroll',handleScroll)

  //    return () => window.removeEventListener('scroll',handleScroll)
  // },[loading])

// Using Intersection Observer
  useEffect(() => {
    const container = document.querySelector('.container');
  if (!container) return;
  const lastElementChild = container.lastElementChild;
  if(!lastElementChild) return;
    const observer = new IntersectionObserver((entries) => {
      if(entries[0].isIntersecting && !loading) {
        setPage(prev => prev + 1)
      }
    },{
      root:null,
      rootMargin:'0px',
      threshold : 0.25
    })
   observer.observe(lastElementChild)
   
   return () => observer.disconnect()
  },[loading,photos.length])
  
  return (
    <div className="main p-4">
      <h1 className="text-5xl text-center">♾️ Scroll</h1>
     {
       photos.length > 0 && <ul className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        {
           photos.map(photo => (
             <li key={photo.id} className="bg-gray-200 rounded-md overflow-hidden">
               <img src={photo.download_url} alt="photo" className="w-full h-64 object-cover"/>
             </li>))
        }
      </ul>
    }
     {loading && <div className="flex justify-center mt-4"><Loader loading={loading}/></div>}
    </div>
  )
}

export default App