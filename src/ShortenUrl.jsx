import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import CircularProgress from "./CircularProgress";
import { ToastContainer, toast } from 'react-toastify';
import SomethingWrong from './SomethingWrong';
export default function ShortenUrl() {

  const [progress,setprogress] = useState(false)
  const [linkstate,setlinkstate] = useState(false)
  const [shorten,setshortenurl]=useState("")
  const[wrong,setwrong] = useState(false)
    const formik = useFormik({
        initialValues:{
            url : ""
        },
        validate:(values)=>{
            let error = {}
            if(values.url.length == 0){
                error.url = "Enter the Url"
            }
            else if (!isValidURL(values.url)) {
              error.url = "Invalid URL";
            }
            return error;
        },
        onSubmit:(values)=>{
          
            shortenurl(values)
            setprogress(true)
        }

    })

    const shortenurl = async(values)=>{
        try {
            const url = values.url
            const token = localStorage.getItem('token')
            const email = localStorage.getItem('email')
           const shortenurl = await axios.post("https://urlshortner-copy.onrender.com/shortenurl",{url:url,email:email},{
            headers:{
              Authorization:token
            }
           })
          if(shortenurl.status==200){
            setshortenurl(shortenurl.data.shortenurl)
            setprogress(false)
            setlinkstate(true)
            toast.success("Url Shortened")
            formik.resetForm()
          }
          else{
       
            setwrong(true)
          }
          

        } catch (error) {
          setlinkstate(false)
          setwrong(true)
            console.log(error)
        }
    }

    const isValidURL = (url) => {
      // Regular expression for URL validation
      const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
      return urlPattern.test(url);
    };
  return (
    <>
    <ToastContainer />
    {wrong?<SomethingWrong></SomethingWrong>:
    <div className="card mt-4">
    <div className="card-header">URL Shortner</div>
    <div className="card-body">
        <form onSubmit={formik.handleSubmit}>
        <div className="input-group input-group-lg">
        <span className="input-group-text" id="inputGroup-sizing-lg" style={{opacity:0.7}}>
         Enter long link here
        </span>
        <input
          type="text"
          className="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-lg"
          name='url'
          onChange={formik.handleChange}
          value={formik.values.url}
        />
        
      </div>
      {formik.getFieldMeta("url").error &&
                  formik.getFieldMeta("url").touched && (
                    <span style={{ color: "red" }}>
                      {formik.getFieldMeta("url").error}
                    </span>
                  )}
      {
      progress  ?<CircularProgress></CircularProgress>:
      <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">
        Shorten URL
      </button>}
        </form>
      
    </div>
  </div>}

  {linkstate&&<div className='text-center mt-2'>Your Shortened Url is  <a href={shorten} target='_blank'>{`${shorten}`}</a></div>}
    </>

  )
}