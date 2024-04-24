import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CircularProgress from './CircularProgress'
import SomethingWrong from './SomethingWrong'

function MyUrls() {
  let [allurls,setallurls] = useState([])
  const[wrong,setwrong] = useState(false)
  const [progress,setprogress]= useState(true)
useEffect(()=>{
  const geturls =async()=>{
    try {
      const email = localStorage.getItem('email')
    const urls = await axios.get(`https://urlshortner-copy.onrender.com/getuserurls/${email}`)
    setallurls(urls.data)
    setprogress(false)
    } catch (error) {
      console.log(error)
      setwrong(true)
    }
  }
  geturls();
},[])
  return (
<>

    {wrong?<SomethingWrong></SomethingWrong>:<div className=" mx-5 mt-4">
      {progress?<CircularProgress></CircularProgress>:<table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Shortened URL</th>
            <th scope="col">Original URL</th>
            <th scope="col">Visited Count</th>
          </tr>
        </thead>
        {allurls.length==0?<tr ><td colSpan="4" style={{ textAlign: "center",fontSize:18 }}>You have no urls shortened...</td></tr>:<tbody>
        {
          allurls.map((url,index)=>{
            return <tr key={index}>
            <th scope="row">{index+1}</th>
            <td><a href={`${url.shortenurl}`} target='_blank' style={{textDecoration:"none",color:"blue"}}>{url.shortenurl}</a></td>
            <td style={{ maxWidth: "300px", overflow: "hidden", textOverflow: "ellipsis" }}>{url.url}</td>
            <td>{url.click}</td>
          </tr>
          })
        }
        </tbody>}
      </table>}
      </div>}
      </>
  )
}

export default MyUrls