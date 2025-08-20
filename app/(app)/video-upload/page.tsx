import React, { useState } from 'react'
import axios from 'axios'
import {useRouter} from 'next/navigation'


function VideoUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [description , setDescription] = useState("")
  const [isUploading, setIsUploading] = useState(false)

  const router = useRouter()

  const MAX_FILE_SIZE = 70*1024*1024 // max file size


  return (
    <div>VideoUpload</div>
  )
}

export default VideoUpload